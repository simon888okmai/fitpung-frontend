import { useState, useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';
import { harModelService } from '../../services/ai/HarModelService';

const WINDOW_SIZE = 100; // 50Hz * 2 seconds

export const useActivityRecognition = (isTracking) => {
    const [currentActivity, setCurrentActivity] = useState("Stationary");
    const bufferRef = useRef([]);
    const subscription = useRef(null);

    useEffect(() => {
        harModelService.initialize();
    }, []);

    useEffect(() => {
        if (isTracking) {

            Accelerometer.setUpdateInterval(20);

            subscription.current = Accelerometer.addListener(data => {

                const x = data.x * 9.81;
                const y = data.y * 9.81;
                const z = data.z * 9.81;

                const magnitude = Math.sqrt(x * x + y * y + z * z);

                const ax = (x - (-0.18200116482123732)) / 5.189256966259507;
                const ay = (y - 6.141968012738515) / 8.711534803600445;
                const az = (z - (-3.1081432506977946)) / 5.96693030459829;
                const scaledMag = (magnitude - 11.779727640266291) / 6.861410236798096;

                bufferRef.current.push([ax, ay, az, scaledMag]);

                if (bufferRef.current.length >= WINDOW_SIZE) {

                    const flattenedData = bufferRef.current.flat();

                    harModelService.predict(flattenedData).then(prediction => {
                        setCurrentActivity(prediction);
                    });


                    bufferRef.current = bufferRef.current.slice(50);
                }
            });
        } else {

            if (subscription.current) {
                subscription.current.remove();
                subscription.current = null;
            }
            bufferRef.current = [];
            setCurrentActivity("Paused");
        }

        return () => {
            if (subscription.current) {
                subscription.current.remove();
            }
        };
    }, [isTracking]);

    return { currentActivity };
};
