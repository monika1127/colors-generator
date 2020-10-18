import hslToHex from "hsl-to-hex";
import copy from "copy-to-clipboard";

import addIcon from "./icons/SVG/plus.svg";
import copyIcon from "./icons/SVG/copy.svg";
import dragIcon from "./icons/SVG/tab.svg";
import removeIcon from "./icons/SVG/bin2.svg";
import unlockIcon from "./icons/SVG/unlocked.svg";
import shadesIcon from "./icons/SVG/table2.svg";
import lockIcon from "./icons/SVG/lock.svg";

import copyIconLight from "./icons/SVG/copyLight.svg";
import dragIconLight from "./icons/SVG/tabLight.svg";
import removeIconLight from "./icons/SVG/bin2Light.svg";
import unlockIconLight from "./icons/SVG/unlockedLight.svg";
import shadesIconLight from "./icons/SVG/table2Light.svg";
import lockIconLight from "./icons/SVG/lockLight.svg";


import copyIconDark from "./icons/SVG/copyDark.svg";
import dragIconDark from "./icons/SVG/tabDark.svg";
import removeIconDark from "./icons/SVG/bin2Dark.svg";
import unlockIconDark from "./icons/SVG/unlockedDark.svg";
import shadesIconDark from "./icons/SVG/table2Dark.svg";
import lockIconDark from "./icons/SVG/lockDark.svg";

const iconsDark = {
    copyIcon: copyIconDark,
    dragIcon:dragIconDark,
    removeIcon:removeIconDark,
    unlockIcon:unlockIconDark,
    shadesIcon: shadesIconDark,
    lockIcon: lockIconDark,
 }

 const iconsLight= {
    copyIcon: copyIconLight,
    dragIcon:dragIconLight,
    removeIcon:removeIconLight,
    unlockIcon:unlockIconLight,
    shadesIcon: shadesIconLight,
    lockIcon: lockIconLight,
 }

// html structure for each panel

const createPanel = (c, i, l) => `
<div class="panel" style="background-color: hsl(${c.hue},${c.saturation}%, ${c.lightness}%); flex-basis:${panelsLength}" id="${i}" draggable="false">
    <div class="panel__left">
        <div class="left__add-button" data-type="add_left" id="${i}">
            <img src=${addIcon} alt="add" draggable="false" data-type="add_left" id="${i}"/>
        </div>
    </div>
    <div class="panel__main">
        <div class="actions__list">
        <div class="actions__list-element remove">
            <img src=${c.iconColor.removeIcon} alt="remove" draggable="false" data-type="remove" id="${i}"/>
        </div>
        <div class="actions__list-element copy">
            <img src=${c.iconColor.copyIcon} alt="copy" draggable="false" data-type="copy" id="${i}" data-color="${c.hex}"/>
        </div>
        <div class="actions__list-element drag">
            <img src=${c.iconColor.dragIcon} alt="drag"  draggable="false" data-type="drag" id="${i}"/>
        </div>
        <div class="actions__list-element padlock ${l ? 'lock' : 'unlock'}">
            <img src=${l ? c.iconColor.lockIcon : c.iconColor.unlockIcon} alt="padlock" draggable="false" data-type="padlock" id="${i}"/>
        </div>
        <div class="actions__list-element shades">
            <img src=${c.iconColor.shadesIcon} alt="" draggable="false" data-type="shades" id="${i}"/>
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
let panelsLength

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
    let iconColor
    if (lightness > 50) {
        fontColor = 'black'
        iconColor = iconsDark }
    else {
        fontColor = "white"
        iconColor = iconsLight }
    const color = { hue, saturation, lightness, hex, fontColor, iconColor}


    return color;

}

function fillArrayWithColors() {
    const newPanels = panels.map((p) => p == undefined || p.lock == false ? ({ lock: false, color: randomizeColor() }) : p)
    panels = newPanels
}

//initial color panels
function createPanels() {
    panelsLength = `${100 / panels.length}%`
    const panelsHtml = panels.map((panel, id) => createPanel(panel.color, id, panel.lock)).join('')
    container.innerHTML = panelsHtml;
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
            createPanels()

        break

        case 'shades':
            const shadesStartColor = panels[id].color
            const shadesPanel = e.path[4]
            createShadesPalet(shadesStartColor, shadesPanel)
            container.classList.add('shades-open')
        break

        case 'tone':
            const currentPanelId = e.path[2].id

            if (e.target.dataset.shadecolor > 50) {
                panels[currentPanelId].color.fontColor = 'black'
                panels[currentPanelId].color.iconColor = iconsDark }

            else {
                panels[currentPanelId].color.fontColor = "white"
                panels[currentPanelId].color.iconColor = iconsLight }

            panels[currentPanelId].color.lightness = e.target.dataset.shadecolor;
            createPanels()
            container.classList.remove('shades-open')
         break

        default:
            if (!container.classList.contains('shades-open')) return
            container.classList.remove('shades-open')
            createPanels()

        break

    }
}

function createShadesPalet(shadesStartColor, panelId) {

    //crate array of all shades

    const currenttone = Math.round(shadesStartColor.lightness / 5)
    const lightenesTones = new Array(21).fill().map((t, i) => {

        const hue = shadesStartColor.hue;
        const saturation = shadesStartColor.saturation;

        let lightness
        let cssClass

        if (i === currenttone) {
            lightness = shadesStartColor.lightness
            cssClass = 'origin__shade'
        }
        else {
            lightness = (i) * 5
            cssClass = 'notorigin__shade'
        }

        const hex = hslToHex(hue, saturation, lightness).toUpperCase()
        let fontColor
        if (lightness > 50) { fontColor = 'black' } else { fontColor = "white" }
        const shadesTones = { hue, saturation, lightness, hex, fontColor, cssClass }
        const shadesHtml =
            `<div
                class="shade__block ${cssClass}"
                style="background-color: hsl(${shadesTones.hue},${shadesTones.saturation}%, ${shadesTones.lightness}%); color:${shadesTones.fontColor}"
                data-type="tone"
                data-shadecolor="${shadesTones.lightness}">
                    ${shadesTones.hex}
            </div>`
        return shadesHtml
    })

    const shadesPanelHtml = lightenesTones.join('')
    panelId.innerHTML = `<div class="shades__container">${shadesPanelHtml}</div>`
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