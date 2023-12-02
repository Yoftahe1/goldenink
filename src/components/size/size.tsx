import { Slider, Typography } from "antd";
import { signal } from "@preact/signals-react";

const { Text } = Typography;

export const size = signal<number>(10);

function changeSize(newSize: number) {
  size.value = newSize;
}

const Size = () => {
  return (
    <div>
      <Text strong>Pick a Size</Text>
      <Slider defaultValue={size.value} max={50} onChange={changeSize} />
    </div>
  );
};

export default Size;
