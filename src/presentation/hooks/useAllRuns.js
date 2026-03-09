import { useQuery } from '@tanstack/react-query';
import { fetchAllRuns } from '../../services/activity';
import { formatDuration, formatPace, formatDate, formatTime } from '../../utils/formatters';

export const useAllRuns = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['allRuns'],
        queryFn: async () => {
            const rawData = await fetchAllRuns();

            if (!rawData) return [];

            return rawData.map(run => ({
                ...run,
                date: formatDate(run.startTime || run.timestamp || run.date),
                time: formatTime(run.startTime || run.timestamp || run.date),
                duration: formatDuration(run.duration),
                pace: formatPace(run.pace),
                kcal: run.calories || 0
            }));
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
