import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <>
      <div className={styles.hero_section}>
        <div className="container">
          <div className={styles.hero}>
            <h1>FOODBOARD</h1>
            <h3>Food order wizard with online payment.</h3>
            <button>Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
