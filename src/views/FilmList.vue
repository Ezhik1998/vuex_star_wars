<template>
<div>
  <h2>Star Wars</h2>
  <div class="col" v-for="film in films" :key="film.episode_id">	
		<router-link :to="{ name:'film', params:{id:film.id} }">{{ film.title }}</router-link>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['films'])
  },
  
  async created() {
    if (this.films.length !== 0) return;
    this.$store.dispatch('getFilms')
  }  
}
</script>

<style lang="scss">
.col {
  margin-bottom: 20px;
  font-size: 18px;
}

h2 {  
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  font-size: 36px;
  color: white;
}


</style>

