// *** CONSTS ***
const startColorDiff = 255 * 255 * 255 / 32
const startSize = 2

// *** VARIABLES ***
let level = 0

const onClickHandler = (event) => {
    const win = event.target.classList.contains('squares_differentСolor')
    level = win ? ++level : 0
    const { size, differentBlockIndex, mainColor, differentColor } = generateLevel()
    render(size, differentBlockIndex, mainColor, differentColor)
}

const generateLevel = () => {
    // *** SIZE FIELD ***
    const size = 2 + Math.floor(level / 2)
    
    // *** CALC COLORS ***
    const colorDiff = level > 0
        ? Math.max(Math.floor(startColorDiff / (16 * level)), 16)
        : startColorDiff

    const mainColor = Math.floor(Math.random() * 255 * 255 * 255)
    const differentColor = mainColor > colorDiff ? mainColor - colorDiff :  mainColor + colorDiff

    // *** DIFFERENT BLOCK ***
    const differentBlockIndex = Math.floor(Math.random() * size * size)

    // *** SAVE DATA ***
    const levelData = {
        size,
        differentBlockIndex,
        mainColor: `#${mainColor.toString(16)}`,
        differentColor: `#${differentColor.toString(16)}`,
    }

    localStorage.setItem('levelData', JSON.stringify(levelData))

    return levelData
}

const render = (size, differentBlockIndex, mainColor, differentColor) => {
    document.documentElement.style.setProperty('--size', size)
    document.documentElement.style.setProperty('--main-color', mainColor)
    document.documentElement.style.setProperty('--different-color', differentColor)

    const container = document.getElementsByClassName('squares__container')[0]
    const blocksNumber = size * size
    const currentBlocksNumber = container.children.length

    if (currentBlocksNumber < blocksNumber) {
        for (let i = currentBlocksNumber; i < blocksNumber; i++) {
            const block = document.createElement('div')
            block.classList.add('squares__block')
            block.addEventListener('click', onClickHandler)
            container.appendChild(block)
        }
    } else if (currentBlocksNumber > blocksNumber) {
        for (let i = currentBlocksNumber; i > blocksNumber; i--) {
            container.removeChild(container.lastChild)
        }
    }
    
    [...container.getElementsByClassName('squares_differentСolor')].forEach(
        (block) => block.classList.remove('squares_differentСolor')
    )
    container.children[differentBlockIndex].classList.add('squares_differentСolor')
}

document.addEventListener('DOMContentLoaded', () => {
    const {
        size,
        differentBlockIndex,
        mainColor,
        differentColor
    } = localStorage.hasOwnProperty('levelData')
        ? JSON.parse(localStorage.getItem('levelData'))
        : generateLevel()

    render(size, differentBlockIndex, mainColor, differentColor)
})
