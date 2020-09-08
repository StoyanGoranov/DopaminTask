
let display;
//put in controller.js
//convert to object



const gameEventHandler = ()=>{
	console.log("fire game event");
	display= document.querySelector(".display");
	console.log(display.offsetWidth);
	console.log(display.offsetHeight);


	let renderer = new PIXI.Application({
		width:display.offsetWidth, 
		height:display.offsetHeight,
		antialias: true,
		transparent: true,
		resolution: 1
	});



	let stage = renderer.stage;
	let player;
	let enemy;

	let loader = PIXI.Loader.shared;


	loader.add("player", myPokemon.sprites.back_default)
		.add("enemy",enemyPokemon.sprites.front_shiny);

	loader.load((loader,resources)=>{
		console.warn('data loaded', resources);
	});
		
	// console.log(loader);


	const setup = ()=>{
		player = new PIXI.Sprite(
			PIXI.loader.resources["player"].texture
		);
		enemy = new PIXI.Sprite(
			PIXI.loader.resources["enemy"].texture
		);
		player.scale.set(1.5,1.5)
		enemy.scale.set(1.5,1.5)
		player.x=(renderer.screen.width/2-72);
		player.y=(renderer.screen.height/1.4);
		enemy.x=(renderer.screen.width/2-72);
		enemy.y=(renderer.screen.height/12);

		// console.log(renderer.screen.width);
		// console.log(player);
		// console.log(enemy);

		// expect(player.source.crossOrigin).to.equal('anonymous');
		stage.addChild(player);
		stage.addChild(enemy);
		renderer.render(stage);

		renderer.ticker.add(delta=>gameLoop(delta))
	}

	loader.load(setup);

	display.appendChild(renderer.view);

	gameState.playerAttacking = true;

	const gameLoop= (delta)=>{
		
		playerAttack(delta);
		enemyAttack(delta);

	}

	const playerAttack = (delta)=>{

			// console.log("in playerAttack")
		if(gameState.playerAttacking){
			
			if(player.y>enemy.y+100){
			
				player.y -=5;	
			}else{
				gameState.playerAttacking = false;
				gameState.playerAttack_finished = true;
			}
		}
		if(gameState.playerAttack_finished){
			// console.log("attack_finished true");
			// console.log("player.y");
			// console.log(player.y);
			// console.log("renderer.screen.height/1.3");
			// console.log(renderer.screen.height/1.4);

			if(player.y<renderer.screen.height/1.4){
				console.log("moving back");
				player.y +=5;
			} else {
				gameState.playerAttack_finished = false;
				// //test enemy

				gameState.enemyAttacking = true;
				// gameState.enemyturn = true;
				// if (gameState.enemyturn && gameState.enemyAttacking){
				// 	gameState.attack_finished = true;
				// };

			}
		}

	}

	const enemyAttack = (delta)=>{
		if(gameState.enemyAttacking){
			if(enemy.y<player.y-100){
				enemy.y +=5;
			} else {
				gameState.enemyAttacking = false;
				gameState.enemyAttack_finished = true;
			}
		}
		if(gameState.enemyAttack_finished){
			// console.log("attack_finished true");
			// console.log("enemy.y");
			// console.log(enemy.y);
			// console.log("renderer.screen.height/12");
			// console.log(renderer.screen.height/12);
			if(enemy.y>renderer.screen.height/12){
				enemy.y -=5;
			} else {
				// gameState.attack_finished = false;
				// gameState.enemyturn = false;
			}
		}
	}
}






	




