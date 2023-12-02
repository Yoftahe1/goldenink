import { Typography } from "antd";

import styles from "./header.module.css";

const {Title}=Typography

const Header = () => {
  return (
    <div className={styles.header}>
        <Title level={3} className={styles.logo}>GoldenInk</Title>
    </div>
  )
}

export default Header