import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex);

const state = {
  // counter: 10,
  // name: 'Tanya',
  // marks: [10, 11, 9, 8, 12, 7, 8, 9, 12, 6, 7, 8],
  // mark: 9,

  films: []
};
const getters = {
  // // геттер как свойство
  // getGoodMarks: state => state.marks.filter(m => m >= 9),
  // // геттер как функция
  // getMarks: state => mark => state.marks.filter(m => m >= mark),

  getFilmById: state => id => 
    state.films.find(film => film.id === id)

};
const mutations = {
  // incCounter: state => state.counter++,
  // decCounter: state => state.counter--,
  // setCounter: (state, payload) => (state.counter = payload),

  setFilms: (state, payload) => (state.films = payload),
  
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
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  
})
