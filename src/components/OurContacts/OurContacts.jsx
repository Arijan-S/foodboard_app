import Map from "../Map";
import Card from "../Card/Card";
import styles from "./OurContacts.module.css";
// Using public assets instead of imported assets
const AddressIcon = "/addressIcon.png";
const EmailIcon = "/emailIcon.png";
const PhoneIcon = "/phoneIcon.png";

const OurContacts = () => {
  return (
    <>
      <div className={styles.ourContacts_container}>
        <div className={styles.ourContacts_header}>
          <div className="container">
            <h1>Our Contacts</h1>
          </div>
        </div>
      </div>

      <Map />

      <div className="container">
        <div className={styles.contact_container}>
          <div className={styles.contact_details}>
            <div className={styles.line}>
              <span className={styles.orangeLine}></span>
              <span className={styles.grayLine}></span>
            </div>

            <h2>Contact Details</h2>
            <p>Contact us</p>
            <div className={styles.contact_cards}>
              <Card
                icon={AddressIcon}
                title="Address"
                description="1234 Centar, Skopje, North Macedonia"
              />
              <Card
                icon={EmailIcon}
                title="Email"
                description="info@foodboard.com"
              />
              <Card
                icon={PhoneIcon}
                title="Phone"
                description="+389/70 000 000"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurContacts;

{
  /* <div className={styles.contact_section}>
        <div className="container">
          <h4 className={styles.ourContactsHeading}>Our Contacts</h4>
        </div>

        <Map />

        <div className="container">
          <div className={styles.contact_container}>
            <div className={styles.contact_details}>
              <div className={styles.line}>
                <span className={styles.orangeLine}></span>
                <span className={styles.grayLine}></span>
              </div>

              <h2>Contact Details</h2>
              <p>Contact us</p>
              <div className={styles.contact_cards}>
                <OurContactCards
                  icon={AddressIcon}
                  title="Address"
                  description="1234 Street Name, City Name, North MK"
                />
                <OurContactCards
                  icon={EmailIcon}
                  title="Email"
                  description="info@yourdomain.com"
                />
                <OurContactCards
                  icon={PhoneIcon}
                  title="Phone"
                  description="+389/70 000 000"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */
}
