import { View, ScrollView } from 'react-native';
import ACTIVITY_DATA from '../../../data/activityData';
import ThisMonth from '../../components/activity_card/ThisMonth';
import CalendarView from '../../components/activity_card/Calendar';
import WeeklyGoals from '../../components/activity_card/WeeklyGoals';
import Badges from '../../components/activity_card/Badges';

const ActivityPage = () => {
    const data = ACTIVITY_DATA;

    // 1. ดึงวันเวลาปัจจุบัน
    const now = new Date();
    const thisYear = now.getFullYear(); // 2026
    const thisMonthIndex = now.getMonth(); // 0 (January)

    // 2. สร้าง Array ชื่อเดือน (ภาษาอังกฤษ)
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // 3. ผสมคำใหม่ให้เป็น "January 2026"
    const displayMonth = `${monthNames[thisMonthIndex]} ${thisYear}`;

    return (
        <ScrollView className="flex-1 bg-color">
            <View className="flex-1 px-[22px] mt-[18px]">

                {/* 4. ส่งค่าที่ผสมคำแล้ว (displayMonth) เข้าไป */}
                <View className='mb-[20px]'>
                    <ThisMonth
                        month={displayMonth} // ส่งคำว่า "January 2026" ไป
                        stats={data.summary}
                    />
                </View>

                {/* ส่งปีและเดือนที่เป็นตัวเลขไปให้ปฏิทินคำนวณ */}
                <CalendarView
                    year={thisYear}
                    month={thisMonthIndex}
                    runDays={data.summary.runDays}
                />
                <View className="bg-primary h-[2px] w-full"></View>
                <View className='flex-row gap-x-[15px] mt-[30px] mb-[50px]'>
                    <WeeklyGoals
                        data={data.cards.weeklyGoal}
                    />
                    <Badges
                        data={data.cards.badges}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default ActivityPage;