import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CUSTOM_ROUTES } from "../constants/custom-routes";
import SpinnerLoader from "../components/SpinnerLoader";
import Button from "../components/Button/Button";
import { useCart } from "../stores/cartContext.jsx";
import { database } from "../firebase/firebase";
import { ref, get } from "firebase/database";
import styles from "./OrderItem.module.css";

const OrderItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  const getFoodItem = async () => {
    try {
      setLoading(true);
      const foodItemRef = ref(database, `foodMenus/${id}`);
      const snapshot = await get(foodItemRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setFoodItem({
          id,
          ...data,
        });
      } else {
        throw new Error("Food item not found");
      }
    } catch (error) {
      console.error("Error fetching food item:", error);
      setError("Failed to load food item. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getFoodItem();
    }
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (foodItem) {
      addToCart(foodItem, quantity);
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleOrderNow = () => {
    if (foodItem) {
      addToCart(foodItem, quantity);
      navigate(CUSTOM_ROUTES.CART);
    }
  };

  if (loading) {
    return <SpinnerLoader />;
  }

  if (error || !foodItem) {
    return (
      <div className={styles.errorContainer}>
        <div className="container">
          <h2>Error</h2>
          <p>{error || "Food item not found"}</p>
          <div className={styles.errorActions}>
            <button onClick={getFoodItem} className={styles.retryButton}>
              Try Again
            </button>
            <Link to={CUSTOM_ROUTES.ORDER} className={styles.backButton}>
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = (parseFloat(foodItem.price) * quantity).toFixed(2);

  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <Link to={CUSTOM_ROUTES.ORDER} className={styles.backLink}>
            ← Back to Menu
          </Link>
          <h1>{foodItem.title}</h1>
        </div>
      </div>

      <div className="container">
        <div className={styles.foodItemContainer}>
          <div className={styles.imageSection}>
            <img
              src={foodItem.imageUrl}
              alt={foodItem.title}
              className={styles.foodImage}
            />
          </div>

          <div className={styles.detailsSection}>
            <h2>{foodItem.title}</h2>
            <p className={styles.description}>
              <strong>Ingredients:</strong> {foodItem.ingredients}
            </p>
            <p className={styles.size}>
              <strong>Size:</strong> {foodItem.size}
            </p>
            <p className={styles.price}>
              <strong>Price:</strong> ${foodItem.price}
            </p>

            <div className={styles.quantitySection}>
              <label htmlFor="quantity">Quantity:</label>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={styles.quantityButton}
                >
                  -
                </button>
                <span className={styles.quantityDisplay}>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.totalPrice}>
              <strong>Total: ${totalPrice}</strong>
            </div>

            {showSuccess && (
              <div className={styles.successMessage}>
                ✓ Added to cart successfully!
              </div>
            )}

            <div className={styles.actionButtons}>
              <Button
                onClick={handleAddToCart}
                className={styles.addToCartButton}
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleOrderNow}
                className={styles.orderNowButton}
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
