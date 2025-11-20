import { SignUpData } from "@/types/auth";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export async function registerlogic(values: Omit<SignUpData, 'rePassword' | 'phone'>) {
    try {
        const response = await api.post("/auth/register", values);

        toast.success(`Welcome ${response.data.user.name}`);
        return response.data;

    } catch (error: any) {
        if (error.code === "ERR_NETWORK") {
            throw new Error("Network error: Please check your internet or API server.");
        }

        if (error.code === "ECONNABORTED") {
            throw new Error("Request timed out. Please try again.");
        }

        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }

}
