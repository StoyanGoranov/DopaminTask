const numberOfMoves = 4;

async function getInnerData(url = "") {
	const response = await fetch(url)
	if (response.ok) {
		console.log("Successful fetch!")
	} else {
		throw ("Error fetching the data!");
		// console.log("Unsuccessful fetch!");
	}
	let data = await response.json();
	// console.log(data);
	return data;
}

async function processResults(results) {
	for (var result of results) {
		let obj = await getInnerData(result.url)


		result.abilities = obj.abilities.filter(ability => ability.is_hidden == false);
		for (let index of result.abilities) {
			// console.log("result.abilities")
			// console.log(result.abilities)
			let abilities = await getInnerData(index.ability.url);

			let a = {
				name: abilities.name,
				id: abilities.id,
				effect: abilities.effect_entries,
				// short_effect: abilities.effect_entries[0].short_effect
			}
			index.ability = a;
		}
		// console.log(result.abilities);
		// console.log(result.abilities);
		result.moves = obj.moves.filter((move, i) => i < numberOfMoves);
		for (let index of result.moves) {

			let moves = await getInnerData(index.move.url);
			// console.log(moves);
			let m = {
				accuracy: moves.accuracy,
				effect: moves.effect_entries[0].short_effect,
				effect_chance: moves.effect_chance,
				name: moves.name,
				meta: moves.meta,
				power: moves.power
			}
			// console.log(index.move);
			// console.log(m);	
			index.move = m;
			delete index.version_group_details;
		}


		result.sprites = obj.sprites;
		result.stats = obj.stats;
		delete result.url;
		// delete result.abilities[0];

		// result.abilities.forEach( async ability =>{
		// 	obj = await getInnerData(result.ability.url)
		// 	delete ability.url;
		// });
	}


}

async function getData(url) {
	let d = await getInnerData(url);
	await processResults(d.results);

	return {
		next: d.next,
		results: d.results
	};
}

