

async function getInnerData (url = ""){
	const response = await fetch(url)
		if(response.ok){
			console.log("Successful fetch!")
		} else {
			throw ("Error fetching the data!");
			// console.log("Unsuccessful fetch!");
		}	
		let data = await response.json();
		// console.log(data);
		return data;
	}
		
async function processResults(results){
	for(var result of results){
		let obj = await getInnerData(result.url)
					
		result.abilities = obj.abilities.filter(ability=> ability.is_hidden==false);
		result.moves =  obj.moves.filter( (move, i) => i<4);
				
		result.sprites = obj.sprites;
		result.stats = obj.stats;
		delete result.url;
		// result.abilities.forEach( async ability =>{
		// 	obj = await getInnerData(result.ability.url)
		// 	delete ability.url;
		// });
	}


}

async function getData(url){
	let d = await getInnerData(url);
	await processResults(d.results);

	return{
		next: d.next,
		results: d.results
	};
}



// function passDataEvent(data, cont){

// 	const event = new CustomEvent("passingData", {
// 		detail:{data,container:cont},
		
// 	});
// 	event.bubbles = true;
// 	window.dispatchEvent(event);
// }



// function passArrayHandler(event){
// 	if(event.detail.data.results==undefined){
// 		return 0;
// 	}
// 	event.detail.data.results.forEach(async object =>{
// 			
// 			let obj = await getData(object.url)
// 			// .then(data =>{
// 			// 	obj = data;
				
// 			// })	
// 			passDataEvent(obj,event.detail.container);
// 	});
// }


// function passObjHandler(event){
// 	// if(event.detail.container == undefined){
// 	// 	return 0;
// 	// }
// 	event.detail.container.push(event.detail.data)
// }



// window.addEventListener("passingData", passArrayHandler)
// window.addEventListener("passingData", passObjHandler)