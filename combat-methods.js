const attackSpeed = 5;
let turnState = "";
let actionState = "";
let inputState = "";
let winner = "";

const combat = () => {
    //  console.log("end = false");
    if (turnState == "player turn") {
        // console.log("PLAYER");
        if (inputState == "user input") {
            playerAttack();
        }
    } else if (turnState == "enemy turn") {
        // console.log("ENEMY");
        enemyDecisionTree();
    }

}

//determine which player starts first
const firstTurn = () => {
    if (myPokemon.speed.base_stat > enemyPokemon.speed.base_stat) {
        console.log("player first turn");
        turnState = "player turn";
    } else {
        console.log("enemy first turn");
        turnState = "enemy turn";
    }
}

//if enemy turn 
//let enemy AI play turn
const enemyDecisionTree = () => {
    //evaluate options
    const analyseMoves = () => {

    }
    //make decision
    const enemyMoveSelect = () => {

    }
    console.log("in enemy decision tree");
    //attack
    if (inputState != "wait for user input") {
        actionState = "enemy attacking";
    }
    enemyAttack()
    //until end of turn
}

//else if player turn
//player decision events
const playerMoveDisplay = () => {
    let target = event.currentTarget.id;
    target = target.slice(0, 5);

    showHideEffect(target, "block");
}

const playerMoveHide = () => {
    let target = event.currentTarget.id;
    target = target.slice(0, 5);

    showHideEffect(target, "none");
}

const playerMoveSelect = () => {
    //if status update
    //change stats => end turn

    //if attack
    //wait for attack
}

//if player selects play again/resign 
//restart game
const playerAttack = (delta) => {
    if (actionState == "player attacking") {

        if (player.y > enemy.y + 100) {
            //move sprite
            player.y -= attackSpeed + myPokemon.speed.current_stat / 15;
            //shrink sprite to simulate 3D
            if (player.scale.y > enemySizeModifier && player.scale.x > enemySizeModifier) {
                player.scale.x -= 0.015;
                player.scale.y -= 0.015;
                // console.log(player.scale);
            }
        } else {
            midTurnEvent();
        }
    } else {
        if (player.y < (display.offsetHeight / 1.3)) {
            player.y += attackSpeed + myPokemon.speed.current_stat / 12;
            //enlarge sprite to simulate 3D
            if (player.scale.y < playerSizeModifier && player.scale.x < playerSizeModifier) {
                player.scale.x += 0.015;
                player.scale.y += 0.015;
            }
        } else {
            endTurnEvent();
        }
    }
}

const enemyAttack = (delta) => {
    // index++;
    // console.log("Executing enemy attack " + index + " times.");
    if (actionState == "enemy attacking") {

        if (enemy.y < player.y - 100) {

            //move sprite
            enemy.y += attackSpeed + enemyPokemon.speed.current_stat / 15;
            //enlarge to simulate 3D
            if (enemy.scale.y < playerSizeModifier && enemy.scale.x < playerSizeModifier) {
                enemy.scale.x += 0.015;
                enemy.scale.y += 0.015;
            }
        } else {
            midTurnEvent();
        }
    } else {
        // if (actionState == "enemy going back") {
        if (enemy.y > (display.offsetHeight / 12)) {
            //move sprite
            enemy.y -= attackSpeed + enemyPokemon.speed.current_stat / 12;
            //shrink to simulate 3D
            if (enemy.scale.y > enemySizeModifier && enemy.scale.x > enemySizeModifier) {
                enemy.scale.x -= 0.015;
                enemy.scale.y -= 0.015;
            }
        } else {
            endTurnEvent();
            // console.log(turnState);
        }
    }
}

const isGameOver = (pokemon1, pokemon2) => {
    if (pokemon1.hp.current_stat <= 0 || pokemon2.hp.current_stat <= 0) {
        let winner;
        game = "over";
        if (pokemon1.hp.current_stat <= 0) {
            winner = "enemy";
        } else {
            winner = "player";
        }
        return winner;
    } else {
        game = "on";
    }
}
