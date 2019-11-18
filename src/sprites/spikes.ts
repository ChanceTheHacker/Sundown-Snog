const context = document.querySelector("canvas").getContext("2d");

let spikes = [
  {
    height: 34,
    width: 67,
    image: document.getElementById("spikes"),
    frame: 0,
    counter: 0,
    maxCounter: 0,
    maxFrames: 0,
    type: "image",
    tag: "spikes",
    rank: 0,
    x: context.canvas.width * 0.3333,
    y: context.canvas.height - 52,
    xVelocity: 0,
    yVelocity: 0,
    bounds: {
      centerX: 0
    }
  }
];

export { spikes };
