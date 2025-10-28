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

  const [isValid, setIsValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (email.trim().length === 0 || password.trim().length === 0) {
      alert("Please fill in the inputs!");
      return;
    }

    try {
      console.log("🚀 Starting email/password login...");
      await login(email, password);
      console.log("✅ Login successful, navigating to create menus...");
      navigate(CUSTOM_ROUTES.CREATE_MENUS);
    } catch (error) {
      console.error("❌ Login error in Login component:", error);
      let errorMessage = "Login failed. Please try again.";

      // More comprehensive error handling
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "Email/password authentication is not enabled. Please contact support.";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Network error. Please check your internet connection and try again.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password.";
          break;
        case "auth/user-disabled":
          errorMessage =
            "This account has been disabled. Please contact support.";
          break;
        default:
          errorMessage = `Login failed: ${error.message}. Please try again.`;
      }

      console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack,
      });

      alert(errorMessage);
    }

    resetStates();
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
                {emailHasError && <p className="error_dot">*</p>}
                <label htmlFor="email">Email</label>
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
              />
            </div>

            <div className="form_control">
              <div className="input_error">
                {passwordHasError && <p className="error_dot">*</p>}
                <label htmlFor="password">Password</label>
              </div>
              <div className="password_input_container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  minLength="8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
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
