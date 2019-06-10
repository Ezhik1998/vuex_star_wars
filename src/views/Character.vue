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
    speciesInfo: [],      
  }), 
  components: {
    FilmsList,
    VehiclesList,
    ShipsList,     
  },

  computed: {
    ...mapState(['characters', 'planets']),
    ...mapGetters([
      'getCharacterByID',
      'getAllPlanetsIDs'
    ]),

    character(){
      return this.getCharacterByID(this.$route.params.id)
    },

    homeInfo() {  
      let hm = this.planets.filter(
        planet => this.character.homeworld.includes(planet.url))
      return hm[0].name;         
    },

    currentCharacterPlanetsIDs() {
      let plID = []
      let parse_url = this.character.homeworld.split('/');
      let planet_id = parse_url[parse_url.length - 2]; 
      plID.push(planet_id)
      return plID;
      // return planet_id
      // return this.character.homeworld.map(
      //   url => {
      //     let parse_url = url.split('/');
      //     let planet_id = parse_url[parse_url.length - 2]; 
      //     return planet_id              
      //   }
      // )
    },

    nonInPlanetsIDs() {
      console.log("non in planets ids " + this.currentCharacterPlanetsIDs.filter(
        id => !this.getAllPlanetsIDs.includes(id)
      ));
      return this.currentCharacterPlanetsIDs.filter(
        id => !this.getAllPlanetsIDs.includes(id)
      )      
    },

  },
  
  async created() {
    // const {data} = await axios.get('https://swapi.co/api/people/'+this.$route.params.id);
    // this.character = data 

    if(this.nonInPlanetsIDs.length > 0) {
      console.log("Non " + this.nonInPlanetsIDs); 
      this.$store.dispatch('getPlanets', this.nonInPlanetsIDs)
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


    this.character.species.forEach((speciesUrl) => {
          fetch(speciesUrl).then((response) => {
            return response.json();
          }).then((detail) => {
            let parse_url = detail.url.split('/');
            detail.id = parse_url[parse_url.length - 2]; 
            this.speciesInfo.push(detail);                       
          })
        }); 
        

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
