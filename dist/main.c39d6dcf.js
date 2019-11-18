// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/viewport/viewport.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bg = document.getElementsByClassName("background")[0];
var vh = bg.getBoundingClientRect().height / 100;
exports.vh = vh;
var vw = bg.getBoundingClientRect().width / 100;
exports.vw = vw;
},{}],"src/sprites/player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var context = document.querySelector("canvas").getContext("2d");
var player = {
  height: 32,
  width: 32,
  color: "#ff0000",
  type: "rect",
  tag: "player",
  inAir: false,
  firstJump: false,
  secondJump: false,
  x: 0,
  xVelocity: 0,
  y: context.canvas.height - 16,
  yVelocity: 0,
  bounds: {
    centerX: 0
  }
};
exports.player = player;
},{}],"src/sprites/coins.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var coins = [{
  height: 21,
  width: 32,
  image: document.getElementById("coin"),
  frame: 0,
  counter: 0,
  maxCounter: 3,
  maxFrames: 8,
  type: "image",
  tag: "coin",
  rank: 0,
  x: 0,
  xVelocity: 0,
  y: 0,
  yVelocity: 0,
  bounds: {
    centerX: 0
  }
}, {
  height: 21,
  width: 32,
  image: document.getElementById("coin"),
  frame: 0,
  counter: 0,
  maxCounter: 3,
  maxFrames: 8,
  type: "image",
  tag: "coin",
  rank: 1,
  x: 200,
  xVelocity: 0,
  y: 0,
  yVelocity: 0,
  bounds: {
    centerX: 0
  }
}, {
  height: 21,
  width: 32,
  image: document.getElementById("coin"),
  frame: 0,
  counter: 0,
  maxCounter: 3,
  maxFrames: 8,
  type: "image",
  tag: "coin",
  rank: 2,
  x: 400,
  xVelocity: 0,
  y: 0,
  yVelocity: 0,
  bounds: {
    centerX: 0
  }
}];
exports.coins = coins;
},{}],"src/canvas/canvas.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var viewport_1 = require("../viewport/viewport");

var context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 80 * viewport_1.vh;
context.canvas.width = 90 * viewport_1.vw;
var background = {
  height: context.canvas.height,
  width: context.canvas.width,
  color: "#202020",
  type: "rect",
  x: 0,
  y: 0,
  centerX: context.canvas.width / 2,
  centerY: context.canvas.height / 2
};
exports.background = background;
var ground = {
  thickness: 4,
  color: "#55ff55",
  type: "line",
  xStart: 0,
  yStart: context.canvas.height - 16,
  xEnd: context.canvas.width,
  yEnd: context.canvas.height - 16
};
exports.ground = ground;
},{"../viewport/viewport":"src/viewport/viewport.ts"}],"src/sprites/platforms.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var context = document.querySelector("canvas").getContext("2d");
var platforms = [{
  height: 32,
  width: 128,
  color: "#55ff55",
  type: "rect",
  tag: "platform",
  x: context.canvas.width * 0.3333,
  y: context.canvas.height / 2,
  xVelocity: 0,
  yVelocity: 0,
  bounds: {
    bottom: 0,
    left: 0,
    top: 0,
    right: 0
  }
}, {
  height: 32,
  width: 128,
  color: "#55ff55",
  type: "rect",
  tag: "platform",
  x: context.canvas.width * 0.6666,
  y: context.canvas.height / 2 - 48,
  xVelocity: 0,
  yVelocity: 0,
  bounds: {
    bottom: 0,
    left: 0,
    top: 0,
    right: 0
  }
}, {
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
}];
exports.platforms = platforms;

var randomColor = function randomColor() {
  var r = Math.floor(Math.random() * 200 + 1);
  var g = Math.floor(Math.random() * 200 + 1);
  var b = Math.floor(Math.random() * 200 + 1);
  return "rgb(" + r + ", " + g + ", " + b + ")";
};

exports.randomColor = randomColor;
},{}],"src/controller/controller.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var context = document.querySelector("canvas").getContext("2d");
var controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function keyListener(event) {
    var isKeyPressed = event.type === "keydown" ? true : false;

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
exports.controller = controller;
},{}],"src/engine/score.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var viewport_1 = require("../viewport/viewport");

var score = {
  numValue: 0,
  textValue: "000000",
  type: "text",
  tag: "score",
  text: "Score: 000000",
  font: 8 * viewport_1.vh + "px Indie Flower, cursive",
  color: "#55ff55",
  x: 2 * viewport_1.vw,
  y: 10 * viewport_1.vh
};
exports.score = score;

var updateScore = function updateScore(collectible) {
  if (collectible.tag === "coin") {
    collectible.x = -50;
    score.numValue = score.numValue + 10;
    score.textValue = String(score.numValue);

    for (var i = score.textValue.length; i < 6; i++) {
      score.textValue = "0" + score.textValue;
    }

    score.text = "Score: " + score.textValue;
  }
};

