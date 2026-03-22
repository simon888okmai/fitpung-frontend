import React, { useEffect, useState } from 'react'; // 👈 1. เพิ่ม useState
import { TextInput, View, TouchableOpacity } from 'react-native'; // 👈 2. เพิ่ม TouchableOpacity
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const AnimatedView = Animated.createAnimatedComponent(View);

const AnimatedInput = ({
    value,
    onChangeText,
    placeholder,
    isValid,
    isSecure = false, // รับค่ามาว่าเป็นช่องรหัสผ่านหรือไม่
    iconDefault = "text-outline"
}) => {

    const [showPassword, setShowPassword] = useState(false);

    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(isValid ? 1 : 0, { duration: 300 });
    }, [isValid]);

    const animatedStyle = useAnimatedStyle(() => {
        const borderColor = interpolateColor(
            progress.value,
            [0, 1],
            ['transparent', '#B1FC30']
        );
        const borderWidth = withTiming(isValid ? 2 : 0);
        return { borderColor, borderWidth };
    });

    return (
        <View className="mb-4">
            <AnimatedView
                className="flex-row items-center bg-white rounded-2xl px-4 h-[53px]"
                style={animatedStyle}
            >
                {/* ไอคอนด้านซ้าย (เหมือนเดิม) */}
                <Ionicons
                    name={isValid ? "checkmark-circle" : iconDefault}
                    size={24}
                    color={isValid ? "#B1FC30" : "#A2A2A2"}
                />

                <TextInput
                    className="flex-1 ml-3 text-black font-line-bold text-base"
                    placeholder={placeholder}
                    placeholderTextColor="#A2A2A2"
                    value={value}
                    onChangeText={onChangeText}

                    secureTextEntry={isSecure && !showPassword}
                    autoCapitalize="none"
                />

                {/* 👇 ส่วนปุ่มลูกตา (จะโผล่มาเฉพาะถ้า isSecure เป็น true) */}
                {isSecure && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)} // สลับสถานะ
                        className="ml-2 p-1" // เพิ่มพื้นที่กดนิดหน่อย
                    >
                        <Ionicons

                            name={showPassword ? "eye-outline" : "eye-off-outline"}
                            size={20}
                            color="#A2A2A2"
                        />
                    </TouchableOpacity>
                )}

            </AnimatedView>
        </View>
    );
};

export default AnimatedInput;