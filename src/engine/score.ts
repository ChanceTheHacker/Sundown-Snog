import { vh, vw } from "../viewport/viewport";

let score = {
  numValue: 0,
  textValue: "000000",
  type: "text",
  tag: "score",
  text: `Score: 000000`,
  font: `${8 * vh}px Indie Flower, cursive`,
  color: "#55ff55",
  x: 2 * vw, //start location
  y: 10 * vh
};

const updateScore = collectible => {
  if (collectible.tag === "coin") {
    collectible.x = -50;
    score.numValue = score.numValue + 10;
    score.textValue = String(score.numValue);
    for (let i = score.textValue.length; i < 6; i++) {
      score.textValue = "0" + score.textValue;
    }
    score.text = `Score: ${score.textValue}`;
  }
};

export { score, updateScore };
