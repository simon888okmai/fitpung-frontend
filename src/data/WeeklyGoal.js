// กรณีที่ 1: มีเป้าหมาย และกำลังทำอยู่ (On Track) 🟢
export const WEEKLY_GOAL_ACTIVE = {
    hasGoal: true,       // ตัวเช็คว่ามีเป้าไหม
    current: 500,       // ระยะที่วิ่งได้
    target: 1000,          // เป้าหมาย
    unit: 'km',
    status: 'On Track',  // สถานะ
    statusColor: '#B1FC30', // สีเขียว
    burn: 1000,          // แคลอรี่ที่เบิร์นไป (Optional)
    timeLeft: '3 days left',
    duration: 1000,
    avgPace: "6'54''"
};

// กรณีที่ 2: มีเป้าหมาย และทำสำเร็จแล้ว! (Completed) 🏆
export const WEEKLY_GOAL_COMPLETED = {
    hasGoal: true,
    current: 52.0,       // วิ่งเกินเป้า
    target: 50,
    unit: 'km',
    status: 'Goal Reached!',
    statusColor: '#FFD700', // สีทอง
    burn: 2100,
    timeLeft: 'Completed'
};

// กรณีที่ 3: มีเป้าหมาย แต่ตามหลังอยู่ (At Risk) ⚠️
export const WEEKLY_GOAL_AT_RISK = {
    hasGoal: true,
    current: 5.0,        // วิ่งได้น้อยมาก
    target: 50,
    unit: 'km',
    status: 'Behind Schedule',
    statusColor: '#FF4444', // สีแดง
    burn: 200,
    timeLeft: '1 day left'
};

// กรณีที่ 4: ยังไม่มีเป้าหมาย (Empty State) ⚪️
export const WEEKLY_GOAL_EMPTY = {
    hasGoal: false,      // ไม่มีเป้า
    current: 0,
    target: 0,
    unit: 'km',
    status: 'Set Goal',
    statusColor: '#666666', // สีเทา
    burn: 0,
    timeLeft: '-'
};