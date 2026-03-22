import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWeeklyGoal, createWeeklyGoal } from '../../services/weeklygoal';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Alert } from 'react-native';

export const useWeeklyGoal = () => {
    const { logout } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['weeklyGoal'],
        queryFn: async () => {
            try {
                const response = await fetchWeeklyGoal();

                if (!response.hasGoal || !response.data) {
                    return { hasGoal: false };
                }

                const goal = response.data;

                const datePart = goal.endDate.includes('T') ? goal.endDate.split('T')[0] : goal.endDate.split(' ')[0];
                const [year, month, day] = datePart.split('-');
                const endDateLocal = new Date(year, month - 1, day, 23, 59, 59);
                const now = new Date();

                if (now > endDateLocal) {
                    return { hasGoal: false };
                }

                return {
                    id: goal.id,
                    current: goal.currentKm || 0,
                    target: goal.targetKm || 0,
                    unit: 'km',
                    startDate: goal.startDate,
                    endDate: goal.endDate,
                    isCompleted: goal.status === 'COMPLETED' || (goal.currentKm >= goal.targetKm),
                    status: goal.status,
                    hasGoal: true,
                    duration: goal.duration || 0,
                    avgPace: goal.avgPace || 0,
                    burn: goal.burn || 0,
                    graphData: goal.graphData || []
                };
            } catch (err) {
                if (err.message === "Unauthorized") {
                    logout();
                }
                throw err;
            }
        },
        staleTime: 60 * 1000,
    });

    const mutation = useMutation({
        mutationFn: createWeeklyGoal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weeklyGoal'] });
            queryClient.invalidateQueries({ queryKey: ['homeData'] });
            Alert.alert("Success", "Weekly goal created successfully!");
        },
        onError: (err) => {
            if (err.message === "Unauthorized") {
                logout();
            } else {
                Alert.alert("Error", err.message || "Failed to create goal");
            }
        }
    });

    const createGoal = (targetKm) => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 7);

        if (targetKm <= 0) {
            Alert.alert("Invalid Goal", "Target distance must be greater than 0");
            return;
        }

        mutation.mutate(targetKm);
    };

    return {
        data,
        loading: isLoading,
        error: error ? error.message : null,
        refetch,
        createGoal,
        isCreating: mutation.isPending
    };
};
