const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export const registerUser = async (userData) => {
    console.log(BASE_URL)
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

