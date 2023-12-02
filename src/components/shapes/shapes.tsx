import { Button, Typography } from "antd";
import { BsHeptagon } from "react-icons/bs";
import { HiOutlineMinus } from "react-icons/hi";
import { FiCircle, FiSquare, FiTriangle } from "react-icons/fi";
import { TbHexagon, TbPentagon, TbRectangle } from "react-icons/tb";

import { selectedTool, changeTool } from "../tools/tools";

import styles from "./shapes.module.css";

const { Text } = Typography;

const shapes = [
  { label: "Line", icon: <HiOutlineMinus /> },
  { label: "Circle", icon: <FiCircle /> },
  { label: "Triangle", icon: <FiTriangle /> },
  { label: "Rectangle", icon: <TbRectangle /> },
  { label: "Square", icon: <FiSquare /> },
  { label: "Pentagon", icon: <TbPentagon /> },
  { label: "Hexagon", icon: <TbHexagon /> },
  { label: "Heptagon", icon: <BsHeptagon /> },
];

const Shapes = () => {
  return (
    <div className={styles.shapes}>
      <Text strong>Shapes</Text>
      {shapes.map((shape, index) => {
        return (
          <Button
            key={index}
            type="text"
            icon={shape.icon}
            className={
              selectedTool.value === shape.label
                ? styles.activeButton
                : styles.button
            }
            onClick={() => {
              changeTool(shape.label);
            }}
          >
            {shape.label}
          </Button>
        );
      })}
    </div>
  );
};

export default Shapes;
