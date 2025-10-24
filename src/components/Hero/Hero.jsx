import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import { useAuth } from "../../stores/authContext";
import { CUSTOM_ROUTES } from "../../constants/custom-routes";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className={styles.hero_section}>
        <div className="container">
          <div className={styles.hero}>
            <h1>FOODBOARD</h1>
            <h3>
              Order from your favorite restaurants in minutes. <br />
              Browse menus, customize your meal, and pay securely all in one
              place.
            </h3>
            <Link
              to={
                isAuthenticated
                  ? CUSTOM_ROUTES.CREATE_MENUS
                  : CUSTOM_ROUTES.LOGIN
              }
            >
              <button>Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
