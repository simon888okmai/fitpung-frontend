// src/data/mockActivityData.js

const ACTIVITY_DATA = {
    // --- 1. ข้อมูลส่วนตัวและวันที่ ---
    user: {
        name: "FitPung Runner",
        avatar: "https://github.com/shadcn.png", // รูป Profile
    },
    currentDate: "January 2026",

    // --- 2. สรุปภาพรวม (Stats Overview) ---
    summary: {
        streak: 3,
        totalDistance: 5000.63,  // km
        totalTime: "10:23:56",  // hh:mm:ss
        totalCalories: 2000,    // kcal
        // วันที่มีการวิ่ง (เอาไว้ไฮไลท์สีส้มในปฏิทิน)
        runDays: [6, 8, 9, 10],
    },

    // --- 3. ข้อมูลการ์ด (Cards: Goals & Badges) ---
    cards: {
        weeklyGoal: {
            current: 100,
            target: 150,
            unit: "km",
            streak: 3,
            status: "🔥 On Track",
        },
        badges: {
            unlocked: 4,
            total: 10,
        }
    },

    // --- 4. ประวัติการวิ่งล่าสุด (Recent Runs List) ---
    // ข้อมูลตรงนี้จะแมตช์กับ runDays ด้านบนครับ
    recentRuns: [
        {
            id: "run-01",
            date: "Jan 22, 2026", // ตรงกับวันที่ 22 ใน runDays
            time: "18:30",
            distance: 5.00,
            duration: "00:30:00",
            pace: "6:00",
            kcal: 350,
        },
        {
            id: "run-02",
            date: "Jan 20, 2026", // ตรงกับวันที่ 20 ใน runDays
            time: "06:15",
            distance: 10.50,
            duration: "01:05:00",
            pace: "6:12",
            kcal: 720,
        },
        {
            id: "run-03",
            date: "Jan 10, 2026", // ตรงกับวันที่ 10 ใน runDays
            time: "19:00",
            distance: 8.20,
            duration: "00:50:15",
            pace: "6:08",
            kcal: 560,
        },
        {
            id: "run-04",
            date: "Jan 09, 2026", // ตรงกับวันที่ 9 ใน runDays
            time: "17:45",
            distance: 3.50,
            duration: "00:20:00",
            pace: "5:42",
            kcal: 210,
        },
    ]
};

export default ACTIVITY_DATA;