import {
  allPokemon,
  pokemonData,
  pokemonEvolution,
  pokemonLocation,
  pokeballImg,
} from "./apiCall.js";
import {
  getLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorageByName,
} from "./localStorage.js";
import * as Functions from "./functions.js";

let isFavorite;

let pokeName = document.getElementById("pokeName");
let pokemonImg = document.getElementById("pokemonImg");
let evolutionDiv = document.getElementById("evolutionDiv");

let pokemonBtn = document.getElementById("pokemonBtn");
pokemonBtn.addEventListener("click", () => Functions.ListBtnClick(1));

let abilitiesBtn = document.getElementById("abilitiesBtn");
abilitiesBtn.addEventListener("click", () => Functions.ListBtnClick(2));

let movesBtn = document.getElementById("movesBtn");
movesBtn.addEventListener("click", () => Functions.ListBtnClick(3));

let locationsBtn = document.getElementById("locationsBtn");
locationsBtn.addEventListener("click", () => Functions.ListBtnClick(4));

let listContent = document.getElementById("listContent");

let pokemonSearch = document.getElementById("pokemonSearch");
pokemonSearch.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    Functions.SearchPokemon(pokemonSearch.value);
  }
});

let UpdatePokemonName = (name) => {
  pokeName.textContent = name;
};

let UpdatePokemonImage = (normal, shiny) => {
  Functions.RemoveAllChildren(pokemonImg);

  let normalImg = document.createElement("img");
  normalImg.className = "pokemon-image-active";
  normalImg.src = normal;
  normalImg.alt = pokemonData.name;
  normalImg.addEventListener("click", () => {
    normalImg.className = "pokemon-image-inactive";
    shinyImg.className = "pokemon-image-active";
  });
  let shinyImg = document.createElement("img");
  shinyImg.className = "pokemon-image-inactive";
  shinyImg.src = shiny;
  shinyImg.alt = pokemonData.name;
  shinyImg.addEventListener("click", () => {
    normalImg.className = "pokemon-image-active";
    shinyImg.className = "pokemon-image-inactive";
  });

  pokemonImg.appendChild(normalImg);
  pokemonImg.appendChild(shinyImg);
};

let UpdateEvolutionChain = () => {
  Functions.RemoveAllChildren(evolutionDiv);

  for (let i = 0; i < pokemonEvolution.length; i++) {
    let evolutionElement = document.createElement("div");
    evolutionElement.className = "evolution-element";
    evolutionElement.textContent = Functions.CapitalizeAllFirstLetters(
      pokemonEvolution[i]
    );

    evolutionDiv.appendChild(evolutionElement);
  }
};

let UpdateListContent = (btnNum) => {
  Functions.RemoveAllChildren(listContent);

  if (btnNum == 1) {
    let favorites = getLocalStorage();
    let pokeballClass;

    for (let i = 0; i < allPokemon.length; i++) {
      if (favorites.indexOf(i) != -1) {
        isFavorite = true;
        pokeballClass = "pokeball";
      } else {
        isFavorite = false;
        pokeballClass = "pokeball-hidden";
      }

      let listSidebar = document.createElement("div");
      listSidebar.className = "list-sidebar";

      let pokeball = document.createElement("img");
      pokeball.className = pokeballClass;
      pokeball.id = "pokeball" + i;
      pokeball.src = pokeballImg;
      pokeball.addEventListener("click", () => {
        if (favorites.indexOf(i) != -1) {
          pokeball.className = "pokeball-hidden";
          isFavorite = false;
          removeFromLocalStorage(i);
        } else {
          pokeball.className = "pokeball";
          isFavorite = true;
          saveToLocalStorageByName(i);
        }
      });

      listSidebar.appendChild(pokeball);

      let listButton = document.createElement("a");
      listButton.className = "list-button";
      listButton.id = i + "listBtn";
      listButton.addEventListener("click", () =>
        Functions.SearchPokemon(
          document.getElementById(i + "listName").textContent
        )
      );

      let idNum = document.createElement("div");
      idNum.textContent = String(i + 1).padStart(3, "0");

      let pokemonName = document.createElement("div");
      pokemonName.id = i + "listName";
      pokemonName.textContent = Functions.CapitalizeAllFirstLetters(
        allPokemon[i]
      );

      let listElement = document.createElement("div");
      listElement.className = "list-element";

      listButton.appendChild(idNum);
      listButton.appendChild(pokemonName);
      listElement.appendChild(listSidebar);
      listElement.appendChild(listButton);
      listContent.appendChild(listElement);
    }
  } else if (btnNum == 2) {
    for (let i = 0; i < pokemonData.abilities.length; i++) {
      let listElement = document.createElement("div");
      listElement.className = "list-button";
      listElement.textContent = Functions.CapitalizeAllFirstLetters(
        pokemonData.abilities[i].ability.name.replaceAll("-", " ")
      );

      listContent.appendChild(listElement);
    }
  } else if (btnNum == 3) {
    for (let i = 0; i < pokemonData.moves.length; i++) {
      let listElement = document.createElement("div");
      listElement.className = "list-button";
      listElement.textContent = Functions.CapitalizeAllFirstLetters(
        pokemonData.moves[i].move.name.replaceAll("-", " ")
      );

      listContent.appendChild(listElement);
    }
  } else if (btnNum == 4) {
    for (let i = 0; i < pokemonLocation.length; i++) {
      let listElement = document.createElement("div");
      listElement.className = "list-button";
      listElement.textContent = Functions.CapitalizeAllFirstLetters(
        pokemonLocation[i].location_area.name
          .replaceAll("-", " ")
          .replace(" area", "")
      );

      listContent.appendChild(listElement);
    }

    if (pokemonLocation.length == 0) {
      let listElement = document.createElement("div");
      listElement.className = "list-button";
      listElement.textContent = "Not found at any location";

      listContent.appendChild(listElement);
    }
  }
};

export {
  UpdatePokemonName,
  UpdatePokemonImage,
  UpdateEvolutionChain,
  UpdateListContent,
};