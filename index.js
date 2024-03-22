const clearBtn = document.querySelector(".clear-btn");
const gridContainer = document.querySelector(".grid-container");
const gridContainerDimension = gridContainer.clientWidth;
const sliderLabel = document.querySelector("label");
const sliderInput = document.querySelector("#slider-input");

const grids = [];
let numOfGridEachRow = 16;
let isDrawing = false;

function createGrid() {
  const fragment = document.createDocumentFragment();
  const totalNumofGrids = numOfGridEachRow * numOfGridEachRow;

  sliderLabel.textContent = `${numOfGridEachRow} * ${numOfGridEachRow} grids`;
  for (let i = 0; i < totalNumofGrids; i++) {
    const grid = document.createElement("p");
    const gridDimension = gridContainerDimension / numOfGridEachRow;
    grid.style.cssText = `width: ${gridDimension}px; height: ${gridDimension}px`;
    grid.style.border = "1px lightgrey solid";
    fragment.appendChild(grid);
    grids.push(grid);
  }
  gridContainer.appendChild(fragment);
}

function setBackgroundColor(event) {
  if (isDrawing) {
    const curBrightness = event.target.style.filter || "100";
    const curBrightnessValue = curBrightness.replace(/\D/g, "");
    if (event.target.classList.contains("painted")) {
      event.target.style.filter = `brightness(${curBrightnessValue - 10}%)`;
    }

    event.target.classList.add("painted");
    event.target.style.backgroundColor = "yellow";
  }
}

function removeGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function clearGrid() {
  for (const grid of grids) {
    grid.style.backgroundColor = "white";
    grid.style.filter = "none";
  }
}

function handleGridEvent() {
  gridContainer.addEventListener("click", () => (isDrawing = !isDrawing));
  gridContainer.addEventListener("mouseover", setBackgroundColor);
  gridContainer.addEventListener("mouseleave", () => {
    if (isDrawing) isDrawing = false;
  });
}

clearBtn.addEventListener("click", clearGrid);
sliderInput.addEventListener("input", (event) => {
  numOfGridEachRow = event.target.value;
  removeGrid();
  createGrid();
});

createGrid();
handleGridEvent();
