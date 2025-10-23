import { useState, useEffect } from "react";
import styles from "./BackToTop.module.css";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        className={styles.button}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i class="ri-arrow-up-wide-line"></i>
      </button>
    )
  );
}
export default BackToTop;
