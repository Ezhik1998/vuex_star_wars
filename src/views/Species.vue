<template>
    <div>
        <div class = 'specDesc'>
            <h3><b>{{species.name}}</b></h3>
            <b>Classification:</b> {{species.classification}}<br/>
            <b>Designation:</b> {{species.designation}}<br/>
            <b>Average height:</b> {{species.average_height}}<br/>
            <b>Skin colors:</b> {{species.skin_colors}}<br/>
            <b>Hair colors:</b> {{species.hair_colors}}<br/>
            <b>Eye colors:</b> {{species.eye_colors}}<br/>
            <b>Average lifespan:</b> {{species.average_lifespan}}<br/>
            <b>Language:</b> {{species.language}}<br/>
        </div>
        <router-link class = "back" to="/">Back</router-link>
    </div>    
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
      species: [],       
    }),

    async created() {
    var {data} = await axios.get('https://swapi.co/api/species/'+this.$route.params.id);
    this.species = data 
    }    
}
</script>

<style lang="scss">
h3 {
    color: yellow
}
.specDesc {
    margin-bottom: 15px;
}
.back {  
    padding: 10px 15px;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    color:white;
    background-color: yellow;
    font-size: 20px;  
  
    &:hover {
        color:yellow;
        background-color: white;
        font-size: 20px;
    }
}
</style>

