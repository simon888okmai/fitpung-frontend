// src/hooks/useHomeData.js
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../../services/home';
import { formatDuration, formatPace, formatDate } from '../../utils/formatters';

export const useHomeData = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['homeData'], // Key สำหรับ Cache
        queryFn: async () => {
            const rawData = await fetchHomeData();

            // Format ข้อมูล "Last Run" (ถ้ามี)
            if (rawData.lastRun) {
                return {
                    ...rawData,
                    lastRun: {
                        ...rawData.lastRun,
                        // Format รอไว้เลย
                        dateDisplay: formatDate(rawData.lastRun.date),
                        durationDisplay: formatDuration(rawData.lastRun.duration),
                        paceDisplay: formatPace(rawData.lastRun.pace)
                    }
                };
            }
            return rawData;
        },
        staleTime: 30 * 1000, // Cache ไว้ 30 วินาที
    });

    return { data, loading: isLoading, error: error?.message, refetch };
};