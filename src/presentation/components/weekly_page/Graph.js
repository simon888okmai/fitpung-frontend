import { View, Text } from "react-native";

const Graph = ({ data = [] }) => {

    const defaultData = [
        { day: 'M', value: 0 },
        { day: 'T', value: 0 },
        { day: 'W', value: 0 },
        { day: 'T', value: 0 },
        { day: 'F', value: 0 },
        { day: 'S', value: 0 },
        { day: 'S', value: 0 },
    ];

    const weeklyData = data && data.length === 7 ? data : defaultData;

    const values = weeklyData.map(item => item.value || 0);
    const maxVal = Math.max(...values, 5);
    const MAX_VAL = Math.ceil(maxVal / 5) * 5; // Round to nearest 5 for cleaner labels

    return (
        <View className="mb-10">

            <View className="flex-row">
                {/* --- ส่วนกราฟด้านซ้าย (Left Side) --- */}
                <View className="flex-1">

                    {/* 1. พื้นที่กราฟแท่ง (Plot Area) */}
                    <View className="h-[120px] border-l-2 border-b-2 border-white/80 flex-row items-end px-3 justify-between">
                        {weeklyData.map((item, index) => (
                            <View key={index} className="items-center w-[15px]">
                                {/* ตัวแท่งกราฟ */}
                                <View
                                    className={`w-[8px] rounded-t-sm ${item.value > 0 ? 'bg-[#B1FC30]/90 shadow-sm shadow-[#B1FC30]' : 'bg-white/10'}`}
                                    style={{

                                        height: `${(item.value / MAX_VAL) * 100}%`
                                    }}
                                />
                            </View>
                        ))}
                    </View>

                    {/* 2. ตัวหนังสือบอกวัน (X-Axis Labels) */}
                    <View className="flex-row px-3 justify-between mt-2">
                        {weeklyData.map((item, index) => (
                            <View key={index} className="w-[15px] items-center">
                                <Text className={`text-[10px] font-line-bold ${item.value > 0 ? 'text-white' : 'text-gray-500'}`}>
                                    {item.day}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>


                {/* --- ส่วนสเกลด้านขวา (Right Axis Labels) --- */}
                <View className="ml-2 h-[120px] justify-between py-0">
                    <Text className="text-gray-400 text-[10px] font-line-bold">{MAX_VAL} km</Text>
                    <Text className="text-gray-400 text-[10px] font-line-bold">{MAX_VAL / 2} km</Text>
                    <Text className="text-gray-400 text-[10px] font-line-bold">0 km</Text>
                </View>
            </View>
        </View>
    );
}

export default Graph;
