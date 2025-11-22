"use client";
import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
}

export default function InputField<T extends FieldValues>({
  label,
  type = "text",
  placeholder,
  register,
  name,
  error,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type based on password toggle
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <label className="block text-sm font-medium text-text-heading mb-1">
        {label}
      </label>

      <div className="relative">
        <input
          type={inputType}
          {...register(name)}
          className="input w-full pr-10"
          placeholder={placeholder}
        />

        {/* Password toggle button */}
        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} className="cursor-pointer" />
            ) : (
              <Eye size={20} className="cursor-pointer" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs px-3 py-2 border border-border rounded-lg mt-2">
          {error.message as string}
        </p>
      )}
    </div>
  );
}
