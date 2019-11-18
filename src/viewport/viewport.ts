const bg = document.getElementsByClassName("background")[0];

const vh = bg.getBoundingClientRect().height / 100;
const vw = bg.getBoundingClientRect().width / 100;

export { vh, vw };
