const playerAttackHandler = () => {
    console.log("player attack handler")
    inputState = "user input";
    actionState = "player attacking";
}

const midTurnEvent = () => {
    const event = new CustomEvent("midTurn");
    event.bubbles = true;
    window.dispatchEvent(event);
}

const midTurnHandler = () => {
    console.log("mid turn event")
    //if player turn
    if (turnState == "player turn") {
        //if actionState == update stats 
        if (actionState == "update stats") {
            // update stats
            //then call endTurnHandler
        } else {
            //attack occured
            //see if attack hits (hit chance based on enemy speed)
            //if yes calculate damage
            disableButtons();
            actionState = "player going back";
            if (myPokemon.attacks(enemyPokemon) == "Hit!") {
                spriteBlink(enemy);
                enemyPokemon.displayHealth(healthBars[1]);
            }
        }
        //else enemy turn
    } else {
        if (actionState == "update stats") {
            // update stats
            //then call endTurnHandler
        } else {
            //attack occured
            //see if attack hits (hit chance based on enemy speed)
            //if yes calculate damage
            actionState = "enemy going back";
            inputState = "wait for user input";
            if (enemyPokemon.attacks(myPokemon) == "Hit!") {
                spriteBlink(player);
                myPokemon.displayHealth(healthBars[0]);
            }
        }
    }
}

const endTurnEvent = () => {
    const event = new CustomEvent("endTurn");
    event.bubbles = true;
    window.dispatchEvent(event);
}

const endTurnHandler = () => {
    console.log("end turn event");
    //if health reaches zero end game
    winner = isGameOver(myPokemon, enemyPokemon);
    if (game == "over") {
        endGameEvent();
    }
    //else rotate turn
    if (turnState == "player turn") {
        inputState = "user input over"
        turnState = "enemy turn";
    } else {
        turnState = "player turn";
        enableButtons();
    }
}

const endGameEvent = () => {
    const event = new CustomEvent("endGame");
    event.bubbles = true;
    window.dispatchEvent(event);
}
const endGameHandler = () => {
    console.log("fire end game event");
    if (winner == "player") {
        endGameScreen.style.backgroundImage = "url(res/you-win.jpg)";
        transition.begin(endGameScreen, "opacity 0 1 1.5s linear 0s");
        body.appendChild(endGameScreen);
        gameContainer.style.display = "none";
        pokemonData.style.display = "none";
    } else {
        endGameScreen.style.backgroundImage = "url(res/you-died.jpg)"
        transition.begin(endGameScreen, "opacity 0 1 1.5s linear 0s");
        body.appendChild(endGameScreen);
        gameContainer.style.display = "none";
        pokemonData.style.display = "none";
    }
    myPokemon.resetPokemon();
    enemyPokemon.resetPokemon();
    turnState = "";
    actionState = "";
    inputState = ""
    endGameScreen.style.display = "flex";
}
