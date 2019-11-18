const context = document.querySelector("canvas").getContext("2d");

let controller = {
  left: false,
  right: false,
  up: false,

  keyListener: function(event) {
    let isKeyPressed = event.type === "keydown" ? true : false;

    switch (event.key) {
      case "a":
      case "A":
      case "ArrowLeft":
        controller.left = isKeyPressed;
        break;
      case "w":
      case "W":
      case "ArrowUp":
      case " ":
        controller.up = isKeyPressed;
        break;
      case "d":
      case "D":
      case "ArrowRight":
        controller.right = isKeyPressed;
        break;
    }
  }
};

export { controller };
