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

      // Log the ID being used for debugging
      console.log("Fetching food item with ID:", id);
      console.log("ID type:", typeof id);

      // Ensure ID is properly formatted
      const foodItemId = id?.toString().trim();

      if (!foodItemId) {
        throw new Error("Invalid food item ID");
      }

      const foodItemRef = ref(database, `foodMenus/${foodItemId}`);
      console.log("Database path:", `foodMenus/${foodItemId}`);

      const snapshot = await get(foodItemRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Food item data retrieved:", data);
        setFoodItem({
          id: foodItemId,
          ...data,
        });
      } else {
        console.error("Snapshot does not exist for ID:", foodItemId);

        // Try to get all food items to see what's available
        console.log("Attempting to fetch all food items to debug...");
        const allFoodRef = ref(database, "foodMenus");
        const allSnapshot = await get(allFoodRef);

        if (allSnapshot.exists()) {
          const allData = allSnapshot.val();
          const availableIds = Object.keys(allData);
          console.log("Available food item IDs:", availableIds);
          console.log("Total items available:", availableIds.length);

          // Show if ID exists
          const idExists = availableIds.includes(foodItemId);
          console.log(`ID "${foodItemId}" exists:`, idExists);

          if (!idExists) {
            console.log(
              "Similar IDs:",
              availableIds.filter(
                (id) =>
                  id.includes(foodItemId.substring(0, 4)) ||
                  foodItemId.includes(id.substring(0, 4))
              )
            );
          }
        } else {
          console.error("No food menus exist in the database");
        }

        throw new Error(
          `Food item with ID "${foodItemId}" not found in the database.`
        );
      }
    } catch (error) {
      console.error("Error fetching food item:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        id: id,
        stack: error.stack,
      });

      // Provide more specific error messages
      if (error.code === "PERMISSION_DENIED") {
        setError("Permission denied. You don't have access to view this item.");
      } else if (
        error.code === "NETWORK_ERROR" ||
        error.message.includes("network")
      ) {
        setError("Network error. Please check your connection and try again.");
      } else if (
        error.code === "NOT_FOUND" ||
        error.message.includes("not found")
      ) {
        setError(
          "The requested food item could not be found. It may have been removed or the link is incorrect."
        );
      } else {
        setError(`Failed to load food item: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Log all params
    console.log("OrderItem - Current URL:", window.location.href);

    if (id) {
      console.log("OrderItem mounted with id:", id);
      console.log("OrderItem - Database instance:", database);
      console.log("OrderItem - Database app:", database?.app);
      console.log("OrderItem - Firebase config:", {
        projectId: database?.app?.options?.projectId,
        databaseURL: database?.app?.options?.databaseURL,
      });
      getFoodItem();
    } else {
      console.error("No ID provided to OrderItem component");
      setError("Invalid food item ID");
      setLoading(false);
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
