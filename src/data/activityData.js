export const ACTIVITY_DATA_FULL = {
    user: {
        name: "FitPung Runner",
    },
    currentMonth: "January 2026", // ใช้ currentMonth ให้สื่อความหมาย

    summary: {
        streak: 3,
        totalDistance: 100.63,
        totalTime: "10:23:56",
        totalCalories: 2000,
        runDays: [6, 8, 9, 10, 20], // วันที่มีจุดสีส้ม
    },

    cards: {
        weeklyGoal: {
            current: 100,
            target: 150,
            unit: "km",
            status: "On Track",
        },
        badges: {
            unlocked: 4,
            total: 10,
        }
    },

    recentRuns: [
        {
            id: "run-04",
            date: "Jan 22, 2026",
            time: "18:30",
            distance: 5.00,
            duration: "00:30:00",
            pace: "6'00''",
            kcal: 350,
        },
        {
            id: "run-03",
            date: "Jan 21, 2026",
            time: "19:30",
            distance: 7.29,
            duration: "01:00:00",
            pace: "6'00''",
            kcal: 450,
        },
        {
            id: "run-02",
            date: "Jan 20, 2026",
            time: "18:30",
            distance: 5.00,
            duration: "00:30:00",
            pace: "6'00''",
            kcal: 350,
        },
    ]
};

// ---------------------------------------------------------

// 2. ข้อมูลแบบว่างเปล่า (Empty State / New User)
export const ACTIVITY_DATA_EMPTY = {
    user: {
        name: "New Runner",
        avatar: null, // ไม่มีรูป
    },
    currentMonth: "January 2026",

    summary: {
        streak: 0,
        totalDistance: 0,     // ยังไม่เคยวิ่ง
        totalTime: "00:00:00",
        totalCalories: 0,
        runDays: [],          // ปฏิทินโล่ง ไม่มีจุดสีส้ม
    },

    cards: {
        weeklyGoal: {
            current: 0,
            target: 100,      // เป้าเริ่มต้น (Default)
            unit: "km",
            status: "Let's Start!", // ข้อความเชียร์
        },
        badges: {
            unlocked: 0,
            total: 10,
        }
    },

    recentRuns: [] // ยังไม่มีรายการวิ่ง
};

// เลือก export ตัวใดตัวหนึ่งเป็น default เพื่อให้เรียกใช้ง่ายๆ
export default ACTIVITY_DATA_FULL;