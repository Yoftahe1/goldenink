import { Typography } from "antd";
import { Link } from "react-router-dom";

import table from "../../assets/table.webp";

import styles from "./home.module.css";

const { Title } = Typography;

const Home = () => {
  return (
    <div className={styles.home}>
      <div>
        <Title className={styles.title}>GOLDENINK</Title>
        <Title level={3}>
          You never know when a great idea will spark, or where it will lead.
        </Title>
        <Title level={3}>
        Unleash your creativity and create stunning artwork on a digital canvas.
        <br/>
        A wide variety of highly customizable tools.
        </Title>
        <Link to="/paint" className={styles.button}>
          Get Started
        </Link>
      </div>
      <div>
        <img src={table} alt="table" />
      </div>
    </div>
  );
};

export default Home;
