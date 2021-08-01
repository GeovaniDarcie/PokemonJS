const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fethPokemon = () => {
    const pokemonPromises = [];

    for(let i = 1; i <= 150; i++) {
        const url = getPokemonUrl(i);
        pokemonPromises.push(fetch(url).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
      .then(pokemons => {
        const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name);
            let pokemonId;
            if (pokemon.id <= 9) {
                pokemonId = `00${pokemon.id}`
            } else if (pokemon.id < 100) {
                pokemonId = `0${pokemon.id}`
            } else {
                pokemonId = pokemon.id;
            }
            accumulator += `
              <li class="card ${types[0]}">
               <img 
                  class="card-img" 
                  alt="${pokemon.name}" 
                  width="300px"
                  heigh="300px"
                  src="https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokemonId}.png"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}<h2>
                <p class="card-subtitle">${types.join(' | ')}</p>
              </li>
            `;
            return accumulator;
        }, '')

        const ul = document.querySelector('[data-js="pokedex"]');

        ul.innerHTML = lisPokemons;
      })
}

fethPokemon()