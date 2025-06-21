import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import axios from "axios";
import { showError, showSuccess } from "../utils/toast";

export default function OtpVerify({ phoneNo, handleOtpSuccess }) {
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { phoneNo, otp }
      );
      if (res.data.newUser) {
        handleOtpSuccess("signup", phoneNo);
      } else {
        localStorage.setItem("token", res.data.token);
        handleOtpSuccess("chat");
      }
    } catch (err) {
      showError("Failed to send OTP");
    }
  };

  // resend otp logic
  const timerValue = 10;
  const [resendTimer, setResendTimer] = useState(timerValue);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResend = async () => {
    // e.preventDefault();
    setIsResending(true);
    setOtp("");
    try {
      await axios.post("/api/auth/send-otp", { phoneNo });
      showSuccess("OTP resent successfully");
      setResendTimer(timerValue);
    } catch (err) {
      showError("Failed to resend OTP");
    }
    setIsResending(false);
  };

  return (
    <div>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputType="tel"
        renderSeparator={<span>&nbsp;</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          width: "2rem",
          height: "2rem",
          margin: "0 0.25rem",
          fontSize: "1.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button onClick={handleVerify}>Verify</button>

      <div style={{ marginTop: "1rem" }}>
        {resendTimer > 0 ? (
          <p>Resend OTP in {resendTimer}s</p>
        ) : (
          <button onClick={handleResend} disabled={isResending}>
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </div>
    </div>
  );
}
