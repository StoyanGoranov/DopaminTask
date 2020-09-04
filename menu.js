const menu = document.querySelector(".menu");
const pokemonData = document.querySelector(".pokemonData");

let pokemonSprites ;
let pokemonArray = [];
let myPokemon;
let enemyPokemon;
// console.log(interface);



getData('https://pokeapi.co/api/v2/pokemon/')
	.then(data =>{
		// console.log("dataInterface: ")
		// console.log(data);

		initPokemonArray(data.results,pokemonArray);
		setElements(pokemonArray)
		addEventListeners();
	})
	.catch(err=>{
		console.log(err);
	});

class Pokemon{
	constructor(options){
		this.name = options.name;
 		this.ability = options.abilities[0].ability;
 		this.move1 = options.moves[0];
 		this.move2 = options.moves[1];
 		this.move3 = options.moves[2]; 
 		this.move4 = options.moves[3];
 		this.stat1 = options.stats[0];
		this.stat2 = options.stats[1];
 		this.stat3 = options.stats[2];
 		this.stat4 = options.stats[3]; 
 		this.stat5 = options.stats[4];
 		this.stat6 = options.stats[5];
 		this.sprites = options.sprites; 
	}	
	
 }

 const initPokemonArray = (source, array)=>{
 	// console.log(source);
 	source.forEach(pokemon=>{
 		let newPokemonObj = new Pokemon(pokemon); 
 		array.push(newPokemonObj);
 	});
 }



const setElements = pokemons =>{
	// console.log("pokemons")
	// console.log(pokemons)
	pokemons.forEach((pokemon,i) =>{
		// console.log("pokemons");

		// console.log(pokemon)
			let individual = document.createElement("div");
			
			let img = document.createElement("img");

			// console.log(individual);
			individual.setAttribute("class", "pokemonSprite");
			individual.setAttribute("id", i)
			
			
			img.src = pokemon.sprites.front_default;


			individual.appendChild(img);
			menu.appendChild(individual);
			
			pokemonSprites = document.querySelectorAll(".pokemonSprite");
			
			
	})
	

}


 
const addEventListeners = ()=>{
	// console.log(pokemonSprites);
	pokemonSprites.forEach( pokemonSprite =>{
		// console.log("in for: ")
		// console.log(pokemonSprite);
		pokemonSprite.addEventListener("mouseover", mouseOverEventHandler);
		pokemonSprite.addEventListener("mouseout", mouseOutEventHandler);
		pokemonSprite.addEventListener("click", initiateMatch);
	});
	window.addEventListener("gameStart", gameEventHandler);
}

const mouseOverEventHandler = (event)=>{
	event.currentTarget.style.backgroundColor="#6C8A29";
	event.currentTarget.style.boxShadow = "-3px 3px #4E7300";
	// console.log(event.currentTarget.id)
	let ul = document.querySelector("ul");
	pokemonDataDisplay(pokemonArray[event.currentTarget.id], ul);
	// console.log("fire event")
}

const mouseOutEventHandler = (event)=>{
	event.currentTarget.style.backgroundColor="#23332D";
	event.currentTarget.style.boxShadow="none";
	pokemonDataHide();
}

const initiateMatch = (event)=>{
	console.log("fire event initiateMatch")

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
	imgMe.src = myPokemon.sprites.front_shiny;

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
	gameEvent();
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

const pokemonDataHide = ()=>{
	let name = document.querySelector("#name");
	let ability = document.querySelector("#ability");
	let move1 = document.querySelector("#move1");
	let move2 = document.querySelector("#move2");
	let move3 = document.querySelector("#move3");
	let move4 = document.querySelector("#move4");
	let hp = document.querySelector("#hp");
	let attack = document.querySelector("#attack");
	let defense = document.querySelector("#defense");
	let special_attack = document.querySelector("#special-attack");
	let special_defense = document.querySelector("#special-defense");
	let speed = document.querySelector("#speed");

	name.textContent = "";
	ability.textContent = "";
	move1.textContent = "";
	move2.textContent = "";
	move3.textContent = "";
	move4.textContent = "";
	hp.textContent = "";
	attack.textContent = "";
	defense.textContent = "";
	special_attack.textContent = "";
	special_defense.textContent = "";
	speed.textContent = "";

}


// const setMenuInterface = withData =>{

// }


