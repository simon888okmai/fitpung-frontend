/**
 * Calculates the Haversine distance between two points on Earth.
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

/**
 * Estimates calories burned based on distance and a baseline rate.
 * @param {number} distanceKm 
 * @returns {number} Estimated calories
 */
export const calculateCalories = (distanceKm, weightKg = 65) => {

    return distanceKm * weightKg * 1.036;
};

/**
 * Formats seconds into HH:MM:SS
 * @param {number} totalSeconds 
 * @returns {string}
 */
export const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .join(":");
};

/**
 * Calculates kilometer splits from a routePath for summarizing Pace per kilometer.
 * @param {Array} routePath 
 * @returns {Array} List of splits: [{ km: 1, durationSeconds: 330, pace: '05:30' }]
 */
export const calculateSplits = (routePath = []) => {
    if (!routePath || routePath.length === 0) return [];

    const splits = [];
    let accumulatedDistance = 0;
    let nextMarkerKm = 1.0;
    let lastKmTimestamp = routePath[0].timestamp;

    for (let i = 1; i < routePath.length; i++) {
        const p1 = routePath[i - 1];
        const p2 = routePath[i];

        if (p1.latitude && p1.longitude && p2.latitude && p2.longitude && p1.type !== 'break') {
            const d = calculateDistance(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
            accumulatedDistance += d;

            if (accumulatedDistance >= nextMarkerKm) {
                const durationMs = p2.timestamp - lastKmTimestamp;
                const durationSec = Math.max(1, Math.floor(durationMs / 1000));

                const paceMin = Math.floor(durationSec / 60);
                const paceSec = durationSec % 60;
                const paceStr = `${paceMin}:${paceSec < 10 ? '0' + paceSec : paceSec}`;

                splits.push({
                    km: Math.floor(nextMarkerKm),
                    durationSeconds: durationSec,
                    pace: paceStr,
                });

                lastKmTimestamp = p2.timestamp;
                nextMarkerKm += 1.0;
            }
        } else if (p2.type === 'break' || !p1.timestamp) {
            // Adjust if break/pause is detected, reset time tracking to connect next valid gap
            if (i + 1 < routePath.length) {
                lastKmTimestamp = routePath[i + 1].timestamp;
            }
        }
    }
    return splits;
};
