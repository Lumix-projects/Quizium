import { SignUpData } from "@/types/auth";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export async function registerUser(values: Omit<SignUpData, 'rePassword' | 'phone'>) {
    try {
        const response = await api.post("/auth/register", values);

        toast.success(`Welcome ${response.data.user.name}`);
        return response.data;

    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Something went wrong";
        throw new Error(message);
    }

}
