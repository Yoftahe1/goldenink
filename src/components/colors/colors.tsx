import { Color } from "antd/es/color-picker";
import { ColorPicker, Typography } from "antd";
import { signal } from "@preact/signals-react";

import styles from "./color.module.css";

const { Text } = Typography;

const colors = ["black", "blue", "green", "yellow", "orange", "red"];

export const color = signal<string>("black");

function changeColor(newColor: Color | string) {
  if (typeof newColor === "string") color.value = newColor;
  else color.value = newColor.toHexString();
}

const Colors = () => {
  return (
    <div className={styles.colors}>
      <Text strong>Pick a color</Text>
      <div className={styles.container}>
        {colors.map((color, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: color }}
              onClick={() => changeColor(color)}
              className={styles.color}
            ></div>
          );
        })}
        <ColorPicker
          onChangeComplete={changeColor}
          format="hex"
          defaultValue={color.value}
          value={color.value}
        />
      </div>
    </div>
  );
};

export default Colors;
