export default ({ config }) => {
    return {
        ...config,
        android: {
            ...config.android,
            usesCleartextTraffic: true, // Forcibly guarantee this during EAS Prebuild
            config: {
                ...config.android?.config, // Preserve any other config items (like Google Maps if declared in app.json)
                googleMaps: {
                    apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
                }
            }
        }
    };
};
