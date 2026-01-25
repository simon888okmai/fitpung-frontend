// src/hooks/useBadges.js
import { useQuery } from '@tanstack/react-query';
import { fetchBadges } from '../../services/badge';

export const useBadges = () => {
    return useQuery({
        queryKey: ['badges'], // Key สำหรับเก็บ Cache
        queryFn: fetchBadges,
        staleTime: 5 * 60 * 1000, // 5 นาที (เหรียญไม่ต้องอัปเดตถี่มากก็ได้)
    });
};