import AsyncStorage from '@react-native-async-storage/async-storage';
import { triggerLogout } from './authEvent';

const STORAGE_KEY = '@fitpung_current_activity';

/**
 * Saves the current activity state to local storage for recovery.
 */
export const saveActivityCheckpoint = async (activityData) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(activityData));
    } catch (e) {
        console.error('Failed to save activity checkpoint', e);
    }
};

/**
 * Retrieves the activity checkpoint if it exists.
 */
export const getActivityCheckpoint = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to get activity checkpoint', e);
        return null;
    }
};

/**
 * Clears the activity checkpoint from local storage.
 */
export const clearActivityCheckpoint = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error('Failed to clear activity checkpoint', e);
    }
};

/**
 * Syncs the completed activity with the backend.
 */
export const syncActivityWithBackend = async (activityData) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const API_URL = process.env.EXPO_PUBLIC_API_URL;

        const response = await fetch(`${API_URL}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify(activityData)
        });

        const result = await response.json();

        if (response.status === 401) {
            triggerLogout();
            return { success: false, error: 'Session expired' };
        }

        if (response.ok && result.status === 'success') {

            return { success: true, data: result.data, newBadges: result.newBadges };
        }

        const errMsg = result.message || result.error || JSON.stringify(result);
        console.error("Backend Error:", errMsg);
        return { success: false, error: errMsg };

    } catch (error) {
        console.error('Failed to sync activity with backend:', error);
        return { success: false, error: error.message };
    }
};

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchStatsData = async (month, year) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${BASE_URL}/stats?month=${month}&year=${year}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await response.json();
        if (response.status === 401) { triggerLogout(); throw new Error('Session expired'); }
        if (!response.ok) throw new Error(json.error || "Fetch failed");

        return json;
    } catch (error) {
        throw error;
    }
};

export const fetchAllRuns = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${BASE_URL}/activities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const json = await response.json();
        if (response.status === 401) { triggerLogout(); throw new Error('Session expired'); }
        if (!response.ok) throw new Error(json.error || "Fetch failed");

        return json.data;
    } catch (error) {
        console.error("Fetch All Runs Error:", error);
        throw error;
    }
};

export const fetchActivityDetails = async (id) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${BASE_URL}/activities/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const text = await response.text();
        let json;
        try {
            json = JSON.parse(text);
        } catch (e) {
            throw new Error(`Backend sent non-JSON text: ${text}`);
        }

        if (response.status === 401) { triggerLogout(); throw new Error('Session expired'); }
        if (!response.ok) throw new Error(json.error || json.message || "Fetch failed");

        return json.data;
    } catch (error) {
        console.error("Fetch Activity Details Error:", error);
        throw error;
    }
};
