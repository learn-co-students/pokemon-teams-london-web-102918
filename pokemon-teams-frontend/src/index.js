const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerMain = document.querySelector('main')
const releasedPokemons = []
// fetch Trainers
const fetchTrainers = () => {
  fetch(`${TRAINERS_URL}`)
    .then(response => response.json())
    .then((trainers) => renderTrainers(trainers))
}

// render Trainers
const renderTrainers = (trainers) => {
  trainers.forEach((trainer) => {
    trainerMain.appendChild(renderSingleTrainer(trainer))
  })
}

//render single trainer
const renderSingleTrainer = (trainer) => {
  const trainerCard = document.createElement('div')
  trainerCard.className = 'card'
  trainerCard.dataset.id = trainer.id
  trainerCard.innerHTML = `
    <p>${trainer.name}</p>
    <button data-trainer-id=${trainer.id}>Add Pokemon</button>
  `
  const trainerPokemons = trainer.pokemons
  const pokemonListEl = document.createElement('ul')

  trainerPokemons.forEach((pokemon) => {
    let pokeList = document.createElement('li')
    let pokeRelBtn = document.createElement('button')
    pokeList.dataset.listId = pokemon.id
    pokeRelBtn.dataset.pokemonId = pokemon.id
    pokeRelBtn.innerText = 'Release'
    pokeRelBtn.className = 'release'
    pokeRelBtn.addEventListener('click', ()=> releasePokemon(pokemon))
    pokemonListEl.append(pokeList)
    pokeList.innerHTML = `
      ${pokemon.nickname}
    `
    pokeList.append(pokeRelBtn)
  })
  trainerMain.appendChild(trainerCard)
  trainerCard.appendChild(pokemonListEl)
  let addPokemonBtn = document.querySelector(`button[data-trainer-id='${trainer.id}']`)
  addPokemonBtn.addEventListener('click', ()=> addPokemonToTeam(trainer))

  return trainerCard
}

const addPokemonToTeam = (trainer) => {
  if(releasedPokemons.length === 0) {
    alert('Sorry - No Pokemons available to add! PIKACHU!!!')
  } else {
    const trainerCard = document.querySelector(`div[data-id='${trainer.id}']`)
    const pokeListUl = trainerCard.querySelector('ul')
    let pokeList = document.createElement('li')
    let pokeRelBtn = document.createElement('button')
    // TO DO CAN'T DELETE POKEMONS MORE THAN ONCE
    pokeList.dataset.listId = releasedPokemons[0]['id']
    pokeRelBtn.dataset.pokemonId = releasedPokemons[0]['id']
    pokeRelBtn.innerText = 'Release'
    pokeRelBtn.className = 'release'
    pokeRelBtn.addEventListener('click', ()=> releasePokemon(releasedPokemons[0]['id']))
    pokeListUl.append(pokeList)
    pokeList.innerHTML = `
      ${releasedPokemons[0]['nickname']}
    `
    pokeList.append(pokeRelBtn)
    releasedPokemons.shift()

  }
}

// release Pokemon from team
const releasePokemon = (pokemon) => {
  let pokeList = document.querySelector(`li[data-list-id='${pokemon.id}']`)
  releasedPokemons.push(pokemon)
  pokeList.remove()
  console.log(releasedPokemons);
}

fetchTrainers()
