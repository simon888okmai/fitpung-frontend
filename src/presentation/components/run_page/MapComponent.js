import React from 'react';
import { StyleSheet, Platform, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import { calculateDistance } from '../../../utils/trackingUtils';

const darkMapStyle = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9e9e9e" }]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#bdbdbd" }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#181818" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#1b1b1b" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#2c2c2c" }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#8a8a8a" }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{ "color": "#373737" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{ "color": "#3c3c3c" }]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{ "color": "#4e4e4e" }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#000000" }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#3d3d3d" }]
    }
];

const MapComponent = React.forwardRef(({ location, routePath = [] }, ref) => {

    const segments = [];
    let currentSegment = [];
    let lastType = null;

    // Milestone markers for kilometers
    const milestoneMarkers = [];
    let accumulatedDistance = 0;
    let nextMarkerKm = 1.0;

    for (let i = 0; i < routePath.length; i++) {
        const point = routePath[i];

        // 1. Calculate continuous distance
        if (i > 0 && point.latitude && point.longitude && routePath[i - 1].latitude && routePath[i - 1].longitude) {
            const d = calculateDistance(
                routePath[i - 1].latitude,
                routePath[i - 1].longitude,
                point.latitude,
                point.longitude
            );
            accumulatedDistance += d;

            if (accumulatedDistance >= nextMarkerKm) {
                milestoneMarkers.push({
                    coordinate: { latitude: point.latitude, longitude: point.longitude },
                    km: nextMarkerKm.toFixed(0)
                });
                nextMarkerKm += 1.0;
            }
        }

        // 2. Segment polyline by activity type
        if (point.type === 'break') {
            if (currentSegment.length > 1) segments.push({ points: currentSegment, type: lastType });
            currentSegment = [];
            lastType = null;
        } else {
            const currentType = point.type || 'RUN'; // Fallback

            if (lastType && currentType !== lastType) {
                if (currentSegment.length > 0) {
                    currentSegment.push(point); // Connect seamlessly
                    segments.push({ points: currentSegment, type: lastType });
                }
                currentSegment = [point];
            } else {
                currentSegment.push(point);
            }
            lastType = currentType;
        }
    }
    if (currentSegment.length > 1) segments.push({ points: currentSegment, type: lastType });

    // Map labels to colors
    const colorMap = {
        'RUN': '#B1FC30', // Neon Green (App Primary)
        'WALK': '#FFE600', // Yellow
        'IDLE': '#999999', // Greyish
    };

    return (
        <MapView
            ref={ref}
            style={styles.map}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            customMapStyle={darkMapStyle}
            initialRegion={{
                latitude: location?.latitude || 13.7563,
                longitude: location?.longitude || 100.5018,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={false}
            showsCompass={false}
        >
            {segments.map((segment, index) => (
                <Polyline
                    key={`segment-${index}`}
                    coordinates={segment.points}
                    strokeColor={colorMap[segment.type] || '#B1FC30'}
                    strokeWidth={6}
                    lineJoin="round"
                    lineCap="round"
                />
            ))}

            {milestoneMarkers.map((marker, index) => (
                <Marker key={`km-${index}`} coordinate={marker.coordinate} anchor={{ x: 0.5, y: 0.5 }}>
                    <View style={styles.markerContainer}>
                        <Text style={styles.markerText}>{marker.km}</Text>
                        <Text style={styles.markerUnit}>KM</Text>
                    </View>
                </Marker>
            ))}
        </MapView>
    );
});

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerContainer: {
        backgroundColor: '#1E1E1E',
        borderColor: '#B1FC30',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 3,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    markerText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 11,
    },
    markerUnit: {
        color: '#B1FC30',
        fontSize: 7,
        fontWeight: '900',
        marginTop: -1,
    }
});

export default MapComponent;
