import AccordionMenu from "../AccordionMenu/AccordionMenu";
import styles from "./FaqPage.module.css";

const FaqPage = () => {
  const introduction = [
    {
      id: 0,
      label: "Who we are?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },
    {
      id: 1,
      label: "What we do?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },

    {
      id: 2,
      label: "Where we are located?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },
  ];

  const processingOrder = [
    {
      id: 3,
      label: "How can I process an order?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },
    {
      id: 4,
      label: "Will I get order confirmation?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },
    {
      id: 5,
      label: "In which time can i order?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },
  ];

  const payment = [
    {
      id: 6,
      label: "How can I pay for this order?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },

    {
      id: 7,
      label: "Which card is accepted at online payment?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },

    {
      id: 8,
      label: "Does courier accept card for the payment?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },
  ];
  const delivery = [
    {
      id: 9,
      label: "How much time deos it take to get my order?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },

    {
      id: 10,
      label: "In which area do you provide delivery?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia.
        </p>
      ),
    },

    {
      id: 11,
      label: "Do you have delivery fee?",
      renderContent: () => (
        <p>
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          <br />
          <br />
          Facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia. Quia consequuntur magni dolores eos qui
          ratione voluptatem sequi nesciunt.
        </p>
      ),
    },
  ];

  return (
    <>
      <div className={styles.faqHeader}>
        <div className="container">
          <h1>Faq</h1>
        </div>
      </div>

      <div className={styles.faqContent}>
        <div className="container">
          <div className={styles.section}>
            <div className={styles.line}>
              <span className={styles.orangeLine}></span>
              <span className={styles.grayLine}></span>
            </div>
            <h2 className={styles.sectionTitle}>Introduction</h2>
            <AccordionMenu items={introduction} keepOthersOpen={false} />
          </div>

          <div className={styles.section}>
            <div className={styles.line}>
              <span className={styles.orangeLine}></span>
              <span className={styles.grayLine}></span>
            </div>
            <h2 className={styles.sectionTitle}>Processing order</h2>
            <AccordionMenu items={processingOrder} keepOthersOpen={false} />
          </div>

          <div className={styles.section}>
            <div className={styles.line}>
              <span className={styles.orangeLine}></span>
              <span className={styles.grayLine}></span>
            </div>
            <h2 className={styles.sectionTitle}>Payment</h2>
            <AccordionMenu items={payment} keepOthersOpen={false} />
          </div>

          <div className={styles.section}>
            <div className={styles.line}>
              <span className={styles.orangeLine}></span>
              <span className={styles.grayLine}></span>
            </div>
            <h2 className={styles.sectionTitle}>Delivery</h2>
            <AccordionMenu items={delivery} keepOthersOpen={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
