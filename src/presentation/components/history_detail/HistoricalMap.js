import React, { useRef } from 'react';
import { View } from 'react-native';
import MapView, { Polyline, Marker, PROVIDER_DEFAULT } from 'react-native-maps';

const customDarkMapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] },
    { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },
    { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] },
    { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },
    { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] },
    { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] },
    { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] },
    { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }
];

const HistoricalMap = ({ routePath = [] }) => {
    const mapRef = useRef(null);

    const validCoords = routePath?.filter(p => p.latitude && p.longitude) || [];

    const segments = [];
    let currentSegment = [];
    let lastType = null;

    for (let i = 0; i < validCoords.length; i++) {
        const point = validCoords[i];
        const currentType = point.type || 'RUN';

        if (i > 0 && validCoords[i - 1].timestamp && point.timestamp) {
            const gap = point.timestamp - validCoords[i - 1].timestamp;
            if (gap > 10000) { // 10 seconds gap = pause was used
                if (currentSegment.length > 1) segments.push({ points: currentSegment, type: lastType });
                currentSegment = [];
                lastType = null;
            }
        }

        if (lastType && currentType !== lastType) {
            if (currentSegment.length > 0) {
                currentSegment.push(point); // Seamless connection
                segments.push({ points: currentSegment, type: lastType });
            }
            currentSegment = [point];
        } else {
            currentSegment.push(point);
        }
        lastType = currentType;
    }
    if (currentSegment.length > 1) segments.push({ points: currentSegment, type: lastType });

    if (validCoords.length === 0) {
        return <View className="h-[350px] w-full bg-[#1E1E1E] rounded-b-[30px] shadow-md shadow-black" />;
    }

    const startPt = validCoords[0];
    const endPt = validCoords[validCoords.length - 1];

    const initialRegion = {
        latitude: startPt.latitude,
        longitude: startPt.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const fitCameraToRoute = () => {
        if (mapRef.current && validCoords.length > 0) {
            mapRef.current.fitToCoordinates(validCoords, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    };

    return (
        <View className="h-[350px] w-full rounded-b-[30px] overflow-hidden shadow-lg shadow-black/50">
            <MapView
                ref={mapRef}
                provider={PROVIDER_DEFAULT}
                style={{ flex: 1 }}
                initialRegion={initialRegion}
                onMapReady={fitCameraToRoute}
                onLayout={fitCameraToRoute}
                customMapStyle={customDarkMapStyle}
            >
                {segments.map((segment, index) => {
                    const colorMap = {
                        'RUN': '#B1FC30', // Neon Green
                        'WALK': '#FFE600', // Yellow
                        'IDLE': '#999999', // Greyish
                    };
                    return (
                        <Polyline
                            key={`hist-segment-${index}`}
                            coordinates={segment.points}
                            strokeColor={colorMap[segment.type] || '#B1FC30'}
                            strokeWidth={5}
                            lineJoin="round"
                        />
                    );
                })}
                <Marker coordinate={startPt} title="Start" pinColor="green" />
                {validCoords.length > 1 && (
                    <Marker coordinate={endPt} title="End" pinColor="red" />
                )}
            </MapView>
        </View>
    );
};

export default HistoricalMap;
