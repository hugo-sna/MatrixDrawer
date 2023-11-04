let varList = [];

const template = '0b00000000000000000000000000000000'
let tmpStr;

const colors = {
    red: 'ff0000',
    green: '00ff00',
    blue: '0000ff'
};

let selectedColor = colors.red;

function swapColor(color, element) {
    element.classList.remove('bg-black');
    element.classList.remove(`bg-[#${colors.red}]`);
    element.classList.remove(`bg-[#${colors.green}]`);
    element.classList.remove(`bg-[#${colors.blue}]`);
    element.classList.add(`bg-[#${color}]`)
}


function onPixelClick(y, x) {
    let pixel = document.getElementById(`px-${y}-${x}`);
    swapColor(selectedColor, pixel);
}

function changeSelectedColor(color) {
    let redElm = document.getElementById('red');
    let greenElm = document.getElementById('green');
    let blueElm = document.getElementById('blue');

    redElm.classList.remove('outline');
    greenElm.classList.remove('outline');
    blueElm.classList.remove('outline');

    switch (color) {
        case 'red':
            redElm.classList.add('outline');
            selectedColor = colors.red;
            break;
    
        case 'green':
            greenElm.classList.add('outline');
            selectedColor = colors.green;
            break;

        case 'blue':
            blueElm.classList.add('outline');
            selectedColor = colors.blue;
            break;
    }
}

function render() {
    for(let i = 0; i < 8; i++){
        tmpStr = template;
        for(let j = 0; j < 8; j++) {
            let element = document.getElementById(`px-${j}-${i}`);

            if(element.classList.contains(`bg-[#${colors.red}]`))
                tmpStr = setCharAt(tmpStr, 2+j, '1');
            if(element.classList.contains(`bg-[#${colors.green}]`))
                tmpStr = setCharAt(tmpStr, 10+j, '1');
            if(element.classList.contains(`bg-[#${colors.blue}]`))
                tmpStr = setCharAt(tmpStr, 18+j, '1');
        }
        varList.push(tmpStr);
    }
    tmpStr = `const int32[8] = {${varList[0]},${varList[1]},${varList[2]},${varList[3]},${varList[4]},${varList[5]},${varList[6]},${varList[7]}};`
    let resultTxtArea = document.getElementById('result');
    let shouldCopyResult = document.getElementById('cpyres').checked;
    if (shouldCopyResult) {
        navigator.clipboard.writeText(tmpStr);
    }
    resultTxtArea.value = tmpStr;
    resultTxtArea.classList.remove('hidden');
    varList = [];
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
