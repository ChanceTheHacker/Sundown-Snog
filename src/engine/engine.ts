import { vh, vw } from "../viewport/viewport";
import { player } from "../sprites/player";
import { coins } from "../sprites/coins";
import { background, ground } from "../canvas/canvas";
import { platforms, randomColor } from "../sprites/platforms";
import { controller } from "../controller/controller";
import { score, updateScore } from "./score";
import { mutePage } from "../sounds/sounds";
import { spikes } from "../sprites/spikes";

let environment;

mutePage();

const music = document.getElementById("music");
const coinAudio = [
  document.getElementById("coinAudio1"),
  document.getElementById("coinAudio2"),
  document.getElementById("coinAudio3")
];

const settings = {
  playerSpeed: 0.5,
  jumpHeight: -10 * vh, //must be negative for up on y axis
  secondJumpHeight: -7 * vh, //must be negative
  maxJump: -40, //must be negative
  maxSpeed: 20,
  gravity: 0.3 * vh,
  friction: 0.9
};

const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 80 * vh;
context.canvas.width = 90 * vw;

const landingActions = () => {
  player.inAir = false;
  player.firstJump = false;
  player.secondJump = false;
  player.yVelocity = 0;
};

const draw = sprite => {
  //draw rectangle

  if (sprite.type === "rect") {
    context.beginPath();
    context.fillStyle = sprite.color;
    context.rect(sprite.x, sprite.y, sprite.width, sprite.height);
    context.fill();
  }

  //draw lines

  if (sprite.type === "line") {
    context.beginPath();
    context.strokeStyle = sprite.color;
    context.lineWidth = sprite.thickness;
    context.moveTo(sprite.xStart, sprite.yStart);
    context.lineTo(sprite.xEnd, sprite.yEnd);
    context.stroke();
  }

  // draw images

  if (sprite.type === "image") {
    let {
      image,
      width,
      height,
      frame,
      maxFrames,
      counter,
      maxCounter,
      x,
      y
    } = sprite;
    context.drawImage(
      image,
      width * frame,
      0,
      width,
      height,
      x,
      y,
      width,
      height
    );
    sprite.counter++;
    if (counter >= maxCounter) {
      sprite.frame++;
      sprite.counter = 0;
    }
    if (frame > maxFrames - 1) {
      sprite.frame = 0;
    }
  }

  // draw text

  if (sprite.type === "text") {
    const { text, font, x, y } = sprite;
    context.font = font;
    context.fillStyle = sprite.color;
    context.fillText(text, x, y);
  }
};

//returns top bottom right and left of an object

const getBounds = unit => {
  unit.bounds = {
    centerX: unit.x + unit.width / 2,
    caneterY: unit.y + unit.height / 2,
    top: unit.y,
    bottom: unit.y + unit.height,
    right: unit.x + unit.width,
    left: unit.x
  };
};

const reactToCollision = (p, plat) => {
  const rightOffset = plat.bounds.right - p.bounds.left;
  const leftOffset = p.bounds.right - plat.bounds.left;
  const topOffset = p.bounds.bottom - plat.bounds.top;
  const bottomOffset = plat.bounds.bottom - p.bounds.top;

  if (plat.tag === "enemy") {
    p.color = "#fff";
  }

  const largest = Math.min.apply(Math, [
    rightOffset,
    leftOffset,
    topOffset,
    bottomOffset
  ]);

  switch (largest) {
    case rightOffset:
      p.x = plat.bounds.right;
      if (p.xVelocity > 0) {
        p.xVelocity = 0;
      }
      break;
    case leftOffset:
      p.x = plat.bounds.left - p.width;
      if (p.xVelocity < 0) {
        p.xVelocity = 0;
      }

      break;
    case topOffset:
      p.y = plat.bounds.top - p.height;
      if (p.yVelocity > 0) {
        p.yVelocity = 0;
        landingActions();
      }

      break;
    case bottomOffset:
      p.y = plat.bounds.bottom;
      if (p.yVelocity < 0) {
        p.yVelocity = 0;
      }
      break;
  }
};

