import { useEffect, useState } from "react";
import styles from "./AccordionMenu.module.css";

const AccordionMenu = ({ items, keepOthersOpen }) => {
  const [accordionItems, setAccordionItems] = useState([]);

  useEffect(() => {
    if (items) {
      setAccordionItems(
        items.map((item, index) => ({
          ...item,
          toggled: index === 0,
        }))
      );
    }
  }, [items]);

  useEffect(() => {
    if (items) {
      setAccordionItems(
        items.map((item) => ({
          ...item,
          toggled: item.id === 0,
        }))
      );
    }
  }, [items]);

  function handleAccordionToggle(itemId) {
    setAccordionItems(
      accordionItems.map((item) => {
        let toggled = item.toggled;

        if (itemId === item.id) {
          toggled = !item.toggled;
        } else if (!keepOthersOpen) {
          toggled = false;
        }

        return {
          ...item,
          toggled,
        };
      })
    );
  }

  return (
    <div className={styles.accordion_parent}>
      {accordionItems.map((item) => (
        <div
          className={`${styles.accordion_item} ${
            item.toggled ? styles.toggled : ""
          }`}
          key={item.id}
        >
          <button
            className={styles.toggle}
            onClick={() => handleAccordionToggle(item.id)}
          >
            <p>{item.label}</p>
            <div className={styles.direction_indicator}>
              {item.toggled ? "-" : "+"}
            </div>
          </button>
          <div className={styles.content_parent}>
            <div className={styles.content}>{item.renderContent()}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionMenu;
