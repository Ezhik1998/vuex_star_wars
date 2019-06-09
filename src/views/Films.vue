<template>
    <div>
        <h2>Films SW</h2>
        <ul>
            <li v-for="film in films" :key="film.title">
                <a href="">{{film.title}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState} from 'vuex'
export default {
    // data: () => ({
    //     films:[]
    // }),
    computed: {
        ...mapState(['films']),
    },
    // methods: {
    //     ...mapMutations(['setFilms'])
    // },
    async created() {
        if (this.films.length !== 0) return;
        this.$store.dispatch('getFilms')
        // const { 
        //     data: {results} } = await axios.get("https://swapi.co/api/films/");
        // // this.films = results;
        // this.setFilms(results);
    }
}
</script>
