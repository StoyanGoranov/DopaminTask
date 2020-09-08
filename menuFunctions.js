let ul = document.querySelector("ul");

const mouseOverEventHandler = (event)=>{
	event.currentTarget.style.backgroundColor="#6C8A29";
	event.currentTarget.style.boxShadow = "-3px 3px #4E7300";
	// console.log(event.currentTarget.id)
	
	pokemonDataDisplay(pokemonArray[event.currentTarget.id], ul);
	// console.log("fire event")
}

const mouseOutEventHandler = (event)=>{
	event.currentTarget.style.backgroundColor="#23332D";
	event.currentTarget.style.boxShadow="none";
	pokemonDataHide(ul);
}

const pokemonDataDisplay = (pokemonObj, target)=>{
	
	// console.log(target.children);
	let list = target.children;
	
	list[0].textContent = "Name: " + pokemonObj.name;
	list[1].textContent = "Ability: " + pokemonObj.ability.name;
	list[2].textContent = "Move 1: " + pokemonObj.move1.move.name;
	list[3].textContent = "Move 2: " + pokemonObj.move2.move.name;
	list[4].textContent = "Move 3: " + pokemonObj.move3.move.name;
	list[5].textContent = "Move 4: " + pokemonObj.move4.move.name;
	list[6].textContent = "HP: " + pokemonObj.stat1.base_stat;
	list[7].textContent = "Attack: " + pokemonObj.stat2.base_stat;
	list[8].textContent = "Defense: " + pokemonObj.stat3.base_stat;
	list[9].textContent = "Special Attack: " + pokemonObj.stat4.base_stat;
	list[10].textContent = "Special Defense: " + pokemonObj.stat5.base_stat;
	list[11].textContent = "Speed: " + pokemonObj.stat6.base_stat;

}

const pokemonDataHide = (target)=>{
	let list = target.children;
	// let name = document.querySelector("#name");
	// let ability = document.querySelector("#ability");
	// let move1 = document.querySelector("#move1");
	// let move2 = document.querySelector("#move2");
	// let move3 = document.querySelector("#move3");
	// let move4 = document.querySelector("#move4");
	// let hp = document.querySelector("#hp");
	// let attack = document.querySelector("#attack");
	// let defense = document.querySelector("#defense");
	// let special_attack = document.querySelector("#special-attack");
	// let special_defense = document.querySelector("#special-defense");
	// let speed = document.querySelector("#speed");

	list[0].name.textContent = "";
	list[1].ability.textContent = "";
	list[2].move1.textContent = "";
	list[3].move2.textContent = "";
	list[4].move3.textContent = "";
	list[5].move4.textContent = "";
	list[6].hp.textContent = "";
	list[7].attack.textContent = "";
	list[8].defense.textContent = "";
	list[9].special_attack.textContent = "";
	list[10].special_defense.textContent = "";
	list[11].speed.textContent = "";

}

const initiateGame = (event)=>{
	console.log("fire event initiateGame")

	//create 2 new objects
	//1 equal to chosen Pokemon
	//another equal to random enemy Pokemon
	myPokemon = pokemonArray[event.currentTarget.id];
		// console.log(event.currentTarget.id);
		// console.log("selected for removal: "+myPokemon.name);
	pokemonArray.splice(event.currentTarget.id,1);
	enemyPokemon = pokemonArray[Math.floor(Math.random() * 20)];
		// console.log(myPokemon);
	
	let gameContainer = document.createElement("div");
	gameContainer.setAttribute("class", "gameContainer")
	// menu.parentNode.removeChild(menu);
	let display = document.createElement("div");
	display.setAttribute("class", "display");


	let me = document.createElement("div");
	let titleMe = document.createElement("h3");
	let imgMe = document.createElement("img");
	let listMe = document.querySelector("#myPokemon");
	me.setAttribute("class", "myPokemon");
	titleMe.textContent = "Your Pokemon";
	imgMe.src = myPokemon.sprites.front_default;

	let enemy = document.createElement("div");
	let titleEnemy = document.createElement("h3");
	let imgEnemy = document.createElement("img")
	let listEnemy = document.createElement("ul");
		listEnemy = listMe.cloneNode(true);

	enemy.setAttribute("class", "enemyPokemon");
	listEnemy.setAttribute("id", "enemyPokemon");
	titleEnemy.textContent = "Enemy Pokemon";
	imgEnemy.src = enemyPokemon.sprites.front_shiny;

	
	pokemonDataDisplay(enemyPokemon, listEnemy);
	//remove menu elements
	menu.remove();
	pokemonData.remove();

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
	body = document.getElementsByTagName("BODY")[0]
	body.style.flexDirection = "";
	body.appendChild(gameContainer);
	gameState = new GameState;
	console.log(gameState);
	gameEvent();
}

const gameEvent = ()=>{
	const event = new CustomEvent("gameStart");
	event.bubbles = true;
	window.dispatchEvent(event);
}