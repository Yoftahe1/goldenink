import { Checkbox } from "antd";
import { signal } from "@preact/signals-react";

export const fill = signal(false);

function changeFill() {
  fill.value = !fill.value;
}
const Fill = () => {
  return (
    <div style={{ paddingLeft: 15 }}>
      <Checkbox onChange={changeFill}>Fill Shapes</Checkbox>
    </div>
  );
};

export default Fill;
