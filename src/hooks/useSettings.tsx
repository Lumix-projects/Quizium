"use client";

import { useState } from 'react';
import { changePassword, deleteAccount } from '@/services/user';
import toast from 'react-hot-toast';

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updatePassword = async (data: { currentPassword: string; newPassword: string }) => {
        setLoading(true);
        setError(null);
        try {
            await changePassword(data);
            toast.success("Password changed successfully");
        } catch (err: any) {
            const message = err.message || "Failed to change password";
            setError(message);
            toast.error(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updatePassword, loading, error };
};

export const useDeleteAccount = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const removeAccount = async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteAccount();
            toast.success("Account deleted");
        } catch (err: any) {
            const message = err.message || "Failed to delete account";
            setError(message);
            toast.error(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { removeAccount, loading, error };
};
