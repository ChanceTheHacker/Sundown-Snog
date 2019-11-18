import { vh, vw } from "../viewport/viewport";

const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 80 * vh;
context.canvas.width = 90 * vw;

const background = {
  height: context.canvas.height,
  width: context.canvas.width,
  color: "#202020",
  type: "rect",
  x: 0,
  y: 0,
  centerX: context.canvas.width / 2,
  centerY: context.canvas.height / 2
};

const ground = {
  thickness: 4,
  color: "#55ff55",
  type: "line",
  xStart: 0,
  yStart: context.canvas.height - 16,
  xEnd: context.canvas.width,
  yEnd: context.canvas.height - 16
};

export { background, ground };
