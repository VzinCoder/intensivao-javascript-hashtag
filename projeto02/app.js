
const h1 = document.getElementById('titulo-produto')
const bigImg = document.getElementById('imagem-visualizacao')
const ulSelectImg = document.getElementById('selecionar-imagem')
const ulSelectColors = document.getElementById('selecao-cores')
const imgs = Array.from(ulSelectImg.querySelectorAll('img'))
const divContainerSize = document.getElementById('opcoes-tamanho')
const h2corSelecionada = document.getElementById('nome-cor-selecionada')
const main = document.querySelector('main')

let inputSelecionado = ulSelectImg.querySelector('input[checked]')


const setImg = () => {
    const idlittleImg = `${inputSelecionado.id}-miniatura`
    const littleImg = document.getElementById(idlittleImg)
    bigImg.src = littleImg.src
}

const setInputSelected = (target) => {
    inputSelecionado = target
    setImg()
}


const getColorH2 = ()=>{
    const txtColor = h2corSelecionada.textContent
    const indexColor = txtColor.indexOf('-')+2
    const color = txtColor.slice(indexColor)
    return color
}

const capitalizeFirstLetter = (str) => {
    return str.replace(str[0], str[0].toUpperCase());
};

const setColorTxt = (color) => {
    const previousColorH2 = getColorH2();
    const txtColor = h2corSelecionada.textContent;
    const newTxtColor = txtColor.replace(previousColorH2, color);
    
    h2corSelecionada.textContent = newTxtColor;

    const txtColorH1 = h1.textContent;
    const colorH1 = previousColorH2.toLowerCase();
    const newColorH1 = color.toLowerCase();

    h1.textContent = txtColorH1.replace(colorH1, newColorH1);
};


const getColorName = ({ src }) => {
    const initialIndex = src.lastIndexOf('/') + 1
    const finalIndex = src.lastIndexOf('.')
    const colorName = src.slice(initialIndex, finalIndex)
    return colorName
}

const setColorImg = (colorName) => {
    imgs.forEach((img, index) => {
        img.src = `./imagens/opcoes-cores/imagens-${colorName}/imagem-${index}.jpeg`
    })
}


const handleInput = (target) => {
    const imgColor = target.nextElementSibling.children[0];
    const colorName = getColorName(imgColor);
    const formattedColorName = capitalizeFirstLetter(colorName);
    
    setColorTxt(formattedColorName);
    setColorImg(colorName);
    setImg();
};

const getSize = (target) => {
    return target.nextElementSibling.innerText
}

const setSizeH1 = (target) => {
    const txt = getSize(target)
    const txtH1 = h1.textContent
    const pattern = /\b(?:45|41)\smm\b/g;
    const newTxth1 = txtH1.replace(pattern, () => txt);
    h1.textContent = newTxth1
}

const setSizeImg = (target) => {
    const size = getSize(target)
    const is41mm = size === '41 mm'
    if (is41mm) {
        bigImg.classList.add('caixa-pequena')
        return
    }

    bigImg.classList.remove('caixa-pequena')
}

const handleOption = ({ target }) => {
    const nameParts = target.name.split('-');
    const newName = nameParts[0] + nameParts[1]
        .replace(/^\w/, (match) => match.toUpperCase());

    const options = {
        opcaoTamanho() {
            setSizeH1(target)
            setSizeImg(target)
        },
        opcaoCor() {
            handleInput(target)
        },
        opcaoImagem() {
            setInputSelected(target)
        }
    }

    const execute = options[newName]
    execute()

}

main.addEventListener('input', handleOption)