exports.updateScore = updateScore;
},{"../viewport/viewport":"src/viewport/viewport.ts"}],"src/sounds/sounds.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function muteMe(elem) {
  if (!elem.muted) {
    elem.muted = true;
    elem.pause();
  } else {
    elem.muted = false;
  }
}

function changeBtnHtml() {
  var muteBtn = document.getElementById("muteBtn");

  if (muteBtn.innerHTML === "Sound: OFF") {
    muteBtn.innerHTML = "Sound: ON";
  } else {
    muteBtn.innerHTML = "Sound: OFF";
  }
}

function mutePage() {
  document.querySelectorAll("video, audio").forEach(function (elem) {
    return muteMe(elem);
  });
  changeBtnHtml();
}

exports.mutePage = mutePage;
},{}],"src/engine/engine.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var viewport_1 = require("../viewport/viewport");

var player_1 = require("../sprites/player");

var coins_1 = require("../sprites/coins");

var canvas_1 = require("../canvas/canvas");

var platforms_1 = require("../sprites/platforms");

var controller_1 = require("../controller/controller");

var score_1 = require("./score");

var sounds_1 = require("../sounds/sounds");

var environment;
sounds_1.mutePage();
var music = document.getElementById("music");
var coinAudio = [document.getElementById("coinAudio1"), document.getElementById("coinAudio2"), document.getElementById("coinAudio3")];
var settings = {
  playerSpeed: 0.5,
  jumpHeight: -10 * viewport_1.vh,
  secondJumpHeight: -7 * viewport_1.vh,
  maxJump: -40,
  maxSpeed: 20,
  gravity: 0.3 * viewport_1.vh,
  friction: 0.9
};
var context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 80 * viewport_1.vh;
context.canvas.width = 90 * viewport_1.vw;

var landingActions = function landingActions() {
  player_1.player.inAir = false;
  player_1.player.firstJump = false;
  player_1.player.secondJump = false;
  player_1.player.yVelocity = 0;
};

var draw = function draw(sprite) {
  //draw rectangle
  if (sprite.type === "rect") {
    context.beginPath();
    context.fillStyle = sprite.color;
    context.rect(sprite.x, sprite.y, sprite.width, sprite.height);
    context.fill();
  } //draw lines


  if (sprite.type === "line") {
    context.beginPath();
    context.strokeStyle = sprite.color;
    context.lineWidth = sprite.thickness;
    context.moveTo(sprite.xStart, sprite.yStart);
    context.lineTo(sprite.xEnd, sprite.yEnd);
    context.stroke();
  } // draw images


  if (sprite.type === "image") {
    var image = sprite.image,
        width = sprite.width,
        height = sprite.height,
        frame = sprite.frame,
        maxFrames = sprite.maxFrames,
        counter = sprite.counter,
        maxCounter = sprite.maxCounter,
        x = sprite.x,
        y = sprite.y;
    context.drawImage(image, width * frame, 0, width, height, x, y, width, height);
    sprite.counter++;

    if (counter >= maxCounter) {
      sprite.frame++;
      sprite.counter = 0;
    }

    if (frame > maxFrames - 1) {
      sprite.frame = 0;
    }
  } // draw text


  if (sprite.type === "text") {
    var text = sprite.text,
        font = sprite.font,
        x = sprite.x,
        y = sprite.y;
    context.font = font;
    context.fillStyle = sprite.color;
    context.fillText(text, x, y);
  }
}; //returns top bottom right and left of an object


var getBounds = function getBounds(unit) {
  unit.bounds = {
    centerX: unit.x + unit.width / 2,
    caneterY: unit.y + unit.height / 2,
    top: unit.y,
    bottom: unit.y + unit.height,
    right: unit.x + unit.width,
    left: unit.x
  };
};

