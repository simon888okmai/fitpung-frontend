const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const json = await response.json();
        return { ok: response.ok, data: json };
    } catch (error) {
        return { ok: false, data: { message: "Cannot connect to server" } };
    }
}

export const loginUser = async (authUser) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authUser)
        });
        const json = await response.json();
        return { ok: response.ok, data: json };
    } catch (error) {
        return { ok: false, data: { message: "Cannot connect to server" } };
    }
}