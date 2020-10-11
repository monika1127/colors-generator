const container = document.querySelector('.container')
let panels = new Array(5).fill(undefined)

// html structure for each panel
const pannelStructureHtml = `
<div class="panel__left">
    <div class="left__add-panel">
        <img src="icons/SVG/plus.svg" alt="add" />
    </div>
</div>
<div class="panel__main">
    <div class="actions__list">
        <div class="actions__list-element remove">

        </div>
        <div class="actions__list-element copy">
            <img src="icons/SVG/copy.svg" alt="copy" />
        </div>
        <div class="actions__list-element drag">
            <img src="icons/SVG/tab.svg" alt="drag" />
        </div>
        <div class="actions__list-element lock">
            <img src="icons/SVG/unlocked.svg" alt="paddle" />
        </div>
        <div class="actions__list-element shades">
            <img src="icons/SVG/table2.svg" alt="shades" />
        </div>
    </div>
    <div class="colorname"></div>
</div>

<div class="panel__right">
    <div class="right__add-panel">
        <img src="icons/SVG/plus.svg" alt="add" />
    </div>
</div>`

//div creation

//rnadom function
function randomize (min, max){
    const randomValue = min + Math.floor((max-min)*Math.random())
        return  randomValue
}
//random color generation
function randomizeColor(){
    const hue = randomize(0, 360)
    const saturation = randomize(0, 100)
    const lightness = randomize(0, 100)
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`
    return color
}

//initial color panels
function cratePanels(){
    const panelsHtml = panels.map((el,id)=> `<div class="panel" id="panel${id}"></div>`).join('')
    container.innerHTML = panelsHtml
    const panel = container.querySelectorAll('.panel')
    panel.forEach((p)=>p.style.backgroundColor = `${randomizeColor()}`)







}


function cratePalet(e){
    if(e.keyCode ===32){
        cratePanels()
    }
}


window.addEventListener('keyup', cratePalet)


