import { useQuery } from '@tanstack/react-query';
import { fetchStatsData } from '../../services/activityService';
import { formatDuration, formatPace, formatDate, formatTime } from '../../utils/formatters';

export const useActivityStats = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['activityStats', month, year],

        queryFn: async () => {
            const rawData = await fetchStatsData(month, year);

            if (rawData.cards && rawData.cards.weeklyGoal && rawData.cards.weeklyGoal.endDate) {
                const goal = rawData.cards.weeklyGoal;
                const datePart = goal.endDate.includes('T') ? goal.endDate.split('T')[0] : goal.endDate.split(' ')[0];
                const [yearG, monthG, dayG] = datePart.split('-');
                const endDateLocal = new Date(yearG, monthG - 1, dayG, 23, 59, 59);
                const now = new Date();

                if (now > endDateLocal) {
                    rawData.cards.weeklyGoal = {
                        ...rawData.cards.weeklyGoal,
                        current: 0,
                        target: 100,
                        status: 'Expired',
                        unit: 'km'
                    };
                }
            }

            return {
                ...rawData,
                summary: {
                    ...rawData.summary,
                    totalTimeDisplay: formatDuration(rawData.summary.totalTime),
                },
                recentRuns: rawData.recentRuns.map(run => ({
                    ...run,
                    id: typeof run.id === 'string' ? Number(run.id.replace('run-', '')) : run.id,
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