"use client";

import { useState, useEffect, useCallback } from 'react';
import { getUserProfile, updateUserProfile, uploadProfileImage } from '@/services/user';
import { User } from '@/types';
import toast from 'react-hot-toast';

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const userData = await getUserProfile();
            setUser(userData);
        } catch (err: any) {
            const message = err.message || "Failed to fetch user profile";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, loading, error, refetch: fetchUser, setUser };
};

export const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (data: { name?: string; email?: string }) => {
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await updateUserProfile(data);
            toast.success("Profile updated successfully");
            return updatedUser;
        } catch (err: any) {
            const message = err.message || "Failed to update profile";
            setError(message);
            toast.error(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateProfile, loading, error };
};

export const useUploadAvatar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadAvatar = async (file: File) => {
        setLoading(true);
        setError(null);
        try {
            const imageUrl = await uploadProfileImage(file);
            toast.success("Profile image updated");
            return imageUrl;
        } catch (err: any) {
            const message = err.message || "Failed to upload image";
            setError(message);
            toast.error(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { uploadAvatar, loading, error };
};
