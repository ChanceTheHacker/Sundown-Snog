function muteMe(elem) {
  if (!elem.muted) {
    elem.muted = true;
    elem.pause();
  } else {
    elem.muted = false;
  }
}

function changeBtnHtml() {
  const muteBtn = document.getElementById("muteBtn");
  if (muteBtn.innerHTML === "Sound: OFF") {
    muteBtn.innerHTML = "Sound: ON";
  } else {
    muteBtn.innerHTML = "Sound: OFF";
  }
}

function mutePage() {
  document.querySelectorAll("video, audio").forEach(elem => muteMe(elem));
  changeBtnHtml();
}

export { mutePage };
