import { useQuery } from '@tanstack/react-query';
import { fetchStatsData } from '../../services/activity';
import { formatDuration, formatPace, formatDate, formatTime } from '../../utils/formatters';

export const useActivityStats = () => {
    // เตรียมตัวแปร (เดือน/ปี) เพื่อใช้เป็น "Key"
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // 🔥 เรียกใช้ useQuery
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['activityStats', month, year],

        queryFn: async () => {
            const rawData = await fetchStatsData(month, year);

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

        staleTime: 60 * 1000,
    });

    return {
        data,
        loading: isLoading,
        error: error ? error.message : null,
        refetch
    };
};