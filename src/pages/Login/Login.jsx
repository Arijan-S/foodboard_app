import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CUSTOM_ROUTES } from "../../constants/custom-routes";
import "./Login.css";
import { login } from "../../services/authServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailHasError, setEmailHasError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [passwordHasError, setPasswordHasError] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [authEmailError, setAuthEmailError] = useState(false);
  const [authPasswordError, setAuthPasswordError] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Mark fields as touched to show validation errors
    if (email.trim().length === 0) setEmailTouched(true);
    if (password.trim().length === 0) setPasswordTouched(true);

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    try {
      console.log("🚀 Starting email/password login...");
      await login(email, password);
      console.log("✅ Login successful, navigating to create menus...");
      resetStates();
      navigate(CUSTOM_ROUTES.CREATE_MENUS);
    } catch (error) {
      console.error("❌ Login error in Login component:", error);

      // More comprehensive error handling
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/invalid-email":
        case "auth/invalid-credential":
          setAuthEmailError(true);
          setAuthPasswordError(true);
          break;
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setAuthEmailError(true);
          setAuthPasswordError(true);
          break;
        case "auth/too-many-requests":
        case "auth/network-request-failed":
        case "auth/operation-not-allowed":
        case "auth/user-disabled":
          setAuthEmailError(true);
          setAuthPasswordError(true);
          break;
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

    // Don't reset states on auth error - keep form filled
  };

  useEffect(() => {
    if ((email.trim().length === 0 || !email.includes("@")) && emailTouched) {
      setEmailHasError(true);
    } else {
      setEmailHasError(false);
    }

    if (password.trim().length === 0 && passwordTouched) {
      setPasswordHasError(true);
    } else {
      setPasswordHasError(false);
    }

    const formIsValid =
      email.trim() !== "" && email.includes("@") && password.trim() !== "";

    setIsValid(formIsValid);
  }, [
    email,
    password,
    emailTouched,
    passwordTouched,
    emailHasError,
    passwordHasError,
  ]);

  const resetStates = () => {
    setEmail("");
    setPassword("");

    setEmailTouched(false);
    setPasswordTouched(false);

    setEmailHasError(false);
    setPasswordHasError(false);
  };

  return (
    <>
      <div className="login_header">
        <div className="container">
          <h1>Login</h1>
        </div>
      </div>

      <div className="container">
        <form onSubmit={handleLogin} className="form_container">
          <div className="control_group">
            <h2>Login in to your restaurant</h2>

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
                  setAuthPasswordError(false);
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
                    setAuthEmailError(false);
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

              <div className="login_cta">
                <button disabled={!isValid}>Login</button>

                <Link to={CUSTOM_ROUTES.REGISTER}>
                  Don't have an account? Register
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
