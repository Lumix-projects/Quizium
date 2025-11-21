"use client";


import DashboardCard from '@/components/shared/dashboard/DashboardCard'
import React, { useEffect, useState } from 'react'
import { useUser, useUpdateProfile, useUploadAvatar } from '@/hooks/useUser'
import { useChangePassword, useDeleteAccount } from '@/hooks/useSettings'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import cookies from 'js-cookie'

export default function page() {
    const router = useRouter();
    const { user, loading: userLoading, setUser } = useUser();
    const { updateProfile, loading: updatingProfile } = useUpdateProfile();
    const { uploadAvatar, loading: uploadingImage } = useUploadAvatar();
    const { updatePassword, loading: changingPassword } = useChangePassword();
    const { removeAccount, loading: deletingAccount } = useDeleteAccount();

    // Form States
    const [profileData, setProfileData] = useState({ name: '', email: '' });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });

    useEffect(() => {
        if (user) {
            setProfileData({ name: user.name, email: user.email });
        }
    }, [user]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedUser = await updateProfile(profileData);
            setUser(updatedUser);
        } catch (error) {
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updatePassword(passwordData);
            setPasswordData({ currentPassword: '', newPassword: '' });
        } catch (error) {
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        try {
            const imageUrl = await uploadAvatar(file);
            setUser(prev => prev ? { ...prev, profileImage: imageUrl } : null);
        } catch (error) {
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) return;

        try {
            await removeAccount();
            cookies.remove('token');
            router.push('/register');
        } catch (error) {
        }
    };

    if (userLoading) {
        return <div className="flex items-center justify-center min-h-[60vh] text-slate-500">Loading settings...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Information */}
                <DashboardCard title="Profile Information">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                            {user?.profileImage ? (
                                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-2xl font-bold">
                                    {user?.name?.charAt(0)}
                                </div>
                            )}
                            {uploadingImage && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700 transition-colors">
                                Change Photo
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                            </label>
                            <p className="text-xs text-slate-500 mt-1">Max 5MB. JPG, PNG, GIF.</p>
                        </div>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            />
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors">Save Changes</button>
                        </div>
                    </form>
                </DashboardCard>

                <div className="space-y-6">
                    {/* Change Password */}
                    <DashboardCard title="Change Password">
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Current Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">New Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                />
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors">Update Password</button>
                            </div>
                        </form>
                    </DashboardCard>

                    {/* Danger Zone */}
                    <DashboardCard title="Danger Zone" className="border-red-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-800">Delete Account</h4>
                                <p className="text-xs text-slate-500">Permanently delete your account and all data</p>
                            </div>
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                            >
                                Delete Account
                            </button>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    )
}
