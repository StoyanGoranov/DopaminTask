# DopamineTask

![Image of preview](https://cdn.discordapp.com/attachments/534309469258121217/758341623447945226/magame.png)

This Pokemon Game project uses a single HTML page and then content is created dynamically with plain JS.
It is combining functional and OOP to utilize Javascript's capabilities. Graphics rendering is done with PIXI.js

1. Data is fetched from https://pokeapi.co/api/v2/pokemon/
2. It is saved in an array of objects of class Pokemon.
3. User is prompted to choose a Pokemon
4. When he/she does:
  * an enemy Pokemon is chosen at random,
  * the menu is removed,
  * a page with both Pokemon's properties and the game stage is built
5. The Pokemon with higher speed attacks first.
6. On attack there is a miss chance:
  * (attacker speed - defender speed)/2
  * max miss chance is 25%
  * min miss chance is 1%
7. Attack damage is determined by the formula:
  * (attacker attack / defender defense) * random number between 1 and 50.
8. If attack hits damaged Pokemon blinks briefly.
9. If any Pokemon's health reaches zero You lost/You won screen is displayed.
10. User is given a choice:
  * to replay match - displays the stage  again
  * or to play new game - diplays the menu again and the loop continues from step 3.

Future updates will add:
 * loading screen.
 * responsiveness.
 * improve font.
 * perspective to stage background.
 * prompting player with screen messages/ console that logs actions.
 * sounds.
 * functionality for moves and an AI that chooses most beneficial move.
 * multiplayer
 
  

