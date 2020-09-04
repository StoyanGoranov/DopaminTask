
let display;
//put in controller.js
//convert to object


const gameEvent = ()=>{
	const event = new CustomEvent("gameStart");
	event.bubbles = true;
	window.dispatchEvent(event);
}

const gameEventHandler = ()=>{
	console.log("fire game event");
	display= document.querySelector(".display");
	console.log(display.offsetWidth);
	console.log(display.offsetHeight);
	PIXI.utils.sayHello();

	let renderer = new PIXI.Application({
		width:display.offsetWidth, 
		height:display.offsetHeight,
		transparent: true,
		resolution: 1
	});

	display.appendChild(renderer.view);

	let stage = new PIXI.Container();

	let loader = new PIXI.Loader()
	let pic = myPokemon.sprites.back_default;
	loader.add("myself", "myPokemon.sprites.back_default")
		.add("enemy","enemyPokemon.sprites.front_default");
		
	console.log(loader);

	let myself;
	let enemy;

	const setup = ()=>{
		myself = new PIXI.Sprite(
			PIXI.loader.resources["myself"].texture,
			true
		);
		enemy = new PIXI.Sprite(
			PIXI.loader.resources["enemy"].texture,
			true
		);
		stage.addChild(myself);
		stage.addChild(enemy);
		renderer.render(stage);
	}

	loader.load(setup);
}


	




