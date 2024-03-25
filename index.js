const clearBtn = document.querySelector(".clear-btn");
const gridBtn = document.querySelector(".grid-btn");
const randomBtn = document.querySelector(".random-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const gridContainer = document.querySelector(".grid-container");
const gridContainerDimension = gridContainer.clientWidth;
const sliderLabel = document.querySelector("label");
const sliderInput = document.querySelector("#slider-input");
const colorPicker = document.querySelector("#color-picker");

const grids = [];
let numOfGridEachRow = 16;
let isDrawing = false;
let defaultColor = "black";
let hasGrid = true;
let isRandom = false;
let isEraser = false;

function createGrid() {
  const fragment = document.createDocumentFragment();
  const totalNumofGrids = numOfGridEachRow * numOfGridEachRow;

  sliderLabel.textContent = `${numOfGridEachRow} * ${numOfGridEachRow} grids`;
  for (let i = 0; i < totalNumofGrids; i++) {
    const grid = document.createElement("div");
    const gridDimension = gridContainerDimension / numOfGridEachRow;

    grid.style.cssText = `width: ${gridDimension}px; height: ${gridDimension}px; cursor: pointer;`;

    if (hasGrid) grid.style.border = "1px solid lightgrey";

    fragment.appendChild(grid);
    grids.push(grid);
  }
  gridContainer.appendChild(fragment);
}

function setBackgroundColor(event) {
  let color;

  if (isDrawing) {
    const curBrightness = event.target.style.filter || "100";
    const curBrightnessValue = curBrightness.replace(/\D/g, "");

    if (event.target.classList.contains("painted") && !isEraser) {
      event.target.style.filter = `brightness(${curBrightnessValue - 10}%)`;
    } else {
      event.target.style.filter = `brightness(100%)`;
    }

    if (isRandom)
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    else if (isEraser) color = "";
    else color = defaultColor;

    event.target.classList.add("painted");
    event.target.style.backgroundColor = color;
  }
}

function removeGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function toggleGridLine() {
  for (let grid of grids) {
    if (hasGrid) {
      grid.style.border = "1px solid lightgrey";
    } else {
      grid.style.border = "none";
    }
  }
}

function handleGridEvent() {
  gridContainer.addEventListener("click", (event) => {
    isDrawing = !isDrawing;
    if (!event.target.classList.contains("grid-container")) {
      if (isRandom)
        event.target.style.backgroundColor = `#${Math.floor(
          Math.random() * 16777215,
        ).toString(16)}`;
      else if (isEraser) event.target.style.backgroundColor = "";
      else event.target.style.backgroundColor = defaultColor;
    }
  });
  gridContainer.addEventListener("mouseover", setBackgroundColor);
  gridContainer.addEventListener("mouseleave", () => {
    isDrawing = false;
  });
}

function disableRandom() {
  isRandom = false;
  if (randomBtn.classList.contains("selected")) {
    randomBtn.classList.remove("selected");
  }
}

function disableEraser() {
  isEraser = false;
  if (eraserBtn.classList.contains("selected")) {
    eraserBtn.classList.remove("selected");
  }
}

gridBtn.addEventListener("click", () => {
  hasGrid = !hasGrid;
  gridBtn.classList.toggle("selected");
  toggleGridLine();
});

clearBtn.addEventListener("click", () => {
  removeGrid();
  createGrid();
});

randomBtn.addEventListener("click", () => {
  isRandom = !isRandom;
  disableEraser();
  randomBtn.classList.toggle("selected");
});

eraserBtn.addEventListener("click", () => {
  isEraser = !isEraser;
  disableRandom();
  eraserBtn.classList.toggle("selected");
});

colorPicker.addEventListener("change", (event) => {
  defaultColor = event.target.value;
  disableEraser();
  disableRandom();
});

sliderInput.addEventListener("input", (event) => {
  numOfGridEachRow = event.target.value;
  removeGrid();
  createGrid();
});

createGrid();
handleGridEvent();
