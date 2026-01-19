// src/presentation/screens/Homepage/components/GoalRing.js

import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const GoalRing = ({
    current = 0,
    target = 100,
    size = 80,       // ปรับขนาดได้ตามต้องการ
    strokeWidth = 15 // ความหนาเส้น
}) => {
    // คำนวณรัศมี (แบบปกติ ไม่ต้องเผื่อแสง)
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    // คำนวณ Progress
    const progress = Math.min(Math.max(current / target, 0), 1);
    const strokeDashoffset = circumference - (progress * circumference);

    // Config สี
    const neonColor = "#B1FC30";
    const bgColor = "#333333";

    const circleProps = {
        cx: size / 2,
        cy: size / 2,
        r: radius,
        fill: "none",
        rotation: "-90",
        origin: `${size / 2}, ${size / 2}`,
        strokeLinecap: "none", // ปลายมน
    };

    return (
        <View style={{ width: size, height: size }} className="justify-center items-center">
            <Svg width={size} height={size}>

                {/* 1. วงกลมพื้นหลัง (สีเทา) */}
                <Circle
                    {...circleProps}
                    stroke={bgColor}
                    strokeWidth={strokeWidth}
                />

                {/* 2. วงกลม Progress (สีเขียว) - เส้นเดียวเน้นๆ */}
                <Circle
                    {...circleProps}
                    stroke={neonColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                />
            </Svg>
        </View>
    );
};

export default GoalRing;