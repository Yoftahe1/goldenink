import { Button, Tooltip } from "antd";

import Size from "../size/size";
import Fill from "../fill/fill";
import Tools from "../tools/tools";
import Colors from "../colors/colors";
import Shapes from "../shapes/shapes";
import { undo, redo, save } from "../../utils/draw";

import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <Shapes />
        <Fill />
        <Tools />
        <Size />
        <Colors />
      </div>
      <div className={styles.container}>
        <div className={styles.undoRedo}>
          <Tooltip title="Ctrl+Z" color="gold">
            <Button size="large" style={{ width: "100%" }} onClick={undo}>
              Undo
            </Button>
          </Tooltip>
          <Tooltip title="Ctrl+Y" color="gold">
            <Button size="large" style={{ width: "100%" }} onClick={redo}>
              Redo
            </Button>
          </Tooltip>
        </div>
        <Button
          type="primary"
          size="large"
          style={{ width: "100%" }}
          onClick={save}
        >
          Save As Image
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
