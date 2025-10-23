import styles from "./FoodDetailsModal.module.css";

const FoodDetailsModal = ({ food, isOpen, onClose }) => {
  if (!isOpen || !food) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.modalHeader}>
          <img
            src={food.imageUrl}
            alt={food.title}
            className={styles.modalImage}
          />
          <div className={styles.modalInfo}>
            <h2 className={styles.modalTitle}>{food.title}</h2>
            <p className={styles.modalPrice}>${food.price}</p>
            {food.category && (
              <span className={styles.modalCategory}>{food.category}</span>
            )}
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.detailSection}>
            <h3>Ingredients</h3>
            <p className={styles.ingredients}>{food.ingredients}</p>
          </div>

          {food.size && (
            <div className={styles.detailSection}>
              <h3>Size</h3>
              <p className={styles.size}>{food.size}</p>
            </div>
          )}

          {food.createdAt && (
            <div className={styles.detailSection}>
              <h3>Created</h3>
              <p className={styles.createdAt}>
                {new Date(food.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}

          {food.createdByEmail && (
            <div className={styles.detailSection}>
              <h3>Created By</h3>
              <p className={styles.createdBy}>{food.createdByEmail}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsModal;
