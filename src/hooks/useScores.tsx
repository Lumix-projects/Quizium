"use client";

import { useState, useEffect, useCallback } from 'react';
import { getUserScores } from '@/services/user';
import { Score } from '@/types';

export const useScores = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchScores = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const scoresData = await getUserScores();
            setScores(scoresData);
        } catch (err: any) {
            const message = err.message || "Failed to fetch scores";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchScores();
    }, [fetchScores]);

    return { scores, loading, error, refetch: fetchScores };
};
