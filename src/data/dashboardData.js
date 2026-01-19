// src/data/dashboardMock.ts

// 1. แบบมีข้อมูลครบ (Full State)
export const MOCK_DASHBOARD_FULL = {
    user: {
        name: "Simon",
    },
    weekly_goal: {
        current: 150,
        target: 150,
        streak: 3,
        unit: "KM"
    },
    last_run: {
        date: "Yesterday 18:30",
        distance: "12.5 km",
        duration: "1:32:10 hours",
        pace: "6'25\" /km",
        calories: "200 kcal"
    },
    active_shoe: {
        name: "Adidas adizero evo sl",
        current_distance: 350.5,
        max_distance: 600,
        image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/..." // ใส่ URL รูปชั่วคราว
    }
};

// 2. แบบไม่มีข้อมูล (Empty State) สำหรับเทสปุ่มบวก
export const MOCK_DASHBOARD_EMPTY = {
    user: {
        name: "Simon",
        avatar: "https://i.pravatar.cc/150?u=simon"
    },
    weekly_goal: null,
    last_run: null,
    active_shoe: null
};