import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

// Components
import MapComponent from '../../components/run_page/MapComponent';
import RunStatsCard from '../../components/run_page/RunStatsCard';
import { BackButton, ActionButtons } from '../../components/run_page/RunControls';
import { LoadingState, ErrorState } from '../../components/run_page/RunStates';

const RunPage = () => {
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [runStats, setRunStats] = useState({
        distance: "0.00",
        status: "Running",
        time: "00:00:00"
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setIsLoading(false);
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
            setIsLoading(false);

            const subscriber = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 5,
                },
                (newLocation) => {
                    setLocation(newLocation.coords);
                }
            );

            return () => {
                if (subscriber) {
                    subscriber.remove();
                }
            };
        })();
    }, []);

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
        console.log('Start Run');
        // Logic to start run tracking would go here
    };

    if (isLoading) return <LoadingState />;
    if (errorMsg) return <ErrorState message={errorMsg} onGoBack={() => navigation.goBack()} />;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <MapComponent ref={mapRef} location={location} />

            <BackButton onPress={() => navigation.goBack()} />

            <ActionButtons
                onStartPress={handleStartRun}
                onLocationPress={centerOnUser}
                onShoePress={() => console.log('Select Shoe')}
            />

            <RunStatsCard
                distance={runStats.distance}
                status={runStats.status}
                time={runStats.time}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
});

export default RunPage;

