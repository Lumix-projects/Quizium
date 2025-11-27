"use client";
import DashboardCard from "@/components/shared/dashboard/DashboardCard";
import { Skeleton } from "@/components/shared/Skeleton";
import { useSettingsPage } from "@/hooks/useSettings";

export default function SettingsPage() {
  const {
    user,
    userLoading,
    uploadingImage,
    profileData,
    setProfileData,
    passwordData,
    setPasswordData,
    handleProfileUpdate,
    handlePasswordChange,
    handleImageUpload,
    handleDeleteAccount,
  } = useSettingsPage();

  if (userLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Skeleton */}
          <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="p-6 pt-0 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <Skeleton className="h-10 w-32 rounded-lg mt-4" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Password Skeleton */}
            <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <Skeleton className="h-10 w-40 rounded-lg mt-4" />
              </div>
            </div>

            {/* Danger Zone Skeleton */}
            <div className="rounded-xl border border-red-100 bg-card text-card-foreground shadow-sm">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="p-6 pt-0 flex justify-between items-center">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-9 w-32 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
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
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                />
              </label>
              <p className="text-xs text-slate-500 mt-1">
                Max 5MB. JPG, PNG, GIF.
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DashboardCard>

        <div className="space-y-6">
          {/* Change Password */}
          <DashboardCard title="Change Password">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-colors"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </DashboardCard>

          {/* Danger Zone */}
          <DashboardCard title="Danger Zone" className="border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-800">Delete Account</h4>
                <p className="text-xs text-slate-500">
                  Permanently delete your account and all data
                </p>
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
  );
}
