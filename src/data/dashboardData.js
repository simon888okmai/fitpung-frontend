
// 1. แบบมีข้อมูลครบ (Full State)
export const MOCK_DASHBOARD_FULL = {
    user: {
        name: "Simon",
    },
    weeklyGoal: {
        current: 100,
        target: 150,
        streak: 3,
        unit: "km"
    },
    lastRun: {
        date: "Yesterday 18:30",
        distance: "12.5 km",
        duration: "1:32:10 hours",
        pace: "6'25\" /km",
        calories: "200 kcal"
    },
    activeShoe: {
        name: "Adidas adizero evo sl",
        currentdistance: 350.5,
        maxdistance: 600,
    }
};

// 2. แบบไม่มีข้อมูล (Empty State) สำหรับเทสปุ่มบวก
export const MOCK_DASHBOARD_EMPTY = {
    user: {
        name: "Simon",
        avatar: "https://i.pravatar.cc/150?u=simon"
    },
    weeklyGoal: null,
    lastRun: null,
    activeShoe: null
};