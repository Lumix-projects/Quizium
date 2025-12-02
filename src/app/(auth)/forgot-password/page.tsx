"use client";

import { useState } from "react";
import { Wizard } from "react-use-wizard";
import EnterYourEmail from "../_components/EnterYourEmail";
import OtpInput from "../_components/OtpInput";
import NewPassword from "../_components/NewPassword";

// Parent: manages wizard steps + email state
export default function ForgotPassword() {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <Wizard>
      {/* Step 1: Email input */}
      <EnterYourEmail email={email} setEmail={setEmail} />

      {/* Step 2: OTP verification */}
      <OtpInput email={email} setEmail={setEmail} />

      {/* Step : Update Password */}
      <NewPassword email={email} />
    </Wizard>
  );
}
