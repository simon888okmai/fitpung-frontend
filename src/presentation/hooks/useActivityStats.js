import { useQuery } from '@tanstack/react-query'; // ✅ พระเอกของเรา
import { fetchStatsData } from '../../services/activity';
import { formatDuration, formatPace, formatDate, formatTime } from '../../utils/formatters';

export const useActivityStats = () => {
    // เตรียมตัวแปร (เดือน/ปี) เพื่อใช้เป็น "Key"
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // 🔥 เรียกใช้ useQuery
    const { data, isLoading, error, refetch } = useQuery({
        // 1. queryKey: เหมือนชื่อไฟล์ใน Cache (ถ้าเดือนเปลี่ยน -> โหลดใหม่)
        queryKey: ['activityStats', month, year],

        // 2. queryFn: ฟังก์ชันสำหรับไปดึงของ (และปรุงรส)
        queryFn: async () => {
            console.log("🚀 Fetching Activity Stats..."); // เช็ค Log ได้ว่ามันยิงจริงไหม
            const rawData = await fetchStatsData(month, year);

            // 3. Format Data ตรงนี้เลย (เหมือนเดิม)
            return {
                ...rawData,
                summary: {
                    ...rawData.summary,
                    totalTimeDisplay: formatDuration(rawData.summary.totalTime),
                },
                recentRuns: rawData.recentRuns.map(run => ({
                    ...run,
                    date: formatDate(run.timestamp),
                    time: formatTime(run.timestamp),
                    duration: formatDuration(run.duration),
                    pace: formatPace(run.pace)
                }))
            };
        },

        // 4. staleTime: ⏳ "ความสดใหม่" (1 นาที)
        // ถ้ากลับมาหน้านี้ภายใน 1 นาที ให้ใช้ของเดิม (ไม่ยิง API)
        staleTime: 60 * 1000,
    });

    return {
        data,
        loading: isLoading, // เปลี่ยนชื่อให้ตรงกับ UI เดิม
        error: error ? error.message : null,
        refetch
    };
};