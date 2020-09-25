const menu = document.querySelector(".menu");
const pokemonData = document.querySelector(".pokemonData");

let pokemonSprites;
let pokemonArray = [];
let myPokemon;
let enemyPokemon;
let game = "off";
// console.log(interface);



getData('https://pokeapi.co/api/v2/pokemon/')
	.then(data => {
		// console.log("dataInterface: ")
		console.log(data.results);

		initPokemonArray(data.results);
		setElements(pokemonArray)
		addEventListeners();
	})
	.catch(err => {
		console.log(err);
	});

const initPokemonArray = source => {
	// console.log(source);
	source.forEach(pokemon => {
		let newPokemonObj = new Pokemon(pokemon);
		pokemonArray.push(newPokemonObj);
	});
}

const setElements = pokemons => {
	// console.log("pokemons")
	// console.log(pokemons)
	pokemons.forEach((pokemon, i) => {
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

const addEventListeners = () => {
	// console.log(pokemonSprites);
	pokemonSprites.forEach(pokemonSprite => {
		// console.log("in for: ")
		// console.log(pokemonSprite);
		pokemonSprite.addEventListener("mouseover", mouseOverEventHandler);
		pokemonSprite.addEventListener("mouseout", mouseOutEventHandler);
		pokemonSprite.addEventListener("click", initiateGame);
	});
	window.addEventListener("gameStart", gameEventHandler);
}






