import copy from "./icons/SVG/copy.svg";
import add from "./icons/SVG/plus.svg";
import drag from "./icons/SVG/tab.svg";
import remove from "./icons/SVG/bin2.svg";
import unlock from "./icons/SVG/unlocked.svg";
import shades from "./icons/SVG/table2.svg";
import lock from "./icons/SVG/lock.svg";

// html structure for each panel

const createPanel = (c, i) => `
<div class="panel" style="background-color: ${c}" id="panel-${i}">
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
    </div>
</div>`;

const container = document.querySelector(".container");

// {color: 'some color', lock: true | false}
let panels = new Array(5).fill();

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

function fillArrayWithColors() {
    const newPanels = panels.map(() => ({ lock: false, color: randomizeColor() }))
    panels = newPanels
}

//initial color panels
function createPanels() {
    const panelsHtml = panels.map((panel, id) => createPanel(panel.color, id)).join('')
    container.innerHTML = panelsHtml;
    // actionsListUpload()
}

function cratePalet(e) {
    if (e.keyCode === 32) {
        fillArrayWithColors()
        createPanels();
    }
}

function removePanel() {
    console.log("you clicked remove panel button");
}

function actions(e) {
    const { dataset, id } = e.path[0];

    switch (dataset.type) {
        case 'add_left': {
            panels.splice(id, 0, { lock: false, color: randomizeColor() })
            createPanels()
        }
    }

}

window.addEventListener("keyup", cratePalet);
container.addEventListener("click", actions);
