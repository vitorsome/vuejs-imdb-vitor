<template>
    <div id="container">
        <h1>{{ title }}</h1>
        <div id="containerMovieSearch">
            <SearchInput :id="'textSearch'" :placeholder="'Ex: Breaking Bad'"></SearchInput>
            <ButtonDefault v-on:btdefaultclicked="searchMovie" textButton="Buscar"></ButtonDefault>
        </div>
        <DefaultList :id="'movieList'" :items="items"></DefaultList>
        <Loading :visible="loading"></Loading>
    </div>
</template>

<script>
import DefaultList from '../shared/default-list/DefaultList.vue';
import ButtonDefault from '../shared/button-default/ButtonDefault.vue';
import SearchInput from '../shared/search-input/SearchInput.vue';
import Loading from '../shared/loading/Loading.vue';
import Movie from '../../core/Movie';

export default {
  data () {
    return {
        title: 'Busca de filmes e séries no IMDB',
        items: [],
        loading:false
    }
  },
  methods: {
      searchMovie () {
          let search = document.getElementById('textSearch').value.trim();
          this.items = [];
          this.loading = true;
          if (search != '') {
              let movieController = new Movie();
              movieController.requestAllMoviesImdb(search).then((movies) => {
                  this.items = movies;
                  this.loading = false;
              });
            }
       }
  },
  components:{
    DefaultList:DefaultList,
    ButtonDefault,
    SearchInput,
    Loading
  }
}
</script>

<style scoped>
  
    #container {
        text-align: center;
    }
    #containerMovieSearch {
        width:100%;
        display: flex;
        flex-flow: column;
        align-items: center;
    }

    h1 {
        font-size: 30px;
        color: #FFF;
    }

</style>
