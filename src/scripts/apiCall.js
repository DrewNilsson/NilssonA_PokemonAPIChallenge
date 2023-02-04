
let allPokemon;
let pokemonData;
let pokemonEvolution = [];
let pokemonLocation;
let pokeballImg;

let FetchAllPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=649');
    const data = await response.json();
    // console.log(data);
    allPokemon = await data.results.map(pokemon => pokemon.name);
    // console.log(allPokemon);
}

let FetchPokemon = async (name) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
    const data = await response.json();
    pokemonData = await data;
    // console.log(pokemonData);

    const response2 = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + name);
    const data2 = await response2.json();
    let pokemonEvolutionURL = await data2.evolution_chain.url;

    const response3 = await fetch(pokemonEvolutionURL);
    const data3 = await response3.json();
    let pokemonEvolutionData = await data3.chain;

    pokemonEvolution = [];
    pokemonEvolution.push(pokemonEvolutionData.species.name);
    if (pokemonEvolutionData.evolves_to.length > 0) {
        pokemonEvolutionData.evolves_to.map(evolution => {
            pokemonEvolution.push(evolution.species.name)
            evolution.evolves_to.map(evolution => {
                pokemonEvolution.push(evolution.species.name)
            });
        });
    }

    // console.log(pokemonEvolution);
}

let FetchLocation = async (locationStr) => {
    const response = await fetch(locationStr);
    const data = await response.json();
    pokemonLocation = await data;
    // console.log(pokemonLocation);
}

let FetchPokeballImg = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/item/4');
    const data = await response.json();
    pokeballImg = await data.sprites.default;

    // console.log(pokeballImg);
}

export { allPokemon, pokemonData, pokemonEvolution, pokemonLocation, pokeballImg, FetchAllPokemon, FetchPokemon, FetchLocation, FetchPokeballImg }
