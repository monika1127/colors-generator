let panels = new Array(5).fill(undefined)
const container = document.querySelector('.container')

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
function cratePanels(){
    console.log(panels)
    const panelsHtml = panels.map((el,id)=> `<div class="panel" id="panel${id}"></div>`).join('')
    console.log(panelsHtml)
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