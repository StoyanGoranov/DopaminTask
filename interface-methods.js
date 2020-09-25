let body = document.getElementsByTagName("BODY")[0]
let playerList = document.querySelector("ul");
let display;
let gameContainer;
let me;
let titleMe;
let imgMe;
let listMe;
let enemy;
let titleEnemy;
let imgEnemy;
let listEnemy;

const mouseOverEventHandler = (event) => {
	event.currentTarget.style.backgroundColor = "#6C8A29";
	event.currentTarget.style.boxShadow = "-3px 3px #4E7300";
	// console.log(event.currentTarget.id)

	pokemonDataDisplay(pokemonArray[event.currentTarget.id], playerList);
	console.log("fire mouseover event")
}

const mouseOutEventHandler = (event) => {
	event.currentTarget.style.backgroundColor = "#23332D";
	event.currentTarget.style.boxShadow = "none";
	pokemonDataHide(playerList);
}

const pokemonDataDisplay = (pokemonObj, target) => {
	let index;
	// console.log(target);
	let list = target.children;

	list[0].textContent = "Name: " + pokemonObj.name;
	list[1].innerHTML = `Ability: ${pokemonObj.abilities[0].name}
	- ${pokemonObj.abilities[0].effect[0].short_effect}`;
	// if
	list[2].innerHTML = `Move 1: ${pokemonObj.moves[0].name}<span id="${index}" class="move_desc">${pokemonObj.moves[0].effect}
	<br>Accuracy: ${pokemonObj.moves[0].accuracy}
	<br>Power: ${pokemonObj.moves[0].power}</span>`;

	list[3].innerHTML = `Move 2: ${pokemonObj.moves[1].name} <span id="${index}" class="move_desc">${pokemonObj.moves[1].effect}
	<br>Accuracy: ${pokemonObj.moves[1].accuracy}
	<br>Power: ${pokemonObj.moves[1].power}</span>`;

	list[4].innerHTML = `Move 3: ${pokemonObj.moves[2].name}<span id="${index}" class="move_desc">${pokemonObj.moves[2].effect}
	<br>Accuracy: ${pokemonObj.moves[2].accuracy}
	<br>Power: ${pokemonObj.moves[2].power}</span>`;

	list[5].innerHTML = `Move 4: ${pokemonObj.moves[3].name}<span id="${index}" class="move_desc">${pokemonObj.moves[3].effect}
	<br>Accuracy: ${pokemonObj.moves[3].accuracy}
	<br>Power: ${pokemonObj.moves[3].power}</span>`;

	list[6].textContent = "HP: " + pokemonObj.hp.current_stat;
	list[7].textContent = "Attack: " + pokemonObj.attack.current_stat;
	list[8].textContent = "Defense: " + pokemonObj.defense.current_stat;
	list[9].textContent = "Special Attack: " + pokemonObj.special_attack.current_stat;
	list[10].textContent = "Special Defense: " + pokemonObj.special_defense.current_stat;
	list[11].textContent = "Speed: " + pokemonObj.speed.current_stat;

	// healthBars
}

const pokemonDataHide = (target) => {
	let list = target.children;

	list[0].textContent = "";
	list[1].textContent = "";
	list[2].textContent = "";
	list[3].textContent = "";
	list[4].textContent = "";
	list[5].textContent = "";
	list[6].textContent = "";
	list[7].textContent = "";
	list[8].textContent = "";
	list[9].textContent = "";
	list[10].textContent = "";
	list[11].textContent = "";

}

const buildUI = () => {
	display = document.createElement("div");
	display.setAttribute("class", "display");

	gameContainer = document.createElement("div");
	gameContainer.setAttribute("class", "gameContainer")

	me = document.createElement("div");
	titleMe = document.createElement("h3");
	imgMe = document.createElement("img");
	imgMe.setAttribute("class", "in-game-img");
	listMe = document.querySelector("#myPokemon");
	me.setAttribute("class", "myPokemon");
	titleMe.textContent = "Your Pokemon";
	imgMe.src = myPokemon.sprites.front_default;

	enemy = document.createElement("div");
	titleEnemy = document.createElement("h3");
	imgEnemy = document.createElement("img");
	imgEnemy.setAttribute("class", "in-game-img");
	listEnemy = document.createElement("ul");
	listEnemy = listMe.cloneNode(true);

	enemy.setAttribute("class", "enemyPokemon");
	listEnemy.setAttribute("id", "enemyPokemon");
	titleEnemy.textContent = "Enemy Pokemon";
	imgEnemy.src = enemyPokemon.sprites.front_shiny;

	//append elements to player and enemy
	me.appendChild(titleMe);
	me.appendChild(imgMe);
	me.appendChild(listMe);

	enemy.appendChild(titleEnemy);
	enemy.appendChild(imgEnemy);
	enemy.appendChild(listEnemy);

	gameContainer.appendChild(me);
	gameContainer.appendChild(display);
	gameContainer.appendChild(enemy);
	//append to Body

	body.style.flexDirection = "";
	body.appendChild(gameContainer);

}

const initiateGame = (event) => {
	console.log("fire event initiateGame")

	//create 2 new objects
	//1 equal to chosen Pokemon
	//another equal to random enemy Pokemon
	myPokemon = pokemonArray[event.currentTarget.id];
	myPokemon.playerControlled = true;
	pokemonArray.splice(event.currentTarget.id, 1);
	enemyPokemon = pokemonArray[Math.floor(Math.random() * 19)];
	// console.log(enemyPokemon.name + " is enemy Pokemon");

	buildUI();

	pokemonDataDisplay(enemyPokemon, listEnemy);
	//remove menu elements
	menu.innerHTML = "";
	pokemonData.innerHTML = "";

	game = "on";
	// console.log(gameState);
	gameEvent();
}

const gameEvent = () => {
	const event = new CustomEvent("gameStart");
	event.bubbles = true;
	window.dispatchEvent(event);
}

const backToMenu = () => {
	gameContainer.innerHTML = "";

	myPokemon.playerControlled = false;
	pokemonArray.push(myPokemon);
	menu.innerHTML = `<div class="container"></div>`;
	pokemonData.innerHTML = `<h2>Choose A Pokemon</h2>`;
	pokemonData.appendChild(playerList);
	pokemonData.style.display = "flex";
	setElements(pokemonArray);
	endGameScreen.style.display = "none";
	addEventListeners();
	enemy = {};
	player = {};
	loader.reset();
}

const replayMatch = () => {
	endGameScreen.style.display = "none";
	gameContainer.style.display = "flex";
	myPokemon.displayHealth(healthBars[0]);
	enemyPokemon.displayHealth(healthBars[1]);
	game = "on";
	firstTurn();
	renderer.ticker.start();

}