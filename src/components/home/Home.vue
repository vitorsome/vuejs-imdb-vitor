<template>
    <div id="container">
        <h1>{{ title }}</h1>
        <div id="containerMovieSearch">
            <SearchInput :id="'textSearch'" :placeholder="'Ex: Breaking Bad'"></SearchInput>
            <ButtonDefault v-on:btdefaultclicked="searchMovie">Buscar</ButtonDefault>
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
        fetch("https://imdb8.p.rapidapi.com/auto-complete?q="+encodeURI(search), {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "imdb8.p.rapidapi.com",
                    "x-rapidapi-key": "0a324edf47mshd02e0b35e2fc273p10d6a3jsn11aaa3cf1305"
                }
            })
            .then(response => {
                return response.json();
            }).then(response => {
                this.items = response.d;
                this.loading = false;
            })
            .catch(err => {
                console.error(err);
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
