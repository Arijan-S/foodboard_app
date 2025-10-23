import styles from "./FoodCard.module.css";

const FoodCard = (props) => {
  const handleViewDetails = () => {
    if (props.onViewDetails) {
      props.onViewDetails(props);
    }
  };

  return (
    <div className={styles.card} onClick={handleViewDetails}>
      <div className={styles.imageContainer}>
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
      </div>
    </div>
  );
};

export default FoodCard;
