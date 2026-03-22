import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.126:3001';

const getAuthHeaders = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };
    } catch {
        return { 'Content-Type': 'application/json' };
    }
};

export const getMyShoes = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/shoes`, { headers });
        const result = await response.json();

        if (result.status === 'success') {
            return result.data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching shoes:", error);
        return [];
    }
};

export const setDefaultShoe = async (shoeId) => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/shoes/${shoeId}/default`, {
            method: 'PATCH',
            headers
        });
        const result = await response.json();
        return result.status === 'success';
    } catch (error) {
        console.error("Error setting default shoe:", error);
        return false;
    }
};

export const addShoe = async (shoeData) => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/shoes`, {
            method: 'POST',
            headers,
            body: JSON.stringify(shoeData)
        });
        const result = await response.json();
        return { success: result.status === 'success', data: result.data || null };
    } catch (error) {
        console.error("Error adding shoe:", error);
        return { success: false, data: null };
    }
};

export const retireShoe = async (shoeId) => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/shoes/${shoeId}/retire`, {
            method: 'PATCH',
            headers
        });
        const result = await response.json();
        return result.status === 'success';
    } catch (error) {
        console.error("Error retiring shoe:", error);
        return false;
    }
};
