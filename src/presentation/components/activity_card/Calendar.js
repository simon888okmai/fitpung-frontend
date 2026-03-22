import React from 'react';
import { View, Text } from 'react-native';

const CalendarView = ({ year, month, runDays = [] }) => {



    const now = new Date();
    const currentDay = now.getDate();      // วันที่ปัจจุบัน (เช่น 21)
    const currentMonth = now.getMonth();   // เดือนปัจจุบัน (0-11)
    const currentYear = now.getFullYear(); // ปีปัจจุบัน (เช่น 2026)

    const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (y, m) => {
        const day = new Date(y, m, 1).getDay();
        return day === 0 ? 6 : day - 1; // ปรับให้เริ่มวันจันทร์
    };

    const daysArray = [
        ...Array(getFirstDayOfMonth(year, month)).fill(null),
        ...Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1)
    ];

    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <View className="w-full">
            {/* Header M T W ... */}
            <View className="flex-row justify-between mb-4">
                {weekDays.map((d, i) => (
                    <Text key={i} className="text-primary font-line-bold text-[20px] w-[14.28%] text-center">{d}</Text>
                ))}
            </View>

            {/* Body */}
            <View className="flex-row flex-wrap">
                {daysArray.map((day, index) => {
                    if (day === null) return <View key={index} className="w-[14.28%] aspect-square" />;

                    const isRunDay = runDays.includes(day);

                    const isToday =
                        day === currentDay &&
                        month === currentMonth &&
                        year === currentYear;




                    const isPast =
                        year < currentYear ||
                        (year === currentYear && month < currentMonth) ||
                        (year === currentYear && month === currentMonth && day < currentDay);

                    return (
                        <View key={index} className="w-[14.28%] aspect-square justify-center items-center mb-2">
                            <View
                                className={`w-[36px] h-[36px] justify-center items-center rounded-full
                                ${isRunDay ? 'bg-[#D64927]' : 'bg-transparent'} 
                                `}
                            >
                                <Text className={`text-[16px] font-line-bold
                                    ${isRunDay ? 'text-white' :
                                        isToday ? 'text-primary' :    // วันนี้สีเขียว
                                            isPast ? 'text-gray-500' :    // ผ่านมาแล้วสีเทา
                                                'text-white'}                 // อนาคตสีขาว
                                `}>
                                    {day}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default CalendarView;