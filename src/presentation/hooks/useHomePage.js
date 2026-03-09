import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../../services/home';
import { formatDuration, formatPace, formatDate } from '../../utils/formatters';

export const useHomeData = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['homeData'],
        queryFn: async () => {
            const rawData = await fetchHomeData();

            if (rawData.weeklyGoal) {
                rawData.weeklyGoal = {
                    ...rawData.weeklyGoal,
                    current: rawData.weeklyGoal.currentKm || 0,
                    target: rawData.weeklyGoal.targetKm || 0,
                    unit: 'km'
                };
            }

            if (rawData.lastRun) {
                rawData.lastRun = {
                    ...rawData.lastRun,
                    dateDisplay: formatDate(rawData.lastRun.date),
                    durationDisplay: formatDuration(rawData.lastRun.duration),
                    paceDisplay: formatPace(rawData.lastRun.pace)
                };
            }

            return rawData;
        },
        staleTime: 30 * 1000,
    });

    return { data, loading: isLoading, error: error?.message, refetch };
};