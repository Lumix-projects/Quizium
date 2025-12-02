import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { Divider } from "@/components/Divider";
import Button from "@/components/shared/Button";
import { Clock } from "lucide-react";
import OTPInput from "react-otp-input";
import useVerifyOTP from "../_hooks/useVerifyOTP";

export default function OtpInput({
  email,
  setEmail,
}: {
  email: string | null;
  setEmail: (email: string | null) => void;
}) {
  // Component Custom Hook
  const {
    isVerifying,
    isResending,
    formatTime,
    handleResendOTP,
    handleVerifyOTP,
    otp,
    setOtp,
    expiry,
    countdown,
    handleChangeEmail,
  } = useVerifyOTP({ email, setEmail });

  return (
    <Card>
      <CardHeader className="py-5 space-y-3">
        <h1 className="text-2xl font-bold text-primary">Check Your Email</h1>
        <p className="text-sm text-muted">
          We&apos;ve sent a 6-digit code to{" "}
          <button
            className="font-bold text-primary underline cursor-pointer"
            onClick={handleChangeEmail}
          >
            {email}
          </button>
        </p>
      </CardHeader>

      <CardContent className="space-y-5 py-6 flex flex-col items-center">
        {/* 6-digit OTP input */}
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="tel"
          renderSeparator={<span className="w-3" />}
          renderInput={(props) => (
            <input
              {...props}
              className="
                w-12!
                text-center 
                aspect-square!
                border-2 border-primary/40 
                rounded-xl 
                focus:outline-none focus:border-primary
                text-xl font-bold
                transition-all duration-200
                bg-background
                shadow-sm
                hover:border-primary/60
              "
            />
          )}
          containerStyle="flex justify-center"
        />

        {/* Expiry label */}
        <p className="text-primary text-sm font-medium bg-muted/10 px-5 py-1 rounded-full inline-flex items-center gap-2">
          <Clock size={16} /> Code expires in {formatTime(expiry)}
        </p>
      </CardContent>

      <CardFooter className="text-center py-3 px-5">
        {/* Verify OTP */}
        <Button
          onClick={handleVerifyOTP}
          disabled={isVerifying || otp.length !== 6}
        >
          {isVerifying ? "Verifying..." : "Verify Code"}
        </Button>

        <Divider>Didn&apos;t receive Code ?</Divider>

        {/* Resend OTP button */}
        <Button
          variant="outline"
          onClick={handleResendOTP}
          disabled={countdown > 0 || isResending}
        >
          {isResending
            ? "Resending..."
            : countdown > 0
            ? `Resend Code in ${formatTime(countdown)}`
            : "Resend Code"}
        </Button>
      </CardFooter>
    </Card>
  );
}
