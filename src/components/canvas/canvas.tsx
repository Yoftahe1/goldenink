import { useEffect, useRef } from "react";

import { motion } from "framer-motion";
import { signal } from "@preact/signals-react";

import { selectedTool } from "../tools/tools";
import { startPainting, stopPainting, draw } from "../../utils/draw";

import styles from "./canvas.module.css";

export const isPainting = signal(false);
export const startPos = signal({ x: 0, y: 0 });
export const snapshot = signal<ImageData | null>(null);

export const canvas = signal<HTMLCanvasElement | null>(null);
export const ctx = signal<CanvasRenderingContext2D | null | undefined>(null);

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    canvas.value = canvasRef.current;
    canvas.value!.width = 5000;
    canvas.value!.height = 5000;
    const newCtx = canvas.value!.getContext("2d", { willReadFrequently: true });
    newCtx!.fillStyle = "white";
    newCtx!.clearRect(0, 0, 5000, 5000);
    newCtx!.fillRect(0, 0, 5000, 5000);
    ctx.value = newCtx;
  }, []);

  return (
    <motion.div ref={constraintsRef} className={styles.container} >
      <motion.canvas
        ref={canvasRef}
        drag={selectedTool.value === "Drag"}
        dragConstraints={constraintsRef}
        onMouseDown={(event) => startPainting(event)}
        onTouchStart={(event) => startPainting(event)}
        onMouseUp={() => stopPainting()}
        onTouchEnd={() => stopPainting()}
        onMouseMove={(event) => draw(event)}
        onTouchMove={(event) => draw(event)}
        onMouseOut={() => stopPainting()}
        onTouchCancel={() => stopPainting()}
        className={styles.canvas}
        style={
          selectedTool.value === "Drag"
            ? { cursor: "all-scroll" }
            : { cursor: "crosshair" }
        }
      ></motion.canvas>
    </motion.div>
  );
};

export default Canvas;
