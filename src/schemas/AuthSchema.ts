import { z } from "zod";

// Register Schema
export const registerSchema = z
  .object({
    name: z.string().min(2, "First name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^01[0-9]{9}$/, "Invalid Egyptian phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

// Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