const detectCollision = p => {
  //loop through platforms and check each
  getBounds(p);
  environment.map(plat => {
    if (p !== plat) {
      getBounds(plat);
      if (
        p.bounds.top > plat.bounds.bottom ||
        p.bounds.right < plat.bounds.left ||
        p.bounds.bottom < plat.bounds.top ||
        p.bounds.left > plat.bounds.right
      ) {
      } else if (plat.tag === "platform") {
        reactToCollision(p, plat);
      } else if (plat.tag === "coin") {
        updateScore(plat);
        coinAudio[plat.rank].volume = 0.4;
        coinAudio[plat.rank].play();
      }
    }
  });
};

const movement = () => {
  //this moves the platforms

  environment.map(plat => {
    plat.x += player.xVelocity;
    if (plat.x < plat.width * -1) {
      plat.x = context.canvas.width;
      plat.y = Math.random() * context.canvas.height - 16 - plat.height;
      if (plat.y < 0) {
        plat.y = 0;
      }
      detectCollision(plat);

      if (plat.tag === "platform") {
        plat.width = (Math.random() * context.canvas.height) / 2;
        plat.color = randomColor();
      }
      if (plat.width < 32 && plat.tag === "platform") {
        plat.width = 32;
      }
    } else if (plat.x > context.canvas.width) {
      plat.x = -32;
      plat.y = Math.random() * context.canvas.height - 16 - plat.height;
      if (plat.tag === "platform") {
        plat.width = (Math.random() * context.canvas.height) / 2;
        plat.color = randomColor();
      }
      if (plat.y < 0) {
        plat.y = 0;
      }
      detectCollision(plat);
      if (plat.width < 32 && plat.tag === "platform") {
        plat.width = 32;
      }
    }
  });
};

environment = platforms.map(x => x);
coins.map(coin => environment.push(coin));

const loop = function() {
  const {
    playerSpeed,
    maxSpeed,
    jumpHeight,
    secondJumpHeight,
    maxJump,
    gravity,
    friction
  } = settings;

  if (player.yVelocity <= maxJump) {
    player.yVelocity = maxJump;
  }

  if (controller.up && player.firstJump === false && player.inAir === false) {
    player.yVelocity = jumpHeight;
    player.inAir = true;
  }

  if (!controller.up && player.firstJump === false) {
    player.firstJump = true;
  }

  if (
    controller.up &&
    player.firstJump === true &&
    player.secondJump === false
  ) {
    player.yVelocity = secondJumpHeight;
    player.secondJump = true;
  }

  if (controller.left) {
    if (player.xVelocity < 0) {
      player.xVelocity *= friction;
    }
    player.xVelocity += playerSpeed;
  }

  if (controller.right) {
    if (player.xVelocity > 0) {
      player.xVelocity *= friction;
    }
    player.xVelocity -= playerSpeed;
  }

  //this moves the player

  player.yVelocity += gravity;
  player.y += player.yVelocity;
  player.yVelocity *= friction;
  if (
    player.bounds.centerX > background.centerX ||
    player.bounds.centerX < background.centerX
  ) {
    player.x = context.canvas.width / 2 + player.width / 2;
  }

  //this moves platforms

  movement();

  //max speed

  if (player.xVelocity > maxSpeed || player.xVelocity < maxSpeed * -1) {
    if (player.xVelocity > maxSpeed) {
      player.xVelocity = maxSpeed;
    } else {
      player.xVelocity = maxSpeed * -1;
    }
  }

  //friction when player stops moving only

  if (!controller.left && !controller.right) {
    player.xVelocity *= friction;
  }

  // don't allow player below ground level

  if (player.y > context.canvas.height - 18 - player.height) {
    landingActions();
    player.y = context.canvas.height - 18 - player.height;
  }

  detectCollision(player);

  draw(background);
  draw(player);
  draw(ground);
  platforms.map(plat => {
    draw(plat);
  });
  coins.map(coin => draw(coin));
  draw(score);
  // draw(spikes[0]);

  // update when browser will draw again

  music.play();
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.onload = function() {
  window.requestAnimationFrame(loop);
};
