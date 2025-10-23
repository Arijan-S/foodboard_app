import { useNavigate } from "react-router-dom";
import { CUSTOM_ROUTES } from "../../constants/custom-routes";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate(CUSTOM_ROUTES.HOME);
  };

  return (
    <div className={styles.notFound_container}>
      <div className="containers">
        <h1 className={styles.header}>This Page Does Not Exist!</h1>
        <button onClick={backToHome}>Back to home</button>
      </div>
    </div>
  );
};

export default NotFound;
