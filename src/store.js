import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex);

const state = {
  // counter: 10,
  // name: 'Tanya',
  // marks: [10, 11, 9, 8, 12, 7, 8, 9, 12, 6, 7, 8],
  // mark: 9,

  films: [],
  characters: [],
  starships: [],
};
const getters = {
  // // геттер как свойство
  // getGoodMarks: state => state.marks.filter(m => m >= 9),
  // // геттер как функция
  // getMarks: state => mark => state.marks.filter(m => m >= mark),

  getFilmByID: state => id => 
    state.films.find(film => film.id === id),

  getAllCharactersIDs: state =>
    state.characters.map(ch => ch.id),

  getAllShipsIDs: state => state.starships.map(ship => ship.id)

};
const mutations = {
  setFilms: (state, payload) => (state.films = payload),
  setCharacters: (state, payload) => (state.characters = [...state.characters, ...payload]),
  setShips: (state, payload) => (state.starships = [...state.starships, ...payload])
  
};
const actions = {
  async getFilms ({state, commit}) {
    const {data} = await axios.get("https://swapi.co/api/films/");
    data.results.map(film => {
      let parse_url = film.url.split('/');
      film.id = parse_url[parse_url.length - 2];        
    });
    console.log(data.results);
    commit('setFilms', data.results) 
  },

  async getCharacters ({state, commit}, charactersID) {   
    let chDetails = [];
    console.log(charactersID);
    for (let ch of charactersID) {
      console.log(ch);
      const {data} = await axios.get("https://swapi.co/api/people/" + ch + "/")
      chDetails.push(data) 
      chDetails.map(character => {
        let parse_url = character.url.split('/');
        character.id = parse_url[parse_url.length - 2];
      })         
    }
    console.log(chDetails);
    commit('setCharacters', chDetails)    
  },

  async getShips ({state, commit}, shipsID) {   
    let shipDetails = [];
    console.log(shipsID);
    for (let ship of shipsID) {
      console.log(ship);
      const {data} = await axios.get("https://swapi.co/api/starships/" + ship + "/")
      shipDetails.push(data) 
      shipDetails.map(sh => {
        let parse_url = sh.url.split('/');
        sh.id = parse_url[parse_url.length - 2];
      })         
    }
    console.log(shipDetails);
    commit('setShips', shipDetails)    
  },


};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,  
})
