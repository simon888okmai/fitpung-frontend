import { useQuery } from '@tanstack/react-query';
import { fetchActivityDetails } from '../../services/activityService';

export const useActivityDetail = (runId) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['activityDetail', runId],
        queryFn: () => fetchActivityDetails(runId),
        enabled: !!runId, // Only fetch if runId exists
        staleTime: 5 * 60 * 1000, // Conceptually immutable, caching for 5 mins
    });

    return {
        detailData: data,
        loading: isLoading,
        error: error ? error.message : null,
        refetch
    };
};
