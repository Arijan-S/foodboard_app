import AccordionMenu from "../AccordionMenu/AccordionMenu";
import styles from "./FaqPage.module.css";

const FaqPage = () => {
  const introduction = [
    {
      id: 0,
      label: "Who we are?",
      renderContent: () => (
        <p>
          FoodBoard is a premium food delivery service dedicated to bringing you
          the finest culinary experiences right to your doorstep. We partner
          with the city's most beloved restaurants and talented chefs to curate
          an exceptional menu that caters to every taste and dietary preference.
          <br />
          <br />
          Our mission is to make quality dining accessible and convenient for
          everyone. Whether you're craving authentic Italian pasta, fresh sushi,
          hearty burgers, or healthy vegan options, FoodBoard connects you with
          the best local restaurants and ensures your food arrives hot, fresh,
          and delicious every time.
        </p>
      ),
    },
    {
      id: 1,
      label: "What we do?",
      renderContent: () => (
        <p>
          FoodBoard operates as a comprehensive food delivery platform that
          bridges the gap between hungry customers and amazing local
          restaurants. We handle everything from order processing and payment to
          delivery logistics, ensuring a seamless experience for both customers
          and restaurant partners.
          <br />
          <br />
          Our services include real-time order tracking, secure online payments,
          professional delivery drivers, and 24/7 customer support. We also
          provide restaurants with digital tools to manage their online
          presence, track sales, and optimize their delivery operations for
          maximum efficiency and customer satisfaction.
        </p>
      ),
    },

    {
      id: 2,
      label: "Where we are located?",
      renderContent: () => (
        <p>
          FoodBoard is headquartered in the heart of the city, serving customers
          across multiple neighborhoods and districts. Our central kitchen and
          logistics hub is strategically located to ensure fast and efficient
          delivery to all our service areas.
          <br />
          <br />
          We currently deliver to over 50 neighborhoods within a 15-mile radius
          of downtown, including residential areas, business districts, and
          university campuses. Our delivery zones are constantly expanding as we
          grow our network of partner restaurants and customer base. You can
          check our delivery coverage by entering your address during checkout.
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
          Ordering with FoodBoard is simple and straightforward! Browse our
          extensive menu of partner restaurants, select your favorite dishes,
          customize your order with special instructions, and add items to your
          cart. Once you're ready, proceed to checkout where you can review your
          order, select delivery time, and choose your preferred payment method.
          <br />
          <br />
          You can place orders through our website or mobile app. Simply create
          an account, add your delivery address, and start exploring delicious
          options from our curated selection of restaurants. Our user-friendly
          interface makes it easy to filter by cuisine type, dietary
          preferences, price range, and delivery time.
        </p>
      ),
    },
    {
      id: 4,
      label: "Will I get order confirmation?",
      renderContent: () => (
        <p>
          Yes, absolutely! You will receive immediate order confirmation via
          email and SMS as soon as your order is placed successfully. The
          confirmation includes your order number, estimated delivery time,
          restaurant details, and a complete breakdown of your order items and
          total cost.
          <br />
          <br />
          You'll also receive real-time updates throughout the entire process -
          when your order is confirmed by the restaurant, when it's being
          prepared, when it's out for delivery, and when it arrives at your
          doorstep. You can track your order status in real-time through our app
          or website using your order number.
        </p>
      ),
    },
    {
      id: 5,
      label: "In which time can i order?",
      renderContent: () => (
        <p>
          FoodBoard operates 24/7, so you can place orders at any time that's
          convenient for you! However, delivery times vary depending on
          restaurant operating hours and your location. Most restaurants are
          available for delivery between 11:00 AM and 11:00 PM, with some
          offering extended hours until midnight or even 24/7 service.
          <br />
          <br />
          You can schedule orders up to 7 days in advance for future delivery,
          and we also offer same-day delivery for most restaurants. During peak
          hours (typically 12:00-2:00 PM and 6:00-9:00 PM), delivery times may
          be slightly longer due to high demand, but we always strive to deliver
          within the estimated timeframe.
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
          FoodBoard offers multiple secure payment options to make your ordering
          experience convenient and flexible. You can pay online using credit
          cards, debit cards, digital wallets like Apple Pay and Google Pay, or
          through our secure payment gateway that accepts all major payment
          methods.
          <br />
          <br />
          We also support cash on delivery (COD) for orders above $15, and you
          can save your payment information securely for faster future
          checkouts. All online payments are processed through encrypted,
          PCI-compliant systems to ensure your financial information is always
          protected and secure.
        </p>
      ),
    },

    {
      id: 7,
      label: "Which card is accepted at online payment?",
      renderContent: () => (
        <p>
          We accept all major credit and debit cards including Visa, Mastercard,
          American Express, and Discover. Our payment system also supports
          international cards, so you can use cards issued by banks worldwide.
          Additionally, we accept prepaid cards and gift cards from major
          retailers.
          <br />
          <br />
          For enhanced security, all card transactions are processed through our
          certified payment partners using industry-standard encryption. You can
          also use digital wallets like Apple Pay, Google Pay, Samsung Pay, and
          PayPal for quick and secure payments without entering your card
          details each time.
        </p>
      ),
    },

    {
      id: 8,
      label: "Does courier accept card for the payment?",
      renderContent: () => (
        <p>
          Yes, our delivery drivers are equipped with mobile payment terminals
          and can accept card payments upon delivery. This is especially
          convenient if you prefer to pay when your food arrives or if you want
          to add a tip directly to your card. Our drivers carry contactless
          payment devices for quick and hygienic transactions.
          <br />
          <br />
          However, we recommend paying online in advance for faster delivery and
          to avoid any potential issues with card readers or network
          connectivity. Online payments also allow you to track your order
          status more accurately and receive instant confirmation of your
          payment.
        </p>
      ),
    },
  ];
  const delivery = [
    {
      id: 9,
      label: "How much time does it take to get my order?",
      renderContent: () => (
        <p>
          Delivery times typically range from 25-45 minutes depending on your
          location, restaurant preparation time, and current demand. We provide
          accurate delivery estimates at checkout based on real-time data
          including traffic conditions, restaurant capacity, and your distance
          from the restaurant.
          <br />
          <br />
          During peak hours (lunch 12:00-2:00 PM and dinner 6:00-9:00 PM),
          delivery may take slightly longer due to high demand. You can track
          your order in real-time through our app to see exactly when your food
          will arrive. We also offer express delivery options for select
          restaurants with guaranteed 20-minute delivery times.
        </p>
      ),
    },

    {
      id: 10,
      label: "In which area do you provide delivery?",
      renderContent: () => (
        <p>
          FoodBoard delivers to over 50 neighborhoods across the metropolitan
          area, covering a 15-mile radius from our central hub. This includes
          downtown business districts, residential suburbs, university campuses,
          and surrounding communities. We're constantly expanding our delivery
          zones to serve more customers.
          <br />
          <br />
          You can check if we deliver to your area by entering your address
          during checkout. If you're outside our current delivery zone, you can
          sign up for notifications to be alerted when we expand to your
          neighborhood. We also offer pickup options at select restaurants if
          delivery isn't available in your area yet.
        </p>
      ),
    },

    {
      id: 11,
      label: "Do you have delivery fee?",
      renderContent: () => (
        <p>
          Yes, we charge a small delivery fee that varies by distance and
          restaurant. Delivery fees typically range from $2.99 to $5.99, with
          free delivery available on orders over $25 from select restaurants.
          The exact delivery fee is clearly displayed before you complete your
          order, so there are no surprises.
          <br />
          <br />
          We also offer a FoodBoard Plus membership for $9.99/month that
          includes free delivery on all orders over $15, exclusive discounts,
          and priority customer support. Additionally, we frequently run
          promotions with free delivery codes that you can apply at checkout to
          save on delivery fees.
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
