import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchWeeklyGoal = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error("No token found");

        const response = await fetch(`${BASE_URL}/goals/current`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.status === 401) {
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            throw new Error(json.error || json.message || "Failed to fetch weekly goal");
        }

        return json;

    } catch (error) {
        console.error("Fetch WeeklyGoal Error:", error);
        throw error;
    }
};

export const createWeeklyGoal = async (targetValue) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error("No token found");

        const response = await fetch(`${BASE_URL}/goals`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target: targetValue })
        });

        const json = await response.json();

        if (response.status === 401) {
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            throw new Error(json.message || json.error || "Failed to create goal");
        }

        return json.data;
    } catch (error) {
        console.error("Create WeeklyGoal Error:", error);
        throw error;
    }
};