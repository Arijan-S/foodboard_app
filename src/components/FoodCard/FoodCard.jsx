import styles from "./FoodCard.module.css";

const FoodCard = (props) => {
  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (props.onViewDetails) {
      props.onViewDetails(props);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(props);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (props.onEdit) {
      props.onEdit(props);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer} onClick={handleViewDetails}>
        <img src={props.imageUrl} alt={props.title} className={styles.image} />
        <div className={styles.overlay}>
          <span className={styles.viewDetails}>View Details</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{props.title}</h3>
        <p className={styles.price}>${props.price}</p>
        <p className={styles.ingredients}>{props.ingredients}</p>
        {props.size && <p className={styles.size}>Size: {props.size}</p>}
        <div className={styles.actionButtons}>
          {props.showEdit && (
            <button
              className={styles.editButton}
              onClick={handleEdit}
              title="Edit menu item"
            >
              Edit Menu
            </button>
          )}
          {props.showDelete && (
            <button
              className={styles.deleteButton}
              onClick={handleDelete}
              title="Delete menu item"
            >
              Delete Menu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
