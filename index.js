import hslToHex from "hsl-to-hex";
import copy from "copy-to-clipboard";
import copyIcon from "./icons/SVG/copy.svg";
import addIcon from "./icons/SVG/plus.svg";
import dragIcon from "./icons/SVG/tab.svg";
import removeIcon from "./icons/SVG/bin2.svg";
import unlockIcon from "./icons/SVG/unlocked.svg";
import shadesIcon from "./icons/SVG/table2.svg";
import lockIcon from "./icons/SVG/lock.svg";

// html structure for each panel

const createPanel = (c, i, l) => `
<div class="panel" style="background-color: hsl(${c.hue},${c.saturation}%, ${c.lightness}%)" id="${i}" draggable="false">
    <div class="panel__left">
        <div class="left__add-button" data-type="add_left" id="${i}">
            <img src=${addIcon} alt="add" draggable="false" data-type="add_left" id="${i}"/>
        </div>
    </div>
    <div class="panel__main">
        <div class="actions__list">
        <div class="actions__list-element remove">
            <img src=${removeIcon} alt="remove" draggable="false" data-type="remove" id="${i}"/>
        </div>
        <div class="actions__list-element copy">
            <img src=${copyIcon} alt="copy" draggable="false" data-type="copy" id="${i}" data-color="${c.hex}"/>
        </div>
        <div class="actions__list-element drag">
            <img src=${dragIcon} alt="drag"  draggable="false" data-type="drag" id="${i}"/>
        </div>
        <div class="actions__list-element paddle unlocked">
            <img src=${l ? lockIcon : unlockIcon} alt="padlock" draggable="false" data-type="padlock" id="${i}"/>
        </div>
        <div class="actions__list-element shades">
            <img src=${shadesIcon} alt="shades" draggable="false" data-type="shades" id="${i}"/>
        </div>
        </div>
        <div class="colorname" style="color:${c.fontColor}">${c.hex}</div>
    </div>

    <div class="panel__right">
        <div class="right__add-button" data-type="add_right" id="${i}">
            <img src=${addIcon} alt="add" draggable="false" data-type="add_right" id="${i}"/>
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
    const hex = hslToHex(hue, saturation, lightness).toUpperCase()
    let fontColor
    if (lightness > 50) { fontColor = 'black' } else { fontColor = "white" }
    const color = { hue, saturation, lightness, hex, fontColor }

    return color;

}

function fillArrayWithColors() {
    const newPanels = panels.map((p) => p== undefined || p.lock == false ? ({ lock: false, color: randomizeColor() }) : p)
    panels = newPanels
}

//initial color panels
function createPanels() {

    const panelsHtml = panels.map((panel, id) => createPanel(panel.color, id, panel.lock)).join('')
    container.innerHTML = panelsHtml;
    // actionsListUpload()
}

function cratePalet(e) {
    if (e.keyCode === 32) {
        fillArrayWithColors()
        createPanels();
    }
}

function actions(e) {
    const { dataset, id } = e.path[0];

    switch (dataset.type) {
        case 'add_left':
            if (panels.length < 8) {
                panels.splice(id, 0, { lock: false, color: randomizeColor() })
                createPanels()
            }
            break
        case 'add_right':
            if (panels.length < 8) {
                panels.splice(id + 1, 0, { lock: false, color: randomizeColor() })
                createPanels()
            }
            break
        case 'remove':
            if (panels.length > 1) {
                panels.splice(id, 1)
                createPanels()
            }
            break

        case 'copy':
            copy(dataset.color)
            break

        case 'padlock':
            panels[id].lock = !panels[id].lock
            console.log(panels[id].lock)
            createPanels()
    }
}


//function for movig color panels
function dranAndDrop(e) {
    const { dataset, id } = e.path[0];
    if (dataset.type != 'drag') return;

    let clickedPanel = e.path[4]
    let movedPanelId = clickedPanel.id
    let overElementId

    clickedPanel.draggable = 'true'
    const panelsElements = Array.from(container.querySelectorAll('.panel'))

    clickedPanel.addEventListener('dragstart', () => { })
    clickedPanel.addEventListener('dragend', () => {
        const panelsCopy = panels
        const removedPanel = panelsCopy.splice(movedPanelId, 1)
        panelsCopy.splice(overElementId, 0, removedPanel[0])
        panels = panelsCopy
        createPanels()

    });
    // function to find out over which element there is a mouse
    container.addEventListener('dragover', (e) => {
        e.preventDefault()
        const panelsPosition = panelsElements.map((p) => ({ left: `${p.offsetLeft}`, right: `${p.offsetLeft + p.offsetWidth}`, id: `${p.id}` }))
        let mousePosition = e.pageX

        panelsPosition.forEach((el) => {
            if (mousePosition > el.left && mousePosition < el.right) {
                return overElementId = el.id
            }
        })
    });

}




window.addEventListener("keyup", cratePalet);
container.addEventListener("click", actions);
container.addEventListener("mousedown", dranAndDrop);