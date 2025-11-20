import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";

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
  return (
    <div>
      <label className="block text-sm font-medium text-text-heading mb-1">
        {label}
      </label>

      <input
        type={type}
        {...register(name)}
        className="input w-full"
        placeholder={placeholder}
      />

      {error && (
        <p className="text-red-500 text-xs px-3 py-2 border border-border rounded-lg mt-2">
          {error.message as string}
        </p>
      )}
    </div>
  );
}
