import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Service.module.css";
import FoodCard from "../FoodCard/FoodCard";
import { database } from "../../firebase/firebase";
import { ref, onValue, off } from "firebase/database";
import { CUSTOM_ROUTES } from "../../constants/custom-routes";

const Service = () => {
  const [recentMenus, setRecentMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentMenus = () => {
      try {
        setLoading(true);
        setError(null);

        const foodMenusRef = ref(database, "foodMenus");

        const unsubscribe = onValue(
          foodMenusRef,
          (snapshot) => {
            try {
              if (snapshot.exists()) {
                const data = snapshot.val();
                const transformedFoodMenus = [];

                for (let key in data) {
                  transformedFoodMenus.push({
                    id: key,
                    ...data[key],
                  });
                }

                // Sort by creation date (most recent first) and take first 3
                const sortedMenus = transformedFoodMenus
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 3);

                setRecentMenus(sortedMenus);
              } else {
                setRecentMenus([]);
              }
            } catch (error) {
              console.error("Error processing food menus data:", error);
              setError("Failed to load recent menus");
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error("Firebase real-time listener error:", error);
            setError(
              "Failed to connect to menus. Please check your connection."
            );
            setLoading(false);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error setting up real-time listener:", error);
        setError("Failed to setup menu updates. Please try again later.");
        setLoading(false);
        return null;
      }
    };

    const unsubscribe = fetchRecentMenus();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <>
      <div className={styles.service_section}>
        <div className="container">
          <div className={styles.service}>
            <div className={styles.line}>
              <span className={styles.orangeLine}></span>
              <span className={styles.grayLine}></span>
            </div>

            <h3>Recent Menus</h3>
            <p>Check out our latest menu items</p>

            {loading ? (
              <div className={styles.loading}>Loading recent menus...</div>
            ) : error ? (
              <div className={styles.error}>{error}</div>
            ) : recentMenus.length === 0 ? (
              <div className={styles.noMenus}>No recent menus available</div>
            ) : (
              <div className={styles.menuCards}>
                {recentMenus.map((menu) => (
                  <Link
                    key={menu.id}
                    to={`${CUSTOM_ROUTES.ORDER}/${menu.id}`}
                    className={styles.foodCardLink}
                  >
                    <FoodCard
                      title={menu.title}
                      price={menu.price}
                      imageUrl={menu.imageUrl}
                      ingredients={menu.ingredients}
                      size={menu.size}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Service;
