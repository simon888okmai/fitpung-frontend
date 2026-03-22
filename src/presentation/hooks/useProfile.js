import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProfile, updateProfile } from '../../services/profile';
import { Alert } from 'react-native';

export const useProfile = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['userProfile'],
        queryFn: fetchProfile,
        staleTime: 60 * 1000,
    });

    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
        onError: (err) => {
            Alert.alert("Error", err.message || "Failed to update profile");
        }
    });

    return {
        profile: data,
        loading: isLoading,
        error: error ? error.message : null,
        refetch,
        updateData: mutation.mutate,
        isUpdating: mutation.isPending
    };
};
