const myDomino = document.getElementById('myDomino')
const dominoScaleInput = document.getElementById('dominoScaleInput')
const dominoAminationInput = document.getElementById('dominoAminationInput')

const tileDefs = Array.from(document.querySelectorAll('symbol'))
const tileSelectorItemDef = document.getElementById('tileSelectorItem').content

const dominoTilesSelector = document.getElementById('dominoTilesSelector')

const topTile = document.getElementById('topTile')
const bottomTile = document.getElementById('bottomTile')

const topTileSelector = document.getElementById('topTileSelector')
const bottomTileSelector = document.getElementById('bottomTileSelector')

const prepareTileSelectorItem = (id) => {
    const tile = document.importNode(tileSelectorItemDef, true)
    tile.querySelector('use').setAttribute('xlink:href', '#' + id)
    return tile
}

let rotationAngle = 0
let scaleValue = 1
let animationSpeed = 1

tileDefs.forEach(tileDef => {
    topTileSelector.appendChild(prepareTileSelectorItem(tileDef.id))
    bottomTileSelector.appendChild(prepareTileSelectorItem(tileDef.id))
})

const setClickHandlers = (tileSelector, targetTile) => {
    const hrefAttribute = 'xlink:href'

    tileSelector.childNodes.forEach(el =>
        el.addEventListener(
            'click',
            e => targetTile.setAttribute(hrefAttribute, e.target.getAttribute(hrefAttribute))
        )
    )
}

setClickHandlers(topTileSelector, topTile)
setClickHandlers(bottomTileSelector, bottomTile)

dominoScaleInput.oninput = () => {
    scaleValue = dominoScaleInput.value;
    setTweenMax(myDomino, animationSpeed, rotationAngle, scaleValue);
}

dominoAminationInput.oninput = () => {
    animationSpeed = dominoAminationInput.value;
    setTweenMax(myDomino, animationSpeed, rotationAngle, scaleValue);
}


function rotateBack() {
    rotationAngle = rotationAngle - 90;
    setTweenMax(myDomino, animationSpeed, rotationAngle, scaleValue);
}

function rotateForward() {
    rotationAngle = rotationAngle + 90;
    setTweenMax(myDomino, animationSpeed, rotationAngle, scaleValue);
}

function toggleDominoTilesSelector() {
    dominoTilesSelector.hidden = !dominoTilesSelector.hidden;
}

function setTweenMax(el, speed = 1, angle = 0, scale = 1) {
    TweenMax.to(el, speed, {
        rotation: angle,
        transformOrigin: "50% 50%",
        scale: scale
    });
}