import { useEffect } from "react";

import { undo, redo } from "../../utils/draw";
import Header from "../../components/header/header";
import Canvas from "../../components/canvas/canvas";
import Sidebar from "../../components/sidebar/sidebar";

import styles from "./paint.module.css";

const Paint = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        undo();
      } else if (event.ctrlKey && event.key === 'y') {
        event.preventDefault();
        redo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <Canvas />
      </div>
    </div>
  );
};

export default Paint;
