import api from "@/lib/axios";
import { User, Score } from "@/types";
import cookies from "js-cookie";

export const getUserProfile = async (): Promise<User> => {
    try {
        const response = await api.get<{ user: User }>("/user/profile", {
            headers: { Authorization: `Bearer ${cookies.get("token")}` },
        });
        return response.data.user;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

export const updateUserProfile = async (data: { name?: string; email?: string }): Promise<User> => {
    try {
        const response = await api.put<{ user: User }>("/user/profile", data, {
            headers: { Authorization: `Bearer ${cookies.get("token")}` },
        });
        return response.data.user;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

export const uploadProfileImage = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("profileImage", file);

        const response = await api.post<{ profileImage: string }>("/user/profile/image", formData, {
            headers: {
                Authorization: `Bearer ${cookies.get("token")}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.profileImage;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

export const changePassword = async (data: { currentPassword: string; newPassword: string }): Promise<void> => {
    try {
        await api.put("/user/change-password", data, {
            headers: { Authorization: `Bearer ${cookies.get("token")}` },
        });
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

export const deleteAccount = async (): Promise<void> => {
    try {
        await api.delete("/user/account", {
            headers: { Authorization: `Bearer ${cookies.get("token")}` },
        });
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};

export const getUserScores = async (): Promise<Score[]> => {
    try {
        const response = await api.get<{ scores: Score[] }>("/scores/my-scores", {
            headers: { Authorization: `Bearer ${cookies.get("token")}` },
        });
        return response.data.scores;
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }
};
