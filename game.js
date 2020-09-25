const playerSizeModifier = 2;
const enemySizeModifier = 1.5;

// let display;
// let player;
// let enemy;

let renderer;
let stage;
let loader;

const gameEventHandler = () => {

	let _w = display.offsetWidth;
	let _h = display.offsetHeight;

	renderer = new PIXI.Application({
		width: _w,
		height: _h,
		antialias: true,
		transparent: true,
		resolution: 1,
		autoResize: true
	});
	stage = renderer.stage;
	loader = PIXI.Loader.shared;

	loader.add("player", myPokemon.sprites.back_default)
		.add("enemy", enemyPokemon.sprites.front_shiny);

	loader.load((loader, resources) => {
		console.log('data loaded', resources);
	});

	const setup = () => {
		player = new PIXI.Sprite(
			loader.resources["player"].texture
		);
		enemy = new PIXI.Sprite(
			loader.resources["enemy"].texture
		);
		player.scale.set(playerSizeModifier, playerSizeModifier);
		enemy.scale.set(enemySizeModifier, enemySizeModifier);

		player.x = (renderer.screen.width / 2 - player.width / 2);
		player.y = (renderer.screen.height / 1.3);
		enemy.x = (renderer.screen.width / 2 - enemy.width / 2);
		enemy.y = (renderer.screen.height / 12);
		// enemy.filters = [new PIXI.filters.AlphaFilter(0.5)];

		stage.addChild(player);
		stage.addChild(enemy);
		renderer.render(stage);

		firstTurn();

		renderer.ticker.add(delta => gameLoop(delta))
		renderer.ticker.autoStart = false;
	}

	loader.load(setup);
	addControls();
	addListeners();
	addHealthBars();
	myPokemon.displayHealth(healthBars[0]);
	enemyPokemon.displayHealth(healthBars[1]);
	display.appendChild(controls);
	display.appendChild(renderer.view);

	const gameLoop = (delta) => {
		if (game == "on") {
			combat();
		} else {
			console.log("Game over");
			renderer.ticker.stop();
		}

	}

	window.addEventListener("resize", resize);
	function resize() {

		_w = display.offsetWidth;
		_h = display.offsetHeight;

		player.x = (renderer.screen.width / 2 - player.width / 2);
		player.y = (renderer.screen.height / 1.3);

		enemy.x = (renderer.screen.width / 2 - enemy.width / 2);
		enemy.y = (renderer.screen.height / 12);

		renderer.resize(_w, _h);
	}
}





