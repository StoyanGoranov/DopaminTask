const widthPositionAdd = 54;
const numberOfButtons = 5;
const numberOfReplayButtons = 2;
let buttons = [];
let replayButtons = [];

let controls = document.createElement("span");
controls.setAttribute("class", "controls");


let endGameScreen = document.createElement("div");
endGameScreen.setAttribute("class", "game-over-container");
let replay = document.createElement("div");
replay.setAttribute("class", "replay");


let healthBars = document.querySelectorAll(".health");

createButtons(buttons, controls, numberOfButtons);
createButtons(replayButtons, replay, numberOfReplayButtons);
addReplayEvents();

function createButtons(container, containerHTML, number) {
    for (let i = 0; i < number; i++) {
        container.push(document.createElement("button"));
        containerHTML.appendChild(container[i]);
    }
}

const addControls = () => {

    buttons[0].setAttribute("id", "move1-button");
    buttons[0].textContent = `${myPokemon.moves[0].name}`;
    buttons[1].setAttribute("id", "move2-button");
    buttons[1].textContent = `${myPokemon.moves[1].name}`;

    buttons[2].setAttribute("id", "attackButton");
    buttons[2].textContent = "Attack";

    buttons[3].setAttribute("id", "move4-button");
    buttons[3].textContent = `${myPokemon.moves[3].name}`;
    buttons[4].setAttribute("id", "move3-button");
    buttons[4].textContent = `${myPokemon.moves[2].name}`;


    for (let i = 0; i < buttons.length; i++) {
        if (i != 2) {
            buttons[i].setAttribute("class", "moves");
        }
    }
}

function addReplayEvents() {
    for (let i = 0; i < replayButtons.length; i++) {
        if (i == 0) {
            replayButtons[i].textContent = "Play New Game";
        } else {
            replayButtons[i].textContent = "Replay Match";
        }
    }
    endGameScreen.appendChild(replay);
    replayButtons[0].addEventListener("click", backToMenu);
    replayButtons[1].addEventListener("click", replayMatch);
}

const addListeners = () => {
    for (let i = 0; i < numberOfButtons; i++) {
        if (i != 2) {
            buttons[i].addEventListener("mouseover", playerMoveDisplay);
            buttons[i].addEventListener("mouseout", playerMoveHide);
            buttons[i].onclick = () => {
                console.log("CLICK AAAAAA!")
            }
        } else {
            buttons[i].addEventListener("click", playerAttackHandler);
        }
    }
    window.addEventListener("midTurn", midTurnHandler);
    window.addEventListener("endTurn", endTurnHandler);
    window.addEventListener("endGame", endGameHandler);
}

const addHealthBars = () => {
    for (let i = 0; i < healthBars.length; i++) {
        healthBars[i].style.display = "flex";
        console.log("add health Bars [i] = " + i);
        console.log(healthBars[i])
        if (i == 1) {
            //enemy
            healthBars[i].style.top = "" + (display.offsetHeight / 12 - 5) + "px";
            healthBars[i].style.margin = "0px 0px 0px " + (display.offsetWidth / 2 - 54) + "px";
        } else {
            //player
            healthBars[i].style.top = "" + (display.offsetHeight / 1.3 - 5) + "px";
            healthBars[i].style.margin = "0px 0px 0px " + (display.offsetWidth / 2 - 54) + "px";
        }
        display.appendChild(healthBars[i]);
    }
}


const showHideEffect = (target, newValue) => {

    switch (target) {
        case "move1":
            playerList.children.move1.children[0].style.display = newValue;
            break;
        case "move2":
            playerList.children.move2.children[0].style.display = newValue;
            break;
        case "move3":
            playerList.children.move3.children[0].style.display = newValue;
            break;
        case "move4":
            playerList.children.move4.children[0].style.display = newValue;
            break;
    }
}

const enableButtons = () => {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}

const disableButtons = () => {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}

const capitalizeText = (text) => {
    let capitalized = "";
    //parse its words
    //capitalize each first letter
    for (let i = 0; i < text.length; i++) {

        if (i == 0) {
            capitalized += (text[0].toUpperCase());
        } else if (text[i - 1] == ' ' || text[i - 1] == '-') {
            capitalized += (text[i].toUpperCase());
        } else if (text[i] == '-') {
            capitalized += ' ';
        } else {
            capitalized += text[i];
        }
    }
    return capitalized;
}

function spriteBlink(sprite) {
    sprite.filters = [new PIXI.filters.AlphaFilter(0.5)];
    setTimeout(function () { sprite.filters = [new PIXI.filters.AlphaFilter(1)]; }, 150);
}