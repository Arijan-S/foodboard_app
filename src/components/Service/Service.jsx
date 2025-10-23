import styles from "./Service.module.css";
import Card from "../Card/Card";
import CardIcon from "../../assets/images/icons/card.png";
import WalletIcon from "../../assets//images/icons/wallet.png";

const Service = () => {
  return (
    <>
      <div className={styles.service_section}>
        <div className="container">
          <div className={styles.service}>
            <div className={styles.line}>
              <span className={styles.orangeLine}></span>
              <span className={styles.grayLine}></span>
            </div>

            <h3>Order Food</h3>
            <p>Choosing one of the payment methods</p>

            <div className={styles.cards}>
              <Card
                icon={CardIcon}
                title="Pay Online"
                description="and wait for delivert"
              />
              <Card
                icon={WalletIcon}
                title="Pay with cash"
                description="when food is arrived"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Service;
