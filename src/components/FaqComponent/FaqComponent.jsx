import Image2 from "../../assets/images/images/image-2.jpeg";
import styles from "./FaqComponent.module.css";

const FaqComponent = () => {
  return (
    <>
      <div className="container">
        <div className={styles.faq_section}>
          <p>FOODBOARD DELIVERY</p>
          <h3>FoodBoard</h3>
          <h4>Food order wizard with online payment</h4>
          <button>FAQ</button>
        </div>
      </div>
    </>
  );
};

export default FaqComponent;
