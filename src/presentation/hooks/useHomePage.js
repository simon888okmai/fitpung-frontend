import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../../services/home';
import { formatDuration, formatPace, formatDate } from '../../utils/formatters';

export const useHomeData = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['homeData'],
        queryFn: async () => {
            const rawData = await fetchHomeData();

            if (rawData.weeklyGoal) {
                if (rawData.weeklyGoal && rawData.weeklyGoal.endDate) {
                    const datePart = rawData.weeklyGoal.endDate.includes('T') ? rawData.weeklyGoal.endDate.split('T')[0] : rawData.weeklyGoal.endDate.split(' ')[0];
                    const [year, month, day] = datePart.split('-');
                    const endDateLocal = new Date(year, month - 1, day, 23, 59, 59);
                    const now = new Date();

                    if (now > endDateLocal) {
                        rawData.weeklyGoal = null;
                    }
                }

                if (rawData.weeklyGoal) {
                    rawData.weeklyGoal = {
                        ...rawData.weeklyGoal,
                        current: rawData.weeklyGoal.currentKm || rawData.weeklyGoal.current || 0,
                        target: rawData.weeklyGoal.targetKm || rawData.weeklyGoal.target || 0,
                        unit: 'km'
                    };
                }
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