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

 class GameState{
	constructor(){
		this.playerTurn = false;
		this.enemyTurn = false;
		this.playerAttacking = false;
		this.enemyAttacking = false;
		this.playerAttack_finished = false;
		this.enemyAttack_finished = false;
		this.playerHealth = myPokemon.stat1;
		this.enemyHealth = enemyPokemon.stat1;
		this.endGame = false;
	}
}