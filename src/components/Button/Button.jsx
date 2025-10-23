import styles from "./Button.module.css";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
