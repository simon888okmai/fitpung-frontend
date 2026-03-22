import { registerRootComponent } from 'expo';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateDistance, calculateCalories } from './src/utils/trackingUtils';
import App from './src/App';

const LOCATION_TRACKING_TASK = 'LOCATION_TRACKING_TASK';

// Define the background task
TaskManager.defineTask(LOCATION_TRACKING_TASK, async ({ data, error }) => {
    if (error) {
        console.error('Background location task error:', error);
        return;
    }
    if (data) {
        const { locations } = data;
        const [location] = locations;
        if (location) {
            try {
                // Background tasks don't have access to React state, 
                // so we save to AsyncStorage for RunPage to pick up later
                const storedData = await AsyncStorage.getItem('@fitpung_current_activity');
                const activity = storedData ? JSON.parse(storedData) : null;

                if (activity) {
                    const lastPoint = activity.routePath && activity.routePath.length > 0
                        ? activity.routePath[activity.routePath.length - 1]
                        : null;

                    const newPoint = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        type: 'Running',
                        timestamp: Date.now()
                    };

                    activity.routePath = [...(activity.routePath || []), newPoint];

                    // Update metrics if we have a previous point
                    if (lastPoint) {
                        const dist = calculateDistance(
                            lastPoint.latitude,
                            lastPoint.longitude,
                            newPoint.latitude,
                            newPoint.longitude
                        );
                        if (dist > 0.002) {
                            activity.totalDistance = (activity.totalDistance || 0) + dist;
                            activity.calories = calculateCalories(activity.totalDistance);
                        }
                    }

                    await AsyncStorage.setItem('@fitpung_current_activity', JSON.stringify(activity));
                }
            } catch (err) {
                console.error('Failed to save background location:', err);
            }
        }
    }
});

registerRootComponent(App);
