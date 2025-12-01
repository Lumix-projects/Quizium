/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  changePassword,
  deleteAccount,
  deleteProfileImage,
} from "@/services/user";
import toast from "react-hot-toast";
import { useUser, useUpdateProfile, useUploadAvatar } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
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

export const useSettingsPage = () => {
  const router = useRouter();
  const { user, loading: userLoading, setUser } = useUser();
  const { updateProfile, loading: updatingProfile } = useUpdateProfile();
  const { uploadAvatar, loading: uploadingImage } = useUploadAvatar();
  const { updatePassword, loading: changingPassword } = useChangePassword();
  const { removeAccount, loading: deletingAccount } = useDeleteAccount();

  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [removingImage, setRemovingImage] = useState(false);

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
    } catch (error) {}
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePassword(passwordData);
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {}
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    try {
      const imageUrl = await uploadAvatar(file);
      setUser((prev) => (prev ? { ...prev, profileImage: imageUrl } : null));
    } catch (error) {}
  };

  const handleDeleteAccount = async () => {
    try {
      await removeAccount();
      cookies.remove("token");
      router.push("/register");
    } catch (error) {}
  };

  const handleRemoveProfileImage = async () => {
    if (uploadingImage || removingImage) return;

    setRemovingImage(true);
    try {
      const updatedUser = await deleteProfileImage();
      setUser(updatedUser);
      toast.success("Profile image removed successfully");
    } catch (error) {
      toast.error("Failed to remove profile image");
    } finally {
      setRemovingImage(false);
    }
  };

  return {
    user,
    userLoading,
    updatingProfile,
    uploadingImage,
    changingPassword,
    deletingAccount,
    profileData,
    removingImage,
    setProfileData,
    passwordData,
    setPasswordData,
    handleRemoveProfileImage,
    handleProfileUpdate,
    handlePasswordChange,
    handleImageUpload,
    handleDeleteAccount,
  };
};
