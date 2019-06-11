<template>
  <div>
      <div class = 'desc'>
        <h3><b>{{character.name}}</b></h3>        
        <b>Height:</b> {{character.height}}<br/>
        <b>Mass:</b> {{character.mass}}<br/>
        <b>Birth:</b> {{character.birth_year}}<br/>
        <b>Hair color:</b> {{character.hair_color}}<br/>
        <b>Skin color:</b> {{character.skin_color}}<br/>
        <b>Eye color:</b> {{character.eye_color}}<br/>
        <b>Homeworld:</b> {{homeInfo}}<br/>
      </div>

      <div  v-if ='character.species && character.species.length > 0' class = "col" >            
        <h4>Species:</h4>      
          <div v-for="(species, index) in speciesInfo" :key="`species_${index}`" >
            {{ species.name }}			
          </div>        
         
        <div class = "filmApp">  
          <films-list :filmsInfo="filmsInfo"></films-list>            
        </div> 

        <div v-if ='character.vehicles && character.vehicles.length > 0' class = "vehicle">            
          <vehicles-list :vehiclesInfo="vehiclesInfo"></vehicles-list>         
        </div>

        <div v-if ='character.starships && character.starships.length > 0' class = "ship">            
          <ships-list :shipsInfo="shipsInfo"></ships-list>       
        </div>   
      </div>  
      <router-link class = "back" to="/">Back</router-link>
  </div>
</template>


<script>
import axios from 'axios';
import { mapState, mapGetters} from 'vuex';
import FilmsList from '@/components/FilmAppeared';
import VehiclesList from '@/components/VehiclesList';
import ShipsList from '@/components/StarshipsList'
export default {
  data: () => ({      
    // character: [],  
    filmsInfo: [],
    vehiclesInfo: [],
    shipsInfo: [],
    // homeInfo: [],
    // speciesInfo: [],      
  }), 
  components: {
    FilmsList,
    VehiclesList,
    ShipsList,     
  },

  computed: {
    ...mapState(['characters', 'planets', 'species']),
    ...mapGetters([
      'getCharacterByID',
      'getAllPlanetsIDs',
      'getAllSpeciesIDs',
    ]),

    character(){
      return this.getCharacterByID(this.$route.params.id)
    },

    homeInfo() {  
      let pl = this.planets.filter(
        planet => this.character.homeworld.includes(planet.url)
      )
      if (pl.length > 0) {
        return pl[0].name
      }       
    },

    speciesInfo() {
      return this.species.filter(
        sp => this.character.species.includes(sp.url)
      )
    },

    currentCharacterPlanetsIDs() {
      let parse_url = this.character.homeworld.split('/');
      let planet_id = parse_url[parse_url.length - 2]; 
      return planet_id;    
    },

    nonInPlanetsIDs() {
      return this.getAllPlanetsIDs.includes(this.currentCharacterPlanetsIDs) ? [] : [this.currentCharacterPlanetsIDs];
    },

    currentCharacterSpeciesIDs() {
      return this.character.species.map(
        url => {
          let parse_url = url.split('/');
          let species_id = parse_url[parse_url.length - 2]; 
          return species_id              
        }
      )
    },

    nonInSpeciesIDs() {      
      return this.currentCharacterSpeciesIDs.filter(
        id => !this.getAllSpeciesIDs.includes(id)
      )
    },

  },
  
  async created() {

    if(this.nonInPlanetsIDs.length > 0) {
      console.log("Non " + this.nonInPlanetsIDs); 
      this.$store.dispatch('getPlanets', this.nonInPlanetsIDs)
    }

    if(this.nonInSpeciesIDs.length > 0) {
    this.$store.dispatch('getSpecies', this.nonInSpeciesIDs)
    }

    this.character.films.forEach((filmUrl) => {
          fetch(filmUrl).then((response) => {
            return response.json();
          }).then((detail) => {
            let parse_url = detail.url.split('/');
            detail.id = parse_url[parse_url.length - 2]; 
            this.filmsInfo.push(detail);                       
          })
        }); 


    // this.character.species.forEach((speciesUrl) => {
    //       fetch(speciesUrl).then((response) => {
    //         return response.json();
    //       }).then((detail) => {
    //         let parse_url = detail.url.split('/');
    //         detail.id = parse_url[parse_url.length - 2]; 
    //         this.speciesInfo.push(detail);                       
    //       })
    //     }); 
        

    this.character.vehicles.forEach((vehicleUrl) => {
          fetch(vehicleUrl).then((response) => {
            return response.json();
          }).then((detail) => {
            let parse_url = detail.url.split('/');
            detail.id = parse_url[parse_url.length - 2]; 
            this.vehiclesInfo.push(detail);                       
          })
        }); 

    this.character.starships.forEach((shipUrl) => {
          fetch(shipUrl).then((response) => {
            return response.json();
          }).then((detail) => {
            let parse_url = detail.url.split('/');
            detail.id = parse_url[parse_url.length - 2]; 
            this.shipsInfo.push(detail);                       
          })
        }); 
    
    // fetch(this.character.homeworld).then((response) => {
    //         return response.json();
    //       }).then((detail) => {
    //         let parse_url = detail.url.split('/');
    //         detail.id = parse_url[parse_url.length - 2];
    //         this.homeInfo = detail;                                 
    //       })
    }
}   
</script>

<style lang="scss">
h3 {
  color: yellow
}
.filmApp, .ship, .vehicle{
  margin-top:15px;
  margin-bottom: 10px;
}
.desc {
  margin-bottom: 10px;
}

.back {  
  padding: 10px 15px;
  border: 1px solid whitesmoke;
  border-radius: 5px;
  color:white;
  background-color: yellow;
  font-size: 20px; 
  margin-top: 15px; 
  
  &:hover {
    color:yellow;
    background-color: white;
    font-size: 20px;
  }
}
</style>
