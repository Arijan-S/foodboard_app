import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CUSTOM_ROUTES } from "../constants/custom-routes";
import { useCart } from "../stores/cartContext.jsx";
import { useAuth } from "../stores/authContext";
import Button from "../components/Button/Button";
import styles from "./Cart.module.css";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate(CUSTOM_ROUTES.LOGIN);
      return;
    }

    setIsProcessing(true);

    // Simulate checkout process
    setTimeout(() => {
      alert("Order placed successfully! Thank you for your order.");
      clearCart();
      navigate(CUSTOM_ROUTES.HOME);
      setIsProcessing(false);
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate(CUSTOM_ROUTES.ORDER);
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className="container">
          <div className={styles.emptyCartContent}>
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Button
              onClick={handleContinueShopping}
              className={styles.continueShoppingButton}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <h1>Shopping Cart</h1>
          <p>Review your order and proceed to checkout</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.cartLayout}>
          <div className={styles.cartItems}>
            <h2>Order Items ({items.length})</h2>

            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img src={item.imageUrl} alt={item.title} />
                </div>

                <div className={styles.itemDetails}>
                  <h3>{item.title}</h3>
                  <p className={styles.itemSize}>{item.size}</p>
                  <p className={styles.itemIngredients}>{item.ingredients}</p>
                  <p className={styles.itemPrice}>${item.price}</p>
                </div>

                <div className={styles.itemQuantity}>
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
                </div>

                <div className={styles.itemTotal}>
                  <p>${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>

                <Button
                  onClick={() => handleRemoveItem(item.id)}
                  className={styles.removeButton}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>

            <div className={styles.summaryItems}>
              {items.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <span>
                    {item.title} x{item.quantity}
                  </span>
                  <span>
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.totalSection}>
              <div className={styles.subtotal}>
                <span>Subtotal:</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className={styles.tax}>
                <span>Tax (8.5%):</span>
                <span>${(parseFloat(getTotalPrice()) * 0.085).toFixed(2)}</span>
              </div>
              <div className={styles.total}>
                <span>Total:</span>
                <span>${(parseFloat(getTotalPrice()) * 1.085).toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.checkoutActions}>
              <Button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={styles.checkoutButton}
              >
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <Button
                onClick={handleContinueShopping}
                className={styles.continueButton}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
