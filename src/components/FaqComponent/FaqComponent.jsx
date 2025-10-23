import { Link } from "react-router-dom";
import Image2 from "../../assets/images/images/image-2.jpeg";
import styles from "./FaqComponent.module.css";
import { CUSTOM_ROUTES } from "../../constants/custom-routes";

const FaqComponent = () => {
  return (
    <>
      <div className="container">
        <div className={styles.faq_section}>
          <p>FOODBOARD DELIVERY</p>
          <h3>FoodBoard</h3>
          <h4>Food order wizard with online payment</h4>
          <Link to={CUSTOM_ROUTES.FAQ}>
            <button>FAQ</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FaqComponent;
