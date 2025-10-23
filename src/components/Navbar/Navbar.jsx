import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CUSTOM_ROUTES } from "../../constants/custom-routes";
import { useAuth } from "../../stores/authContext";
import { useCart } from "../../stores/cartContext.jsx";
import { logout } from "../../services/authServices";
import logo from "../../assets/images/logo.svg";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(CUSTOM_ROUTES.LOGIN);
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const cartItemCount = getTotalItems();

  return (
    <>
      <div className={styles.navbar_section}>
        <div className="container">
          <div className={styles.navbar}>
            <img src={logo} className={styles.logo} alt="logo" />

            <div className={styles.nav_menu}>
              {/* Desktop Navigation Menu - Hidden on mobile */}
              <ul className={styles.desktop_menu}>
                <li>
                  <Link to={CUSTOM_ROUTES.HOME}>Home</Link>
                </li>
                <li>
                  <Link to={CUSTOM_ROUTES.ORDER}>Order</Link>
                </li>
                <li>
                  <Link to={CUSTOM_ROUTES.FAQ}>Faq</Link>
                </li>
                <li>
                  <Link to={CUSTOM_ROUTES.CONTACTS}>Contacts</Link>
                </li>
                {isAuthenticated && (
                  <li>
                    <Link to={CUSTOM_ROUTES.CREATE_MENUS}>Create Menu</Link>
                  </li>
                )}
              </ul>

              <div className={styles.menu_icons}>
                {isAuthenticated ? (
                  <i onClick={handleLogout} className="ri-logout-box-line"></i>
                ) : (
                  <Link to={CUSTOM_ROUTES.LOGIN}>
                    <i className="ri-login-box-line" />
                  </Link>
                )}

                <Link to={CUSTOM_ROUTES.CART} className={styles.cartIcon}>
                  <i className="ri-shopping-cart-2-line"></i>
                  {cartItemCount > 0 && (
                    <span className={styles.cartBadge}>{cartItemCount}</span>
                  )}
                </Link>

                {/* Hamburger Menu Button */}
                <button
                  className={styles.hamburger_button}
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  <i
                    className={`ri-menu-line ${
                      isMobileMenuOpen ? styles.active : ""
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`${styles.mobile_menu} ${
              isMobileMenuOpen ? styles.mobile_menu_open : ""
            }`}
          >
            <ul>
              <li>
                <Link
                  to={CUSTOM_ROUTES.HOME}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={CUSTOM_ROUTES.ORDER}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Order
                </Link>
              </li>
              <li>
                <Link
                  to={CUSTOM_ROUTES.FAQ}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Faq
                </Link>
              </li>
              <li>
                <Link
                  to={CUSTOM_ROUTES.CONTACTS}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contacts
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link
                    to={CUSTOM_ROUTES.CREATE_MENUS}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Create Menu
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
