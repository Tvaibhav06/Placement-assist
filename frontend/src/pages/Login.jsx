import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import bgImg from "../assets/login.png"; // 👈 apni background image ka path

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // toggle login/register
  const [step, setStep] = useState(1); // step 1=email, step 2=otp
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Send OTP API
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@lnmiit.ac.in")) {
      setAlert("⚠️ Only LNMIIT email addresses are allowed!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:800/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setAlert("✅ OTP sent successfully to " + email);
        setStep(2); // move to OTP screen
      } else {
        setAlert("❌ " + data.message);
      }
    } catch (err) {
      setLoading(false);
      setAlert("⚠️ Server error while sending OTP");
    }
  };

  // Verify OTP API
  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setAlert("⚠️ Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:800/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setAlert("🎉 OTP verified! You are logged in.");
        setTimeout(() => {
          navigate("/dashboard"); // 👈 redirect here
        }, 1000);
      } else {
        setAlert("❌ " + data.message);
      }
    } catch (err) {
      setLoading(false);
      setAlert("⚠️ Server error while verifying OTP");
    }
  };

  // Handle OTP box input
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Styles
  const containerStyle = {
    height: "100vh",
    width: "100vw",
    position: "relative",
    fontFamily: "Arial, sans-serif",
  };

  const bgStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(6px)",
    zIndex: -1,
  };

  const cardStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "rgba(255,255,255,0.9)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0B4A63",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const otpBoxStyle = {
    width: "40px",
    height: "40px",
    margin: "0 5px",
    textAlign: "center",
    fontSize: "18px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  return (
    <div style={containerStyle}>
      <div style={bgStyle}></div>

      <div style={cardStyle}>
        {step === 1 ? (
          <>
            <h2>{isLogin ? "Welcome to CampusConnect!" : "Create your Account"}</h2>
            <p>{isLogin ? "Login with your email via OTP" : "Register using your email"}</p>

            <form onSubmit={handleSendOTP}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                  required
                />
              )}

              <input
                type="email"
                placeholder="Enter your college email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />

              <button type="submit" style={buttonStyle} disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>Enter OTP</h2>
            <p>We have sent a 6-digit OTP to {email}</p>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  style={otpBoxStyle}
                />
              ))}
            </div>

            <button onClick={handleVerifyOTP} style={buttonStyle} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p style={{ marginTop: "15px", fontSize: "14px" }}>
              Didn’t get OTP?{" "}
              <span
                style={{ color: "#0B4A63", cursor: "pointer", textDecoration: "underline" }}
                onClick={handleSendOTP}
              >
                Resend OTP
              </span>
            </p>
          </>
        )}

        {alert && (
          <p style={{ marginTop: "15px", color: alert.startsWith("✅") || alert.startsWith("🎉") ? "green" : "red" }}>
            {alert}
          </p>
        )}

        {step === 1 && (
          <p style={{ marginTop: "20px", fontSize: "14px", color: "#444" }}>
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span style={{ color: "#0B4A63", cursor: "pointer", textDecoration: "underline" }} onClick={() => setIsLogin(false)}>
                  Register now
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span style={{ color: "#0B4A63", cursor: "pointer", textDecoration: "underline" }} onClick={() => setIsLogin(true)}>
                  Login
                </span>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
