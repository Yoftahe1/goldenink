import { signal } from "@preact/signals-react";
import { MouseEvent, TouchEvent } from "react";

import { size } from "../components/size/size";
import { fill } from "../components/fill/fill";
import { color } from "../components/colors/colors";
import { selectedTool } from "../components/tools/tools";
import { ctx, canvas } from "../components/canvas/canvas";
import { isPainting, startPos, snapshot } from "../components/canvas/canvas";

const past = signal<ImageData[][]>([]);
const present = signal<ImageData[]>([]);
const future = signal<ImageData[][]>([]);

export function startPainting(event: MouseEvent | TouchEvent) {
  const { offsetX, offsetY } = getOffset(event);
  ctx.value!.beginPath();
  ctx.value!.moveTo(offsetX, offsetY);
  isPainting.value = true;
  startPos.value = { x: offsetX, y: offsetY };
  snapshot.value = ctx.value!.getImageData(
    0,
    0,
    canvas.value!.width,
    canvas.value!.height
  );
}

export function stopPainting() {
  if (!isPainting.value) return;

  ctx.value!.closePath();
  isPainting.value = false;
  pushPaint(
    ctx.value!.getImageData(0, 0, canvas.value!.width, canvas.value!.height)
  );
}

export function draw(event: MouseEvent | TouchEvent) {
  if (!isPainting.value) return;
  ctx.value!.putImageData(snapshot.value!, 0, 0);

  const { offsetX, offsetY } = getOffset(event);

  if (selectedTool.value === "Eraser") {
    ctx.value!.lineCap = "square";
    ctx.value!.strokeStyle = "white";
    ctx.value?.lineTo(offsetX, offsetY);
    ctx.value?.stroke();
  } else {
    ctx.value!.lineWidth = size.value;
    ctx.value!.strokeStyle = color.value;
    ctx.value!.lineCap = "round";
    if (selectedTool.value === "Brush") {
      ctx.value?.lineTo(offsetX, offsetY);
      ctx.value?.stroke();
    } else {
      ctx.value?.beginPath();
      switch (selectedTool.value) {
        case "Line":
          drawLine(offsetX, offsetY);
          break;
        case "Circle":
          drawCircle(offsetX, offsetY);
          break;
        case "Triangle":
          drawRegular(offsetX, offsetY, 3);
          break;
        case "Rectangle":
          drawRec(offsetX, offsetY);
          break;
        case "Square":
          drawRegular(offsetX, offsetY, 4);
          break;
        case "Pentagon":
          drawRegular(offsetX, offsetY, 5);
          break;
        case "Hexagon":
          drawRegular(offsetX, offsetY, 6);
          break;
        case "Heptagon":
          drawRegular(offsetX, offsetY, 7);
          break;
        default:
          break;
      }
    }
  }
}

function getOffset(event: any) {
  let offsetX = 0,
    offsetY = 0;
  if (event.type[0] === "m") {
    offsetX = event.nativeEvent.offsetX;
    offsetY = event.nativeEvent.offsetY;
  } else if (event.type[0] === "t") {
    const touch = event.touches[0];
    const target = event.target;

    offsetX = touch.clientX - target.offsetLeft;
    offsetY = touch.clientY - target.offsetTop;
  } else if (event.type[0] === "p") {
    const target = event.target;

    offsetX = event.clientX - target.offsetLeft;
    offsetY = event.clientY - target.offsetTop;
  }
  return { offsetX, offsetY };
}

function drawLine(offsetX: number, offsetY: number) {
  ctx.value!.moveTo(startPos.value.x, startPos.value.y);
  ctx.value!.lineTo(offsetX, offsetY);

  ctx.value!.stroke();
}

function drawCircle(offsetX: number, offsetY: number) {
  let radius = Math.sqrt(
    Math.pow(startPos.value.x - offsetX, 2) +
      Math.pow(startPos.value.y - offsetY, 2)
  );

  ctx.value!.arc(startPos.value.x, startPos.value.y, radius, 0, 2 * Math.PI);
  if (fill.value) {
    ctx.value!.fillStyle = color.value;
    ctx.value?.fill();
  }
  ctx.value?.stroke();
}

function drawRegular(offsetX: number, offsetY: number, sides: number) {
  let radius = Math.sqrt(
    Math.pow(startPos.value.x - offsetX, 2) +
      Math.pow(startPos.value.y - offsetY, 2)
  );

  for (let side = 0; side <= sides; side++) {
    ctx.value!.lineTo(
      startPos.value.x + radius * Math.cos((side * 2 * Math.PI) / sides),
      startPos.value.y + radius * Math.sin((side * 2 * Math.PI) / sides)
    );
  }

  if (fill.value) {
    ctx.value!.fillStyle = color.value;
    ctx.value?.fill();
  }
  ctx.value?.stroke();
}

function drawRec(offsetX: number, offsetY: number) {
  ctx.value!.rect(
    startPos.value.x,
    startPos.value.y,
    offsetX - startPos.value.x,
    offsetY - startPos.value.y
  );
  if (fill.value) {
    ctx.value!.fillStyle = color.value;
    ctx.value?.fill();
  }
  ctx.value?.stroke();
}

function pushPaint(newState: ImageData) {
  const newPast = [...past.value, present.value];
  past.value = newPast;
  const newPresent = [...present.value, newState];
  present.value = newPresent;
  future.value = [];
}

export function undo() {
  if (past.value.length === 0) return;

  const newPast = [...past.value];
  const newPresent = newPast.pop() || [];
  const newFuture = [present.value, ...future.value];

  past.value = newPast;
  future.value = newFuture;
  present.value = newPresent;

  if (past.value.length === 0) {
    ctx.value!.fillStyle = "white";
    ctx.value?.clearRect(0, 0, 5000, 5000);
    ctx.value?.fillRect(0, 0, 5000, 5000);
  } else {
    ctx.value!.putImageData(present.value[present.value.length - 1], 0, 0);
  }
}

export function redo() {
  if (future.value.length === 0) return;

  const newFuture = [...future.value];
  const newPresent = newFuture.shift() || [];

  past.value = [...past.value, present.value];
  future.value = newFuture;
  present.value = newPresent;

  ctx.value!.putImageData(newPresent[newPresent.length - 1], 0, 0);
}

export function save() {
  const image = new Image();
  image.src = canvas.value!.toDataURL();
  const link = document.createElement("a");
  link.href = image.src;
  link.download = "goldenInk.png";
  link.click();
}
