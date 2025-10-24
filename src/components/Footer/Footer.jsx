import { Link } from "react-router-dom";
import { CUSTOM_ROUTES } from "../../constants/custom-routes";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer className={styles.footer_section}>
        <div className="container">
          <div className={styles.footer}>
            <div className={styles.menuLinks}>
              <h3>Menu Links</h3>
              <div className={styles.link}>
                <i class="ri-arrow-drop-right-line"></i>
                <Link to={CUSTOM_ROUTES.HOME}>Home</Link>
              </div>

              <div className={styles.link}>
                <i class="ri-arrow-drop-right-line"></i>
                <Link to={CUSTOM_ROUTES.FAQ}>FAQ</Link>
              </div>

              <div className={styles.link}>
                <i class="ri-arrow-drop-right-line"></i>
                <Link to={CUSTOM_ROUTES.CONTACTS}>Contacts</Link>
              </div>
            </div>

            <div className={styles.menuLinks}>
              <h3>Order Wizard</h3>
              <div className={styles.link}>
                <i class="ri-arrow-drop-right-line"></i>
                <p>Pay online</p>
              </div>

              <div className={styles.link}>
                <i class="ri-arrow-drop-right-line"></i>
                <p>Pay with cash on delivery</p>
              </div>
            </div>

            <div className={styles.menuLinks}>
              <h3>Contacts</h3>
              <div className={styles.addresslink}>
                <i class="ri-map-pin-line"></i>
                <p>Address: 1234 Street Name, City Name, North MK</p>
              </div>

              <div className={styles.addresslink}>
                <i class="ri-mail-line"></i>
                <p>Mail: info@yourdomain.com</p>
              </div>

              <div className={styles.addresslink}>
                <i class="ri-phone-line"></i>
                <p>Phone: +389/70 000 000</p>
              </div>
            </div>

            <div className={styles.menuLinks}>
              <h3>Find Us On</h3>
              <div className={styles.footerSocials}>
                <a href="https://www.facebook.com/" target="_blank">
                  <i class="ri-facebook-fill"></i>
                </a>
                <a href="https://x.com/" target="_blank">
                  <i class="ri-twitter-fill"></i>
                </a>

                <a href="https://www.instagram.com/?hl=en" target="_blank">
                  <i class="ri-instagram-line"></i>
                </a>

                <a href="https://www.pinterest.com/" target="_blank">
                  <i class="ri-pinterest-fill"></i>
                </a>
              </div>
            </div>
          </div>

          <span className={styles.footerLine}></span>

          <div className={styles.lowerFooter}>
            <div>
              <a href="#">
                With <i class="ri-heart-fill"></i> by AsDeveloped |
              </a>
              <a href="#">Terms and Conditions</a>
            </div>
            <p>© 2025 FoodBoard</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
