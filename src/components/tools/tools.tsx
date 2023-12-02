import { FiMove } from "react-icons/fi";
import { BsBrush } from "react-icons/bs";
import { Button, Typography } from "antd";
import { LuEraser } from "react-icons/lu";
import { signal } from "@preact/signals-react";

import styles from "./tools.module.css";

const { Text } = Typography;

const tools = [
  { label: "Brush", icon: <BsBrush /> },
  { label: "Eraser", icon: <LuEraser /> },
  { label: "Drag", icon: <FiMove /> },
];

export const selectedTool = signal("Brush");

export function changeTool(newTool: string) {
  selectedTool.value = newTool;
}

const Tools = () => {
  return (
    <div className={styles.tools}>
      <Text strong>Tools</Text>
      {tools.map((tool, index) => {
        return (
          <Button
            key={index}
            type="text"
            icon={tool.icon}
            className={
              selectedTool.value === tool.label
                ? styles.activeButton
                : styles.button
            }
            onClick={() => changeTool(tool.label)}
          >
            {tool.label}
          </Button>
        );
      })}
    </div>
  );
};

export default Tools;
