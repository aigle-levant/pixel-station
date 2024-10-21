//needed element
let canvas = document.querySelector('.canvas');

//base values
const BASE_COLOUR = '#fff';
canvas.style.backgroundColor = BASE_COLOUR;
const BASE_SIZE = 16;

//set values
let currentColour = BASE_COLOUR;
let currentSize = BASE_SIZE;
let isRGBMode = false;

//other elements
let penColour = document.querySelector('#pen-color');
let bgColour = document.querySelector('#bg-color');
let gridSlider = document.querySelector('#grid-slider');
let eraser = document.querySelector('.eraser');
let rgb = document.querySelector('.rgb');
let reset = document.querySelector('.reset');
let save = document.querySelector('.save');

//starting the website's actions
window.onload = () =>
{
    createGrid(BASE_SIZE);
};

//creating grid
function createGrid(size)
{
    //set grid rows and columns
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    //for loop to create each div
    for (let i=0; i<size*size; i++)
    {
        let pixel = document.createElement('div');
        pixel.setAttribute('class', 'pixel');
        pixel.addEventListener('mouseover', changeColour);
        canvas.appendChild(pixel);
    }
}
//paint background
function changeColour(e)
{
    if (isRGBMode)
    {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
    else
    {
        e.target.style.backgroundColor = currentColour;
    }
}

rgb.onclick = () =>
{
    isRGBMode = true;
};

//set pen colour
penColour.oninput = (e) =>
{
    isRGBMode = false;
    currentColour = e.target.value 
};

//set background colour
bgColour.oninput = (e) => { canvas.style.backgroundColor = e.target.value };

//set eraser
eraser.onclick = (e) =>
{
    isRGBMode = false;
    currentColour = '#fff'
};

//set size
gridSlider.oninput = (e) => changeSize(e.target.value);
function changeSize(requiredSize)
{
    currentSize = requiredSize;
    resetGrid();
}

//reset canvas to default values
reset.onclick = resetGrid;
function resetGrid()
{
    canvas.innerHTML = '';
    createGrid(currentSize);
    penColour.value = "#000";
    bgColour.value = "#fff";
    canvas.style.backgroundColor = "#fff";
    //also add default size after creating grid function
}

//save canvas
save.onclick = () =>
{
    html2canvas(canvas).then((canvas) =>
    {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'pixel-art.png';
        link.click();
    });
};
