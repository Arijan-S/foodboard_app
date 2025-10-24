import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./CreateMenus.module.css";
import FoodCard from "../../components/FoodCard/FoodCard";
import FoodDetailsModal from "../../components/FoodDetailsModal/FoodDetailsModal";
import {
  database,
  testDatabaseConnection,
  testDatabaseWritePermissions,
} from "../../firebase/firebase";
import { ref, push, set, onValue, off, remove } from "firebase/database";
import { useAuth } from "../../stores/authContext";

const CreateMenus = () => {
  const { user, isAuthenticated } = useAuth();
  const [foodMenu, setFoodMenu] = useState({
    title: "",
    imageUrl: "",
    size: "",
    price: "",
    ingredients: "",
    category: "",
  });

  const [foodMenus, setFoodMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [updating, setUpdating] = useState(false);

  const setupRealTimeListener = () => {
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

              setFoodMenus(transformedFoodMenus);
            } else {
              setFoodMenus([]);
            }
          } catch (error) {
            console.error("Error processing food menus data:", error);
            setError(`Failed to load existing menus: ${error.message}`);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Firebase real-time listener error:", error);
          setError(
            "Failed to connect to food menus. Please check your connection."
          );
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error setting up real-time listener:", error);
      setError("Failed to setup real-time updates. Please try again later.");
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = setupRealTimeListener();

      // Cleanup function to unsubscribe from the listener when component unmounts
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [isAuthenticated]);

  const validateForm = () => {
    if (!foodMenu.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!foodMenu.ingredients.trim()) {
      setError("Ingredients are required");
      return false;
    }
    if (!foodMenu.imageUrl.trim()) {
      setError("Image URL is required");
      return false;
    }
    if (!foodMenu.size.trim()) {
      setError("Size is required");
      return false;
    }
    if (!foodMenu.price || parseFloat(foodMenu.price) <= 0) {
      setError("Valid price is required");
      return false;
    }
    if (!foodMenu.category.trim()) {
      setError("Category is required");
      return false;
    }
    return true;
  };

  const handleCreateFoodMenus = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!isAuthenticated || !user) {
      setError("You must be logged in to create menu items");
      return;
    }

    // Verify user is properly authenticated with Firebase
    if (!user.uid || !user.email) {
      setError("Invalid user authentication. Please log in again.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setCreating(true);

      // Test write permissions before attempting to create
      console.log("🔍 Testing database write permissions...");
      const hasWritePermissions = await testDatabaseWritePermissions(user);

      if (!hasWritePermissions) {
        throw new Error(
          "PERMISSION_DENIED: You don't have permission to write to the database. Please check your authentication status."
        );
      }

      const menuData = {
        ...foodMenu,
        price: parseFloat(foodMenu.price).toFixed(2),
        createdAt: new Date().toISOString(),
        createdBy: user.uid,
        createdByEmail: user.email,
      };

      console.log("Creating menu item with data:", menuData);

      const foodMenusRef = ref(database, "foodMenus");
      const newMenuRef = push(foodMenusRef);

      await set(newMenuRef, menuData);

      console.log("Menu item created successfully with key:", newMenuRef.key);

      setSuccess(true);

      // Reset form
      setFoodMenu({
        title: "",
        imageUrl: "",
        size: "",
        price: "",
        ingredients: "",
        category: "",
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error creating food menu:", error);

      // Handle specific Firebase permission errors
      if (error.code === "PERMISSION_DENIED") {
        setError(
          "Permission denied. Please make sure you're logged in and have permission to create menu items. If the problem persists, contact the administrator."
        );
      } else if (error.code === "UNAUTHENTICATED") {
        setError("Authentication failed. Please log in again.");
      } else if (error.code === "NETWORK_ERROR") {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError(`Failed to create menu item: ${error.message}`);
      }
    } finally {
      setCreating(false);
    }
  };

  const resetForm = () => {
    setFoodMenu({
      title: "",
      imageUrl: "",
      size: "",
      price: "",
      ingredients: "",
      category: "",
    });
    setError(null);
    setSuccess(false);
  };

  const handleViewDetails = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  const handleDeleteMenu = async (menuId) => {
    if (!isAuthenticated || !user) {
      setError("You must be logged in to delete menu items");
      return;
    }

    try {
      setDeleting(true);
      setError(null);

      const menuRef = ref(database, `foodMenus/${menuId}`);
      await remove(menuRef);

      setSuccess(true);
      setDeleteConfirm(null);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting menu item:", error);
      setError(`Failed to delete menu item: ${error.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = (menu) => {
    setDeleteConfirm(menu);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setFoodMenu({
      title: menu.title,
      imageUrl: menu.imageUrl,
      size: menu.size,
      price: menu.price,
      ingredients: menu.ingredients,
      category: menu.category,
    });
  };

  const handleUpdateMenu = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!isAuthenticated || !user) {
      setError("You must be logged in to update menu items");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setUpdating(true);

      const menuData = {
        ...foodMenu,
        price: parseFloat(foodMenu.price).toFixed(2),
        updatedAt: new Date().toISOString(),
        updatedBy: user.uid,
        updatedByEmail: user.email,
      };

      const menuRef = ref(database, `foodMenus/${editingMenu.id}`);
      await set(menuRef, menuData);

      setSuccess(true);
      setEditingMenu(null);

      // Reset form
      setFoodMenu({
        title: "",
        imageUrl: "",
        size: "",
        price: "",
        ingredients: "",
        category: "",
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating menu item:", error);
      setError(`Failed to update menu item: ${error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const cancelEdit = () => {
    setEditingMenu(null);
    setFoodMenu({
      title: "",
      imageUrl: "",
      size: "",
      price: "",
      ingredients: "",
      category: "",
    });
    setError(null);
    setSuccess(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className={styles.header}>
          <div className="container">
            <h1>Create Menu</h1>
          </div>
        </div>

        <div className="container">
          <div className={styles.authMessage}>
            <h2>Authentication Required</h2>
            <p>You must be logged in to create and manage menu items.</p>
            <p>Please log in to access this feature.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <h1>Create Menu</h1>
        </div>
      </div>

      <div className="container">
        <div className={styles.createMenuLayout}>
          <div className={styles.formSection}>
            <h2>{editingMenu ? "Edit Menu Item" : "Add New Menu Item"}</h2>

            {error && (
              <div className={styles.errorMessage}>
                {error}
                <button
                  onClick={() => setError(null)}
                  className={styles.closeError}
                >
                  ×
                </button>
              </div>
            )}

            {success && (
              <div className={styles.successMessage}>
                ✓ Operation completed successfully!
              </div>
            )}

            <form
              onSubmit={editingMenu ? handleUpdateMenu : handleCreateFoodMenus}
              className={styles.forms}
            >
              <div className={styles.formGroup}>
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={foodMenu.title}
                  onChange={(e) =>
                    setFoodMenu({ ...foodMenu, title: e.target.value })
                  }
                  placeholder="e.g., Margherita Pizza"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={foodMenu.category}
                  onChange={(e) =>
                    setFoodMenu({ ...foodMenu, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Salad">Salad</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Side Dish">Side Dish</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="ingredients">Ingredients *</label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={foodMenu.ingredients}
                  onChange={(e) =>
                    setFoodMenu({ ...foodMenu, ingredients: e.target.value })
                  }
                  placeholder="e.g., Tomato sauce, mozzarella, basil"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="imageUrl">Image URL *</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={foodMenu.imageUrl}
                  onChange={(e) =>
                    setFoodMenu({ ...foodMenu, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="size">Size *</label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    value={foodMenu.size}
                    onChange={(e) =>
                      setFoodMenu({ ...foodMenu, size: e.target.value })
                    }
                    placeholder="e.g., Large, Medium, Small"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="price">Price ($) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={foodMenu.price}
                    onChange={(e) =>
                      setFoodMenu({ ...foodMenu, price: e.target.value })
                    }
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <Button
                  type="submit"
                  disabled={creating || updating}
                  className={styles.createButton}
                >
                  {creating
                    ? "Creating..."
                    : updating
                    ? "Updating..."
                    : editingMenu
                    ? "Update Menu Item"
                    : "Create Menu Item"}
                </Button>
                <Button
                  type="button"
                  onClick={editingMenu ? cancelEdit : resetForm}
                  className={styles.resetButton}
                >
                  {editingMenu ? "Cancel Edit" : "Reset Form"}
                </Button>
              </div>
            </form>
          </div>

          <div className={styles.previewSection}>
            <h2>Menu Preview</h2>
            {loading ? (
              <div className={styles.loadingMessage}>
                Loading existing menus...
              </div>
            ) : foodMenus.length === 0 ? (
              <div className={styles.emptyMessage}>
                No menu items yet. Create your first item above!
              </div>
            ) : (
              <div className={styles.menuContainer}>
                {foodMenus.map((food) => (
                  <FoodCard
                    key={food.id}
                    id={food.id}
                    title={food.title}
                    imageUrl={food.imageUrl}
                    price={food.price}
                    ingredients={food.ingredients}
                    size={food.size}
                    category={food.category}
                    createdAt={food.createdAt}
                    createdByEmail={food.createdByEmail}
                    onViewDetails={handleViewDetails}
                    onDelete={confirmDelete}
                    onEdit={handleEditMenu}
                    showDelete={true}
                    showEdit={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <FoodDetailsModal
        food={selectedFood}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className={styles.deleteModal}>
          <div className={styles.deleteModalContent}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteConfirm.title}"?</p>
            <p className={styles.warningText}>This action cannot be undone.</p>
            <div className={styles.deleteActions}>
              <button
                onClick={cancelDelete}
                className={styles.cancelButton}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMenu(deleteConfirm.id)}
                className={styles.deleteButton}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateMenus;
