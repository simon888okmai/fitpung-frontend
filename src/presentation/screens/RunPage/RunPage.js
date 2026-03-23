import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, StatusBar, Alert, AppState, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MapComponent from '../../components/run_page/MapComponent';
import RunStatsCard from '../../components/run_page/RunStatsCard';
import { BackButton, ActionButtons } from '../../components/run_page/RunControls';
import { LoadingState, ErrorState } from '../../components/run_page/RunStates';
import ShoeSelectionModal from '../../components/run_page/ShoeSelectionModal';

import { calculateDistance, calculateCalories, formatTime } from '../../../utils/trackingUtils';
import { saveActivityCheckpoint, clearActivityCheckpoint, syncActivityWithBackend, getActivityCheckpoint } from '../../../services/activityService';
import { getMyShoes } from '../../../services/shoeService';
import { useActivityRecognition } from '../../hooks/useActivityRecognition';
import { AuthContext } from '../../../context/AuthContext';

const LOCATION_TRACKING_TASK = 'LOCATION_TRACKING_TASK';

const RunPage = () => {
    const { userInfo } = useContext(AuthContext);
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const routeUpdateTimer = useRef(null);
    const checkpointTimer = useRef(null);
    const lastLocation = useRef(null);
    const appState = useRef(AppState.currentState);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isTracking, setIsTracking] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [totalDistance, setTotalDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [calories, setCalories] = useState(0);
    const [routePath, setRoutePath] = useState([]);
    const [isSyncing, setIsSyncing] = useState(false);

    const [isShoeModalVisible, setIsShoeModalVisible] = useState(false);
    const [selectedShoe, setSelectedShoe] = useState(null);

    const [isCountingDown, setIsCountingDown] = useState(false);
    const [countdownValue, setCountdownValue] = useState(3);

    const { currentActivity } = useActivityRecognition(isTracking || isCountingDown);

    const latestWeight = useRef(65);
    useEffect(() => { latestWeight.current = userInfo?.weight || 65; }, [userInfo]);

    const latestLocation = useRef(location);
    useEffect(() => { latestLocation.current = location; }, [location]);

    const latestActivity = useRef(currentActivity);
    useEffect(() => { latestActivity.current = currentActivity; }, [currentActivity]);

    const latestSession = useRef({});
    useEffect(() => {
        latestSession.current = { totalDistance, duration, calories, routePath, startTime, shoeId: selectedShoe?.id };
    }, [totalDistance, duration, calories, routePath, startTime, selectedShoe]);

    useEffect(() => {
        let subscriber = null;
        let subscription = null;

        (async () => {

            const myShoes = await getMyShoes();
            const defaultShoe = myShoes.find(s => s.isDefault);
            if (defaultShoe) setSelectedShoe(defaultShoe);

            let { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
            if (fgStatus !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setIsLoading(false);
                return;
            }

            try {
                const lastKnown = await Location.getLastKnownPositionAsync({});
                if (lastKnown) {
                    setLocation(lastKnown.coords);
                    lastLocation.current = lastKnown.coords;
                    setIsLoading(false); // Map is ready to show with last known
                }
            } catch (e) {
                console.log("Error getting last known position:", e);
            }

            try {
                const currentLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
                setLocation(currentLocation.coords);
                lastLocation.current = currentLocation.coords;
                setIsLoading(false);
            } catch (e) {
                console.log("Error getting current position:", e);
                setIsLoading(false); // Stop loading even if it fails, fallback to map default
            }

            Location.requestBackgroundPermissionsAsync().then(({ status }) => {
                if (status !== 'granted') {
                    console.log('Background location permission not granted');
                }
            });

            subscriber = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 0, // Force GPS emit every second (bypasses Simulator mock drops)
                },
                (newLocation) => {
                    setLocation(newLocation.coords);
                }
            );

            subscription = AppState.addEventListener('change', nextAppState => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active'
                ) {

                    reconcileBackgroundData();
                }
                appState.current = nextAppState;
            });
        })();

        return () => {
            if (subscriber) subscriber.remove();
            if (subscription) subscription.remove();
        };
    }, []);

    const reconcileBackgroundData = async () => {
        const checkpoint = await getActivityCheckpoint();
        if (checkpoint && checkpoint.routePath && checkpoint.routePath.length > routePath.length) {
            setRoutePath(checkpoint.routePath);
            setTotalDistance(checkpoint.totalDistance);
            setDuration(checkpoint.duration);
            setCalories(checkpoint.calories);
        }
    };

    useEffect(() => {
        let interval = null;
        if (isTracking) {
            interval = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTracking]);

    useEffect(() => {
        if (isTracking) {
            routeUpdateTimer.current = setInterval(() => {
                const loc = latestLocation.current;
                const act = latestActivity.current;

                if (loc) {
                    let hasMoved = false;

                    if (lastLocation.current) {
                        const d = calculateDistance(
                            lastLocation.current.latitude,
                            lastLocation.current.longitude,
                            loc.latitude,
                            loc.longitude
                        );
                        if (d > 0.003) { // Use 3 meters to further reduce coordinate spam
                            setTotalDistance(prev => {
                                const newDistance = prev + d;
                                setCalories(calculateCalories(newDistance, latestWeight.current));
                                return newDistance;
                            });
                            lastLocation.current = loc;
                            hasMoved = true;
                        }
                    } else {
                        lastLocation.current = loc;
                        hasMoved = true;
                    }

                    // Append ONLY if actually moved OR activity state updated (keeps line colored)
                    setRoutePath(prev => {
                        const lastPoint = prev.length > 0 ? prev[prev.length - 1] : null;
                        const activityChanged = lastPoint && lastPoint.type !== act;

                        if (hasMoved || activityChanged || prev.length === 0) {
                            return [
                                ...prev,
                                {
                                    latitude: loc.latitude,
                                    longitude: loc.longitude,
                                    type: act,
                                    timestamp: Date.now()
                                }
                            ];
                        }
                        return prev; // Saves RAM by not appending duplicates
                    });
                }
            }, 1000);
        } else {
            clearInterval(routeUpdateTimer.current);
        }
        return () => clearInterval(routeUpdateTimer.current);
    }, [isTracking]); // Unbound from location changes to prevent interval resets

    useEffect(() => {
        if (isTracking) {
            checkpointTimer.current = setInterval(() => {
                saveActivityCheckpoint(latestSession.current);
            }, 60000);
        } else {
            clearInterval(checkpointTimer.current);
        }
        return () => clearInterval(checkpointTimer.current);
    }, [isTracking]); // Independent of session changes, saves every 60s seamlessly

    const startBackgroundTrack = async () => {
        try {
            await Location.startLocationUpdatesAsync(LOCATION_TRACKING_TASK, {
                accuracy: Location.Accuracy.Balanced,
                timeInterval: 2000,
                distanceInterval: 5,
                foregroundService: {
                    notificationTitle: 'FitPung Running',
                    notificationBody: 'Recording your run in the background',
                    notificationColor: '#B1FC30',
                },
            });
        } catch (err) {
            console.error('Failed to start background tracking:', err);
        }
    };

    const stopBackgroundTrack = async () => {
        try {
            const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING_TASK);
            if (hasStarted) {
                await Location.stopLocationUpdatesAsync(LOCATION_TRACKING_TASK);
            }
        } catch (err) {
            console.error('Failed to stop background tracking:', err);
        }
    };

    const centerOnUser = () => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }, 1000);
        }
    };

    const handleStartRun = () => {
        if (!isTracking && !isCountingDown) {
            if (!startTime) {

                setIsCountingDown(true);
                setCountdownValue(3);

                let count = 3;
                const interval = setInterval(() => {
                    count -= 1;
                    if (count > 0) {
                        setCountdownValue(count);
                    } else {
                        clearInterval(interval);
                        setIsCountingDown(false);

                        setIsTracking(true);
                        setStartTime(new Date().toISOString());
                        startBackgroundTrack();
                    }
                }, 1000);
            } else {


                lastLocation.current = latestLocation.current;

                setRoutePath(prev => [...prev, { type: 'break' }]);
                setIsTracking(true);
                startBackgroundTrack();
            }
        } else if (isTracking) {

            setIsTracking(false);
            stopBackgroundTrack();
        }
    };

    const resetRunData = () => {
        setIsTracking(false);
        setStartTime(null);
        setTotalDistance(0);
        setDuration(0);
        setCalories(0);
        setRoutePath([]);
        lastLocation.current = location;
    };

    const handleFinishRun = async () => {
        setIsTracking(false);
        stopBackgroundTrack();
        setIsSyncing(true);

        await saveActivityCheckpoint(latestSession.current);

        const savedData = await getActivityCheckpoint();

        if (!savedData) {
            Alert.alert("Error", "Could not retrieve activity data from storage.");
            setIsSyncing(false);
            return;
        }


        const cleanRoutePath = (savedData.routePath || [])
            .filter(p => p.type !== 'break' && p.latitude && p.longitude)
            .map(({ latitude, longitude, timestamp, type }) => ({ latitude, longitude, timestamp, type }));

        const finalData = {
            type: 'Running',
            distance: parseFloat(savedData.totalDistance.toFixed(2)),
            duration: savedData.duration,
            calories: Math.round(savedData.calories),
            routePath: cleanRoutePath,
            startTime: savedData.startTime,
            endTime: new Date().toISOString(),
            shoeId: savedData.shoeId // <--- Backend expects this!
        };

        try {
            const result = await syncActivityWithBackend(finalData);
            if (result && result.success) {
                await clearActivityCheckpoint();
                Alert.alert("Success", "Activity synced successfully!", [
                    {
                        text: "OK", onPress: () => {
                            resetRunData();
                            navigation.goBack();
                        }
                    }
                ]);
            } else {
                Alert.alert("Sync Failed", `Data is saved locally. ${result ? result.error : ''}`);


                resetRunData();
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong during sync.");
            resetRunData(); // Ensure UI is reset even on crash
        } finally {
            setIsSyncing(false);
        }
    };

    if (isLoading) return <LoadingState />;
    if (errorMsg) return <ErrorState message={errorMsg} onGoBack={() => navigation.goBack()} />;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Countdown Overlay */}
            {isCountingDown && (
                <View style={styles.countdownOverlay}>
                    <Text style={styles.countdownText}>{countdownValue}</Text>
                </View>
            )}

            <MapComponent ref={mapRef} location={location} routePath={routePath} />

            <BackButton onPress={() => navigation.goBack()} />

            <ActionButtons
                onStartPress={handleStartRun}
                onLocationPress={centerOnUser}
                onShoePress={() => setIsShoeModalVisible(true)}
                isTracking={isTracking}
                onFinishPress={handleFinishRun}
                hasStarted={!!startTime}
            />

            <RunStatsCard
                distance={totalDistance.toFixed(2)}
                status={isSyncing ? "Syncing..." : (isTracking ? currentActivity : "Paused")}
                time={formatTime(duration)}
                calories={Math.round(calories)}
            />

            {/* Shoe Modal */}
            <ShoeSelectionModal
                visible={isShoeModalVisible}
                onClose={() => setIsShoeModalVisible(false)}
                onSelectShoe={(shoe) => setSelectedShoe(shoe)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    countdownOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    countdownText: {
        color: '#B1FC30', // App's primary green color
        fontSize: 140,
        fontWeight: '900',
        fontStyle: 'italic',
    },
});

export default RunPage;

