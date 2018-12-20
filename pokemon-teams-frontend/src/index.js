const BASE_URL = 'http://localhost:3000'
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainersContainer = document.querySelector('main')
const state = {
  allTrainers: null,
  currentPokemon: null
}
const fetchTrainers = () => {
  fetch(TRAINERS_URL)
    .then(r => r.json())
    .then(renderAllTrainers)
}
const renderAllTrainers = (json) => {
  state.allTrainers = json
  for (const trainer of json) {
    renderOneTrainer(trainer)
  }
}
const renderOneTrainer = (trainer) => {
  let trainerDiv = document.createElement('div')
  trainerDiv.className = 'card'
  trainerDiv.innerHTML = `<p>${trainer.name} <img src='https://upload.wikimedia.org/wikipedia/en/thumb/0/09/AshXYanime.png/220px-AshXYanime.png'></p>`
  trainersContainer.appendChild(trainerDiv)
  let trainerBtn = document.createElement('button')
  trainerBtn.innerHTML = "<img src='http://piskel-resizer.appspot.com/resize?size=200&url=http%3A%2F%2Fwww.piskelapp.com%2Fimg%2F12c50014-e9fd-11e4-8b53-ff7c901ec332.png'> catch pokemon"
  trainerBtn.dataset.trainerId = trainer.id

  trainerDiv.appendChild(trainerBtn)
  let trainerUL = document.createElement('ul')
  trainerDiv.appendChild(trainerUL)
  trainerBtn.addEventListener('click', (event) => catchPokemon(event, trainerUL))
  for (const pokemon of trainer.pokemons) {
    createPokemonLi(pokemon, trainerUL)
  }
}
const createPokemonLi = (pokemon, trainerUL) => {
  let pokemonLI = document.createElement('li')
  pokemonLI.innerHTML = `<strong>${pokemon.nickname}</strong> - ${pokemon.species}`
  let pokemonBtn = document.createElement('button')
  pokemonBtn.innerText = 'release'
  pokemonBtn.classList.add('release')
  pokemonBtn.dataset.pokemonId = pokemon.id
  pokemonBtn.dataset.trainerId = pokemon.trainer_id

  pokemonBtn.addEventListener('click', releasePokemon)
  pokemonLI.appendChild(pokemonBtn)
  trainerUL.appendChild(pokemonLI)
}
const releasePokemon = (event) => {
  let pokemonId = parseInt(event.target.dataset.pokemonId)
  let trainerId = parseInt(event.target.dataset.trainerId)
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: "DELETE",
  })
    .then(r => r.json())
    .then(() => {
      event.target.parentElement.remove()
    })
}
const catchPokemon = (event, ul) => {
  let trainerId = parseInt(event.target.dataset.trainerId)
  event.preventDefault()
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': trainerId
    })
  })
    .then(response => response.json())
    .then(pokemon => createPokemonLi(pokemon, ul))
}
fetchTrainers()
