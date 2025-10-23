import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SpinnerGif from "../assets/images/spinner.gif";

const SpinnerLoader = () => {
  const location = useLocation();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setShowSpinner(true);
    const timeout = setTimeout(() => {
      setShowSpinner(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: showSpinner ? "#ffffff" : "transparent",
        opacity: showSpinner ? 1 : 0,
        pointerEvents: showSpinner ? "auto" : "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 0.3s ease",
        zIndex: 9999,
      }}
    >
      {showSpinner && <img src={SpinnerGif} alt="Loading..." />}
    </div>
  );
};

export default SpinnerLoader;
