import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <>
      <div className={styles.card}>
        <img src={props.icon} alt="card-icon" />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </>
  );
};

export default Card;
