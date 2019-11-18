const context = document.querySelector("canvas").getContext("2d");

let platforms = [
  {
    height: 32,
    width: 128,
    color: "#55ff55",
    type: "rect",
    tag: "platform",
    x: context.canvas.width * 0.3333,
    y: context.canvas.height / 2,
    xVelocity: 0,
    yVelocity: 0,
    bounds: { bottom: 0, left: 0, top: 0, right: 0 }
  },
  {
    height: 32,
    width: 128,
    color: "#55ff55",
    type: "rect",
    tag: "platform",
    x: context.canvas.width * 0.6666,
    y: context.canvas.height / 2 - 48,
    xVelocity: 0,
    yVelocity: 0,
    bounds: { bottom: 0, left: 0, top: 0, right: 0 }
  },
  {
    height: 32,
    width: 128,
    color: "#55ff55",
    type: "rect",
    tag: "platform",
    x: 0,
    y: context.canvas.height / 2 - 48,
    xVelocity: 0,
    yVelocity: 0,
    bounds: {
      bottom: 0,
      left: 0,
      top: 0,
      right: 0
    }
  }
];

const randomColor = () => {
  let r = Math.floor(Math.random() * 200 + 1);
  let g = Math.floor(Math.random() * 200 + 1);
  let b = Math.floor(Math.random() * 200 + 1);
  return `rgb(${r}, ${g}, ${b})`;
};

export { platforms, randomColor };
