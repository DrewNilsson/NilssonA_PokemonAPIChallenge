import * as PokemonApi from "./apiCall.js";
import * as Elements from "./elements.js";

let currentList = 1;

let StartUp = async () => {
  await PokemonApi.FetchAllPokemon();
  await PokemonApi.FetchPokeballImg();
  SearchPokemon("bulbasaur");
};

let ListBtnClick = (btnNum) => {
  Elements.UpdateListContent(btnNum);
  currentList = btnNum;
};

let CapitalizeAllFirstLetters = (str) => {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

let SearchPokemon = async (name) => {
  await PokemonApi.FetchPokemon(name.toLowerCase());
  await PokemonApi.FetchLocation(
    PokemonApi.pokemonData.location_area_encounters
  );
  Elements.UpdatePokemonName(
    CapitalizeAllFirstLetters(PokemonApi.pokemonData.name)
  );
  Elements.UpdatePokemonImage(
    PokemonApi.pokemonData.sprites.front_default,
    PokemonApi.pokemonData.sprites.front_shiny
  );
  Elements.UpdateEvolutionChain();
  Elements.UpdateListContent(currentList);
};

let RemoveAllChildren = (element) => {
  if (element.children.length > 0) {
    for (let i = element.children.length - 1; i >= 0; i--) {
      element.removeChild(element.children[i]);
    }
  }
};

export {
  currentList,
  StartUp,
  ListBtnClick,
  CapitalizeAllFirstLetters,
  SearchPokemon,
  RemoveAllChildren,
};
