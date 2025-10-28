import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CUSTOM_ROUTES } from "../../constants/custom-routes";
import { register } from "../../services/authServices";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [authEmailError, setAuthEmailError] = useState(false);
  const [authPasswordError, setAuthPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    // Mark fields as touched to show validation errors
    if (username.trim().length === 0) setUsernameTouched(true);
    if (!email.includes("@")) setEmailTouched(true);
    if (password.length < 8) setPasswordTouched(true);
    if (confirmPassword !== password) setConfirmPasswordTouched(true);

    if (
      username.trim().length === 0 ||
      !email.includes("@") ||
      password.length < 8 ||
      confirmPassword !== password
    ) {
      return;
    }

    try {
      console.log("🚀 Starting user registration...");
      await register(email, password);
      console.log("✅ Registration successful!");
      alert("Registration successful! You can now login.");
      navigate(CUSTOM_ROUTES.LOGIN);
    } catch (error) {
      console.error("❌ Registration error in Register component:", error);

      // More comprehensive error handling
      switch (error.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setAuthEmailError(true);
          break;
        case "auth/weak-password":
          setAuthPasswordError(true);
          break;
        case "auth/operation-not-allowed":
        case "auth/network-request-failed":
        default:
          setAuthEmailError(true);
          setAuthPasswordError(true);
      }

      console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack,
      });
    }
  };

  const usernameHasError = usernameTouched && username.trim() === "";
  const emailHasError = emailTouched && !email.includes("@");
  const passwordHasError = passwordTouched && password.length < 8;
  const confirmPasswordHasError =
    confirmPasswordTouched && confirmPassword !== password;

  const isValid =
    username &&
    email.includes("@") &&
    password.length >= 8 &&
    confirmPassword === password;

  return (
    <>
      <div className="register_header">
        <div className="container">
          <h1>Register</h1>
        </div>
      </div>

      <div className="container">
        <form onSubmit={handleRegister} className="form_container">
          <div className="control-group">
            <h2>Create your restaurant account</h2>

            <div className="form_control">
              <div className="input_error">
                {usernameHasError && <p className="error_dot">*</p>}
                <label htmlFor="username">Restaurant name</label>
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setUsernameTouched(true)}
              />
            </div>

            <div className="form_control">
              <div className="input_error">
                {(emailHasError || authEmailError) && (
                  <p className="error_dot">*</p>
                )}
                <label htmlFor="email">Email</label>
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAuthEmailError(false);
                }}
                onBlur={() => setEmailTouched(true)}
                className={authEmailError ? "input_error_red" : ""}
              />
            </div>

            <div className="form_control">
              <div className="input_error">
                {(passwordHasError || authPasswordError) && (
                  <p className="error_dot">*</p>
                )}
                <label htmlFor="password">Password</label>
              </div>
              <div className="password_input_container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  minLength="8"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthPasswordError(false);
                  }}
                  onBlur={() => setPasswordTouched(true)}
                  className={authPasswordError ? "input_error_red" : ""}
                />
                <button
                  type="button"
                  className="password_toggle_btn"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form_control">
              <div className="input_error">
                {confirmPasswordHasError && <p className="error_dot">*</p>}
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              <div className="password_input_container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  minLength="8"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setConfirmPasswordTouched(true)}
                />
                <button
                  type="button"
                  className="password_toggle_btn"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="login_cta">
                <button disabled={!isValid}>Register</button>

                <Link to={CUSTOM_ROUTES.LOGIN}>
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
