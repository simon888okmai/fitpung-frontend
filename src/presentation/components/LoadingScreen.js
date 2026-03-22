import React, { useRef, useEffect, useState } from 'react'; // 👈 1. อย่าลืมเพิ่ม useState
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LoadingScreen() {
    const animation = useRef(null);
    const [dots, setDots] = useState(''); // 👈 2. สร้างตัวแปรเก็บจุด

    useEffect(() => {

        const interval = setInterval(() => {
            setDots(prev => {
                if (prev.length >= 3) return ''; // ถ้าครบ 3 จุด (. . .) ให้เคลียร์ทิ้ง
                return prev + '.'; // ถ้ายังไม่ครบ ให้เติมจุดเพิ่ม
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <View className="flex-1 bg-[#1C1C1E] justify-center items-center">

            {/* พื้นที่สำหรับ Animation */}
            <View className="w-64 h-64">
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    source={require('../../../assets/animated/running.json')}
                />
            </View>

            {/* 👇 4. แสดงผลจุดที่ขยับได้ */}
            {/* ผมเพิ่ม min-width (w-[100px]) และ text-left เพื่อกันไม่ให้คำว่า Loading เต้นซ้ายขวาตอนจุดงอกครับ */}
            <View className="mt-[-20px] flex-row justify-center w-[120px]">
                <Text className="text-white font-line-bold text-xl">
                    Loading
                </Text>
                <Text className="text-white font-line-bold text-xl w-[24px]">
                    {dots}
                </Text>
            </View>

        </View>
    );
}