var reactToCollision = function reactToCollision(p, plat) {
  var rightOffset = plat.bounds.right - p.bounds.left;
  var leftOffset = p.bounds.right - plat.bounds.left;
  var topOffset = p.bounds.bottom - plat.bounds.top;
  var bottomOffset = plat.bounds.bottom - p.bounds.top;

  if (plat.tag === "enemy") {
    p.color = "#fff";
  }

  var largest = Math.min.apply(Math, [rightOffset, leftOffset, topOffset, bottomOffset]);

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

var detectCollision = function detectCollision(p) {
  //loop through platforms and check each
  getBounds(p);
  environment.map(function (plat) {
    if (p !== plat) {
      getBounds(plat);

      if (p.bounds.top > plat.bounds.bottom || p.bounds.right < plat.bounds.left || p.bounds.bottom < plat.bounds.top || p.bounds.left > plat.bounds.right) {} else if (plat.tag === "platform") {
        reactToCollision(p, plat);
      } else if (plat.tag === "coin") {
        score_1.updateScore(plat);
        coinAudio[plat.rank].volume = 0.4;
        coinAudio[plat.rank].play();
      }
    }
  });
};

var movement = function movement() {
  //this moves the platforms
  environment.map(function (plat) {
    plat.x += player_1.player.xVelocity;

    if (plat.x < plat.width * -1) {
      plat.x = context.canvas.width;
      plat.y = Math.random() * context.canvas.height - 16 - plat.height;

      if (plat.y < 0) {
        plat.y = 0;
      }

      detectCollision(plat);

      if (plat.tag === "platform") {
        plat.width = Math.random() * context.canvas.height / 2;
        plat.color = platforms_1.randomColor();
      }

      if (plat.width < 32 && plat.tag === "platform") {
        plat.width = 32;
      }
    } else if (plat.x > context.canvas.width) {
      plat.x = -32;
      plat.y = Math.random() * context.canvas.height - 16 - plat.height;

      if (plat.tag === "platform") {
        plat.width = Math.random() * context.canvas.height / 2;
        plat.color = platforms_1.randomColor();
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

environment = platforms_1.platforms.map(function (x) {
  return x;
});
coins_1.coins.map(function (coin) {
  return environment.push(coin);
});

var loop = function loop() {
  var playerSpeed = settings.playerSpeed,
      maxSpeed = settings.maxSpeed,
      jumpHeight = settings.jumpHeight,
      secondJumpHeight = settings.secondJumpHeight,
      maxJump = settings.maxJump,
      gravity = settings.gravity,
      friction = settings.friction;

  if (player_1.player.yVelocity <= maxJump) {
    player_1.player.yVelocity = maxJump;
  }

  if (controller_1.controller.up && player_1.player.firstJump === false && player_1.player.inAir === false) {
    player_1.player.yVelocity = jumpHeight;
    player_1.player.inAir = true;
  }

  if (!controller_1.controller.up && player_1.player.firstJump === false) {
    player_1.player.firstJump = true;
  }

  if (controller_1.controller.up && player_1.player.firstJump === true && player_1.player.secondJump === false) {
    player_1.player.yVelocity = secondJumpHeight;
    player_1.player.secondJump = true;
  }

  if (controller_1.controller.left) {
    if (player_1.player.xVelocity < 0) {
      player_1.player.xVelocity *= friction;
    }

    player_1.player.xVelocity += playerSpeed;
  }

  if (controller_1.controller.right) {
    if (player_1.player.xVelocity > 0) {
      player_1.player.xVelocity *= friction;
    }

    player_1.player.xVelocity -= playerSpeed;
  } //this moves the player


  player_1.player.yVelocity += gravity;
  player_1.player.y += player_1.player.yVelocity;
  player_1.player.yVelocity *= friction;

  if (player_1.player.bounds.centerX > canvas_1.background.centerX || player_1.player.bounds.centerX < canvas_1.background.centerX) {
    player_1.player.x = context.canvas.width / 2 + player_1.player.width / 2;
  } //this moves platforms


  movement(); //max speed

  if (player_1.player.xVelocity > maxSpeed || player_1.player.xVelocity < maxSpeed * -1) {
    if (player_1.player.xVelocity > maxSpeed) {
      player_1.player.xVelocity = maxSpeed;
    } else {
      player_1.player.xVelocity = maxSpeed * -1;
    }
  } //friction when player stops moving only


  if (!controller_1.controller.left && !controller_1.controller.right) {
    player_1.player.xVelocity *= friction;
  } // don't allow player below ground level


  if (player_1.player.y > context.canvas.height - 18 - player_1.player.height) {
    landingActions();
    player_1.player.y = context.canvas.height - 18 - player_1.player.height;
  }

  detectCollision(player_1.player);
  draw(canvas_1.background);
  draw(player_1.player);
  draw(canvas_1.ground);
  platforms_1.platforms.map(function (plat) {
    draw(plat);
  });
  coins_1.coins.map(function (coin) {
    return draw(coin);
  });
  draw(score_1.score); // draw(spikes[0]);
  // update when browser will draw again

  music.play();
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller_1.controller.keyListener);
window.addEventListener("keyup", controller_1.controller.keyListener);

window.onload = function () {
  window.requestAnimationFrame(loop);
};
},{"../viewport/viewport":"src/viewport/viewport.ts","../sprites/player":"src/sprites/player.ts","../sprites/coins":"src/sprites/coins.ts","../canvas/canvas":"src/canvas/canvas.ts","../sprites/platforms":"src/sprites/platforms.ts","../controller/controller":"src/controller/controller.ts","./score":"src/engine/score.ts","../sounds/sounds":"src/sounds/sounds.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./src/engine/engine");

var sounds_1 = require("./src/sounds/sounds"); //add event listeners


var muteBtn = document.getElementById("muteBtn");
muteBtn.addEventListener("click", sounds_1.mutePage);
console.log(muteBtn);
},{"./src/engine/engine":"src/engine/engine.ts","./src/sounds/sounds":"src/sounds/sounds.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35625" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map