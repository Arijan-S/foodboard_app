import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { CUSTOM_ROUTES } from "../constants/custom-routes";
import FoodCard from "../components/FoodCard/FoodCard";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import SpinnerLoader from "../components/SpinnerLoader";
import Button from "../components/Button/Button";
import { useCart } from "../stores/cartContext.jsx";
import { database } from "../firebase/firebase";
import { ref, onValue, off } from "firebase/database";
import styles from "./Order.module.css";

const Order = () => {
  const [foodMenus, setFoodMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const { items, updateQuantity, removeFromCart } = useCart();

  const setupRealTimeListener = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("📡 Setting up real-time listener for foodMenus...");
      const foodMenusRef = ref(database, "foodMenus");

      const unsubscribe = onValue(
        foodMenusRef,
        (snapshot) => {
          try {
            console.log(
              "📊 Received snapshot:",
              snapshot.exists() ? "Data exists" : "No data"
            );

            if (snapshot.exists()) {
              const data = snapshot.val();
              const transformedFoodMenus = [];

              for (let key in data) {
                transformedFoodMenus.push({
                  id: key,
                  ...data[key],
                });
              }

              console.log(
                `✅ Loaded ${transformedFoodMenus.length} food menu items`
              );
              setFoodMenus(transformedFoodMenus);
            } else {
              console.log("ℹ️ No food menu data found in database");
              setFoodMenus([]);
            }
          } catch (error) {
            console.error("❌ Error processing food menus data:", error);
            setError(`Failed to process food menus data: ${error.message}`);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("❌ Firebase real-time listener error:", error);
          setError(
            `Failed to connect to food menus: ${error.message}. Please check your connection and try again.`
          );
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("❌ Error setting up real-time listener:", error);
      setError(`Failed to setup real-time updates: ${error.message}`);
      setLoading(false);
      return null;
    }
  };

  // Get unique categories from food menus
  const categories = useMemo(() => {
    const cats = [
      ...new Set(foodMenus.map((food) => food.category || "Other")),
    ];
    return ["all", ...cats];
  }, [foodMenus]);

  // Filter and sort food menus
  const filteredAndSortedMenus = useMemo(() => {
    let filtered = foodMenus.filter((food) => {
      // Search filter
      const matchesSearch =
        food.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.ingredients.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || food.category === selectedCategory;

      // Price range filter
      let matchesPrice = true;
      if (priceRange !== "all") {
        const price = parseFloat(food.price);
        switch (priceRange) {
          case "under-10":
            matchesPrice = price < 10;
            break;
          case "10-20":
            matchesPrice = price >= 10 && price <= 20;
            break;
          case "20-30":
            matchesPrice = price > 20 && price <= 30;
            break;
          case "over-30":
            matchesPrice = price > 30;
            break;
          default:
            matchesPrice = true;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [foodMenus, searchTerm, selectedCategory, priceRange, sortBy]);

  useEffect(() => {
    let unsubscribe = null;
    let retryTimeout = null;

    const initializeConnection = async () => {
      try {
        unsubscribe = await setupRealTimeListener();

        if (!unsubscribe) {
          // If setup failed, retry after 3 seconds
          console.log("🔄 Retrying connection in 3 seconds...");
          retryTimeout = setTimeout(initializeConnection, 3000);
        }
      } catch (error) {
        console.error("❌ Failed to initialize connection:", error);
        // Retry after 5 seconds on error
        retryTimeout = setTimeout(initializeConnection, 5000);
      }
    };

    initializeConnection();

    // Cleanup function to unsubscribe from the listener when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, []);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("name");
  };

  if (loading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className="container">
          <h2>Error</h2>
          <p>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <h1>Order Food</h1>
        </div>
      </div>

      <div className="container">
        <div className={styles.orderPageLayout}>
          <div className={styles.menuSection}>
            {/* Search and Filter Section */}
            <div className={styles.filterSection}>
              <div className={styles.searchBar}>
                <i className="ri-search-line"></i>
                <input
                  type="text"
                  placeholder="Search for food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.filters}>
                <div className={styles.filterGroup}>
                  <label htmlFor="category">Category:</label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.filterSelect}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label htmlFor="priceRange">Price Range:</label>
                  <select
                    id="priceRange"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Prices</option>
                    <option value="under-10">Under $10</option>
                    <option value="10-20">$10 - $20</option>
                    <option value="20-30">$20 - $30</option>
                    <option value="over-30">Over $30</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label htmlFor="sortBy">Sort By:</label>
                  <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                <Button
                  onClick={clearFilters}
                  className={styles.clearFiltersBtn}
                >
                  <i className="ri-refresh-line"></i>
                  Clear Filters
                </Button>
              </div>

              {/* Results count */}
              <div className={styles.resultsInfo}>
                <span>
                  Showing {filteredAndSortedMenus.length} of {foodMenus.length}{" "}
                  items
                </span>
              </div>
            </div>

            {/* Menu Grid */}
            {filteredAndSortedMenus.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>No items found</h2>
                <p>
                  {searchTerm ||
                  selectedCategory !== "all" ||
                  priceRange !== "all"
                    ? "Try adjusting your search or filters"
                    : "Check back later for our delicious menu items!"}
                </p>
                {(searchTerm ||
                  selectedCategory !== "all" ||
                  priceRange !== "all") && (
                  <Button onClick={clearFilters} className={styles.retryButton}>
                    Clear All Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className={styles.menuGrid}>
                {filteredAndSortedMenus.map((food) => (
                  <Link
                    key={food.id}
                    to={`${CUSTOM_ROUTES.ORDER}/${food.id}`}
                    className={styles.foodCardLink}
                  >
                    <FoodCard
                      title={food.title}
                      imageUrl={food.imageUrl}
                      price={food.price}
                      ingredients={food.ingredients}
                      size={food.size}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className={styles.summarySection}>
            <OrderSummary
              orderItems={items}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
