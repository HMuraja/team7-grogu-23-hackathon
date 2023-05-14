"use strict";
const fightingField = document.getElementById("fighting-point-field");
const villainModalBoddy = document.querySelector("#villain-modal-boddy");
// this is a a file that deals with villain modifications

// ..............................................................................................

let currentVillainData = {};

const villainlist = [
  {
    name: "Darth Veder",
    picture: "link to the picture",
    description: "Comander of sith",
    strongAgainst: "Prefairs Blue and Red",
    colorProcentages: {
      red: 30,
      blue: 30,
      green: 20,
      yellow: 20,
      black: 0,
    },
    rewardProcentage: { color: 50, black: 20, health: 10, extraStorage: 20 },
    colorReward: { red: 25, blue: 30, green: 10, yellow: 35 },
    minimum: 5,
    maximum: 7,
  },
  {
    name: "Emperor Palpatine",
    picture: "link to the picture2",
    description: "Living a double life",
    strongAgainst: "Prefairs Green and Yellow",
    colorProcentages: {
      red: 15,
      blue: 10,
      green: 40,
      yellow: 35,
      black: 0,
    },
    rewardProcentage: { color: 50, black: 20, health: 10, extraStorage: 20 },
    colorReward: {
      red: 25,
      blue: 30,
      green: 10,
      yellow: 35,
    },
    minimum: 5,
    maximum: 7,
  },
  {
    name: "General Grievous",
    picture: "link to the picture3",
    description: "Notorious for visual design and powerful presence",
    strongAgainst: "Preferes Yellow and Red",
    colorProcentages: {
      red: 35,
      blue: 10,
      green: 10,
      yellow: 45,
      black: 0,
    },
    rewardProcentage: { color: 30, black: 20, health: 40, extraStorage: 10 },
    colorReward: {
      red: 35,
      blue: 20,
      green: 10,
      yellow: 35,
    },
    minimum: 5,
    maximum: 7,
  },
  {
    name: "Darth Maul",
    picture: "link to the picture4",
    description: "Always looking for a master",
    strongAgainst: "Prefairs Green and blue",
    colorProcentages: {
      red: 15,
      blue: 30,
      green: 40,
      yellow: 15,
      black: 0,
    },
    rewardProcentage: { color: 30, black: 30, health: 10, extraStorage: 10 },
    colorReward: {
      red: 15,
      blue: 30,
      green: 30,
      yellow: 25,
    },
    minimum: 5,
    maximum: 7,
  },
];

/**
 * chooses villian randomly from the list provided
 * pushes two villian onto the choice list
 */
let villianChoice = [];
function choseRandomVillain() {
  villianChoice = [];
  for (let i = 0; i < 2; i++) {
    villianChoice.push(villainlist[randomInt(0, villainlist.length - 1)]);
  }
}

function renderVillainModal() {
  villainModalBoddy.inner = "";
  choseRandomVillain();
  for (let i = 0; i < villianChoice.length; i++) {
    const mainDiv = document.createElement("a");
    const pictureDiv = document.createElement("div");
    const descriptionDiv = document.createElement("div");
    mainDiv.setAttribute("onclick", `renderVillian(${i})`);
    mainDiv.classList.add("villain-modal-description");

    descriptionDiv.innerHTML = villianChoice[i].description;

    mainDiv.appendChild(pictureDiv);
    mainDiv.appendChild(descriptionDiv);
    villainModalBoddy.appendChild(mainDiv);
  }
}
renderVillainModal();

function renderVillian(index) {
  currentVillainData = villianChoice[index];
  renderVillianGameProfile();
  const sizeArray = decideRectangleSize(); // Change later
  generateVillainGameStats(sizeArray);
  generateVillianNumbers();
  renderFightingPointRectangle();
}

function renderVillianGameProfile() {
  let villianImage = document.getElementById("villian-image");
  let villianDescription = document.getElementById("villian-description");
  villianImage.innerHTML = currentVillainData.picture;
  villianDescription.innerHTML = currentVillainData.description;
}

function decideRectangleSize() {
  const randomBaseNumber = randomInt(currentVillainData.minimum, currentVillainData.maximum);
  let villainfightingPoint = currentGameSettings.level * 2 + randomBaseNumber;

  let squareSize = [];
  while (villainfightingPoint > 0) {
    let randomSize;
    if (villainfightingPoint > 3) {
      randomSize = randomInt(1, 4);
    } else {
      randomSize = randomInt(1, villainfightingPoint);
    }
    squareSize.push(randomSize);
    villainfightingPoint -= randomSize;
  }
  return squareSize;
}

function generateVillainGameStats(array) {
  currentVillainData.squareSizes = array;
  currentVillainData.colorChoices = [];
  const red = currentVillainData.colorProcentages.red;
  const blue = currentVillainData.colorProcentages.blue;
  const green = currentVillainData.colorProcentages.green;
  const yellow = currentVillainData.colorProcentages.yellow;
  for (let i = 0; i < array.length; i++) {
    const randomNo = randomInt(0, 100);

    let color;
    if (randomNo < red) {
      color = "red";
    } else if (randomNo < red + blue) {
      color = "blue";
    } else if (randomNo < red + blue + green) {
      color = "green";
    } else if (randomNo < red + blue + green + yellow) {
      color = "yellow";
    } else {
      color = "black";
    }
    currentVillainData.colorChoices.push(color);
  }
}

function generateVillianNumbers() {
  const data = currentVillainData.squareSizes;
  currentVillainData.fightingNumbers = [];
  for (let i = 0; i < data.length; i++) {
    currentVillainData.fightingNumbers.push(randomInt(data[i], data[i] * 6));
  }
}

function renderFightingPointRectangle() {
  const dataNumbers = currentVillainData.fightingNumbers;
  const dataSquares = currentVillainData.squareSizes;
  const dataColors = currentVillainData.colorChoices;
  let renderData = "";
  for (let i = 0; i < dataNumbers.length; i++) {
    renderData += ` <div class="size-${dataSquares[i]} ${dataColors[i]}-area" data-area-no="${dataNumbers[i]}"></div>`;
  }
  fightingField.innerHTML = renderData;
}
