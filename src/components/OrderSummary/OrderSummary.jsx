import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CUSTOM_ROUTES } from "../../constants/custom-routes";
import styles from "./OrderSummary.module.css";

const OrderSummary = ({ orderItems = [], onUpdateQuantity, onRemoveItem }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show order summary when there are items
  useEffect(() => {
    setIsVisible(orderItems.length > 0);
  }, [orderItems]);

  const calculateTotal = () => {
    return orderItems
      .reduce((total, item) => {
        return total + parseFloat(item.price) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    onRemoveItem(itemId);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.orderSummary}>
      <div className={styles.summaryHeader}>
        <h3>Order Summary</h3>
        <span className={styles.itemCount}>{getTotalItems()} items</span>
      </div>

      <div className={styles.itemsList}>
        {orderItems.map((item) => (
          <div key={item.id} className={styles.orderItem}>
            <div className={styles.itemInfo}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <h4>{item.title}</h4>
                <p className={styles.itemSize}>{item.size}</p>
                <p className={styles.itemPrice}>${item.price}</p>
              </div>
            </div>

            <div className={styles.itemActions}>
              <div className={styles.quantityControls}>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className={styles.quantityButton}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  disabled={item.quantity >= 10}
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summaryFooter}>
        <div className={styles.totalSection}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalAmount}>${calculateTotal()}</span>
        </div>

        <Link to={CUSTOM_ROUTES.CART} className={styles.continueButton}>
          Continue Order
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
