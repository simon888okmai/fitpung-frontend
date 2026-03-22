
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchHomeData = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error("No token found");

        const response = await fetch(`${BASE_URL}/home`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.error || "Failed to fetch home data");

        return json.data; // ส่งกลับเฉพาะไส้ใน data
    } catch (error) {
        throw error;
    }
};