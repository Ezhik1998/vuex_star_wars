<template>
  <div>
        <h3><b>{{film.title}}</b></h3>
        <p v-if="film.director">
        <b>Director:</b> {{film.director}}<br/>
        <b>Released:</b> {{film.release_date}}<br/>
        </p>     
        <div class = "crawl">
          {{film.opening_crawl}}
        </div>   
        <div class="characters">
	  	      <character-list :details="characterDetails"></character-list>
	      </div>

        <div class="wrapper">
          <div class="row">
            <div class = "col" >     
              <ships-list :shipsInfo="shipsInfo"></ships-list>  
            </div>            
                  
            <div class = "col">
              <planets-list :planetsInfo="planetsInfo"></planets-list>          
            </div>

            <div class = "col" v-if ='film.vehicles && film.vehicles.length > 0' >
              <vehicles-list :vehiclesInfo="vehiclesInfo"></vehicles-list>         
            </div>
          </div>
        </div>
        
        <div class="row">
	  	      <species-list :speciesInfo="speciesDetails"></species-list>
	      </div>
        <p/>
        <router-link class = "back" to="/">Back</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters} from 'vuex';
import CharacterList from '@/components/CharacterList';
import SpeciesList from '@/components/SpeciesList';
import ShipsList from '@/components/StarshipsList';
import VehiclesList from '@/components/VehiclesList';
import PlanetsList from '@/components/PlanetsList';
export default {
  data: () => ({
      // film: {},      
      // characterDetails: [], 
      speciesDetails: [], 
      planetsInfo: [],
      shipsInfo: [],
      vehiclesInfo: [],

  }), 
  components: {    
      CharacterList, 
      SpeciesList, 
      ShipsList,
      VehiclesList,
      PlanetsList
  },

  computed: {
    ...mapState(['films', 'characters']),
    ...mapGetters([
      'getFilmById',
      'getAllCharactersIDs'
    ]),

    film() {
      return this.getFilmById(this.$route.params.id)
    },

    characterDetails() {
      return this.characters.filter(
        ch => this.film.characters.includes(ch.url)
      )
    },

    currentFilmCharactersIDs() {
      return this.film.characters.map(
        url => {
          let parse_url = url.split('/');
          let ch_id = parse_url[parse_url.length - 2]; 
          return ch_id              
        }
      )
    },

    firstPresentCharactersIDs() {
      return this.currentFilmCharactersIDs.filter(
        id => !this.getAllCharactersIDs.includes(id)
      )
    }

  },
  
  async created() {
    
    // var {data} = await axios.get('https://swapi.co/api/films/'+this.$route.params.id);
    // this.film = data    
      

    // this.film.characters.forEach((characterUrl) => {
    //       fetch(characterUrl).then((response) => {
    //         return response.json();
    //       }).then((detail) => {
    //         let parse_url = detail.url.split('/');
    //         detail.id = parse_url[parse_url.length - 2]; 
    //         this.characterDetails.push(detail);                       
    //       })
    //     }); 

    this.$store.dispatch('getCharacters', this.firstPresentCharactersIDs)
    
    this.film.planets.forEach((planetUrl) => {
          fetch(planetUrl).then((response) => {
            return response.json();
          }).then((detail) => {
            let parse_url = detail.url.split('/');
            detail.id = parse_url[parse_url.length - 2]; 
            this.planetsInfo.push(detail);                       
          })
        }); 

    this.film.vehicles.forEach((vehicleUrl) => {
          fetch(vehicleUrl).then((response) => {
            return response.json();
          }).then((detail) => {
            let parse_url = detail.url.split('/');
            detail.id = parse_url[parse_url.length - 2]; 
            this.vehiclesInfo.push(detail);                       
          })
        });

    this.film.starships.forEach((shipUrl) => {
              fetch(shipUrl).then((response) => {
                return response.json();
              }).then((detail) => {
                let parse_url = detail.url.split('/');
                detail.id = parse_url[parse_url.length - 2]; 
                this.shipsInfo.push(detail);                       
              })
            });
    this.film.species.forEach((speciesUrl) => {
          fetch(speciesUrl).then((response) => {
            return response.json();
          }).then((detail) => {
            let parse_url = detail.url.split('/');
            detail.id = parse_url[parse_url.length - 2]; 
            this.speciesDetails.push(detail);                       
          })
        }); 

  }  
}
</script>

<style lang="scss">
h3 {
  color: yellow;
}

.wrapper {
  max-width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0px 15px ;
  text-align: center;  
}

.wrapper .col {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.crawl {
  margin: 10px;
  text-align: justify;
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
