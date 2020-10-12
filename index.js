import copy from "./icons/SVG/copy.svg";
import add from "./icons/SVG/plus.svg";
import drag from "./icons/SVG/tab.svg";
import remove from "./icons/SVG/bin2.svg";
import unlock from "./icons/SVG/unlocked.svg";
import shades from "./icons/SVG/table2.svg";
import lock from "./icons/SVG/lock.svg";

// html structure for each panel
const panelStructureHtml = (c, i) => `
<div class="panel__left">
<div class="left__add-button">
<img src=${add} alt="add" data-type="add_left" id="${i}"/>
</div>
</div>
<div class="panel__main">
<div class="actions__list">
<div class="actions__list-element remove">
<img src=${remove} alt="remove" data-type="remove" id="${i}"/>
</div>
<div class="actions__list-element copy">
<img src=${copy} alt="copy" data-type="copy" id="${i}"/>
</div>
<div class="actions__list-element drag">
<img src=${drag} alt="drag" data-type="drag" id="${i}"/>
</div>
<div class="actions__list-element paddle unlocked">
<img src=${unlock} alt="paddle" data-type="paddle" id="${i}"/>
</div>
<div class="actions__list-element shades">
<img src=${shades} alt="shades" data-type="shades" id="${i}"/>
</div>
</div>
<div class="colorname">to be defined</div>
</div>

<div class="panel__right">
<div class="right__add-button">
<img src=${add} alt="add" data-type="add_right" id="${i}"/>
</div>
</div>`;
const container = document.querySelector(".container");

let panels = new Array(5).fill(randomizeColor());

//rnadom function
function randomize(min, max) {
  return min + Math.floor((max - min) * Math.random());
}
//random color generation
function randomizeColor() {
  const hue = randomize(0, 360);
  const saturation = randomize(0, 100);
  const lightness = randomize(0, 100);
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return color;
}

//initial color panels
function cratePanels() {
  const panelsHtml = panels
    .map((el, id) => `<div class="panel" id="panel${id}"></div>`)
    .join("");
  container.innerHTML = panelsHtml;
  const panel = container.querySelectorAll(".panel");
  panel.forEach((p) => (p.style.backgroundColor = `${randomizeColor()}`));
  panel.forEach((p, i) => (p.innerHTML = panelStructureHtml(i)));
  // actionsListUpload()
  // console.log(removeButton )
  // return removeButton
}

function cratePalet(e) {
  if (e.keyCode === 32) {
    cratePanels();
  }
}

function removePanel() {
  console.log("you clicked remove panel button");
}

function actions(e) {
  console.log(e.path[0].id);
  if (e.target === container) return;
  console.log(e.currentTarget);
  console.log(e.target);
  const el = e.target;
  let clickedPanel = this.querySelector(".panel");
  console.log(clickedPanel);
}

window.addEventListener("keyup", cratePalet, { capture: false });
container.addEventListener("click", actions);
