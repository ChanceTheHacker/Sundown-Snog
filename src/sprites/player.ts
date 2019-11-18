const context = document.querySelector("canvas").getContext("2d");

let player = {
  height: 32,
  width: 32,
  color: "#ff0000",
  type: "rect",
  tag: "player",
  inAir: false,
  firstJump: false,
  secondJump: false,
  x: 0, //start location
  xVelocity: 0,
  y: context.canvas.height - 16,
  yVelocity: 0,
  bounds: {
    centerX: 0
  }
};

export { player };
