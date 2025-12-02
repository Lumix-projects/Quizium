import { Card, CardContent, CardHeader } from "@/components/Card";
import InputField from "@/components/InputField";
import Button from "@/components/shared/Button";
import useNewPassword from "../_hooks/useNewPassword";
import AuthHeader from "./AuthHeader";

export default function NewPassword({ email }: { email: string | null }) {
  // Component Custom Hook
  const { register, handleSubmit, isSubmitting, errors, onSubmit } =
    useNewPassword({ email });

  return (
    <Card>
      {/* Create New Password Header */}
      <CardHeader>
        <AuthHeader
          title="Create New Password"
          desc="Enter your new password below."
        />
      </CardHeader>

      <CardContent>
        {/* Password form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* New Password Field */}
          <InputField
            label="Enter your new password"
            name="newPassword"
            register={register}
            error={errors.newPassword}
            placeholder="Enter your new password"
            type="password"
          />

          {/* Confirm Password Field */}
          <InputField
            label="Confirm your password"
            name="rePassword"
            register={register}
            error={errors.rePassword}
            placeholder="Confirm your password"
            type="password"
          />

          {/* Submit button */}
          <Button type="submit" disabled={isSubmitting} className="mt-3">
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
