import { View, Text } from "react-native";

const Graph = () => {
    // ข้อมูลจำลอง 7 วัน (จันทร์ - อาทิตย์)
    // value: จำนวน km ที่วิ่งได้
    const weeklyData = [
        { day: 'M', value: 0 },   // Mon
        { day: 'T', value: 20 },   // Tue
        { day: 'W', value: 0 },   // Wed
        { day: 'T', value: 0 },   // Thu
        { day: 'F', value: 4 },   // Fri (สมมติว่าวิ่งวันนี้)
        { day: 'S', value: 0 },   // Sat
        { day: 'S', value: 0 },   // Sun
    ];

    // กำหนดค่าสูงสุดของกราฟ (Y-Axis Max)
    const MAX_VAL = 20;

    return (
        <View className="mb-10">
            {/* เส้นขีดหัวข้อ */}
            <View className="border-t-[2px] border-[#B1FC30] w-[40%] mb-4" />
            <Text className="text-[#B1FC30] font-line-bold text-[20px] mb-4">Last week</Text>

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
                                        // คำนวณความสูงตาม % (เช่นวิ่ง 5km จาก max 10km = สูง 50%)
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
