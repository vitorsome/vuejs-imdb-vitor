<template>
     <div id="container">
        <div style="position:relative;height:300px;">
            <Loading :visible="loading"></Loading>
            <div v-if="this.movie != '' && this.endProgress == false && this.loading == false" :style="this.loading == true ? 'visibility:hidden' : ''"  class="quiz-container">
                <div>{{ this.getCurrentQuizQuestion() }}</div>
                <div v-if="this.answerOptions.length > 0" id="options" class="answer-options">
                <div v-for="option in this.answerOptions" :key="option">
                    <ButtonOption v-on:btdefaultclicked="checkAnswer" :textButton="option"></ButtonOption>
                </div>
                </div>
            </div>
        </div>
        <div v-if="endProgress">
            <div>Obrigado por jogar! :)</div>
            <div>A sua pontuação final foi de: {{this.score}}</div>
        </div>
        <div id="buttonsQuiz">
            <ButtonDefault v-if="this.currentQuestion > 0" v-on:btdefaultclicked="stopQuiz" textButton="Encerrar Quiz"></ButtonDefault>
            <ButtonDefault v-on:btdefaultclicked="startQuiz" :textButton="this.nextButtonText"></ButtonDefault>
        </div>
    </div>
</template>

<script>
import ButtonDefault from '../shared/button-default/ButtonDefault.vue';
import Loading from '../shared/loading/Loading.vue';
import ButtonOption from '../shared/button-option/ButtonOption.vue';

export default {
  data () {
    return {
        movie: {
            name: '',
            year: '',
            cast: '',
            rank: ''
        },
        currentQuestion: 0,
        movies: ['Inception', 'Interstellar', 'Dunkirk', 'Get Out', "Gravity", 'Gone Girl', 'Wonder Woman', 'Inside Out'],
        props: ['visible'],
        indexMovie: 0,
        score: 0,
        endProgress: false,
        loading: false,
        answerOptions: [],
        currentMovie: null,
        nextButtonText: "Iniciar Quiz"
    }
  },
  methods: {
      startQuiz() {
        this.currentQuestion++;
        this.nextButtonText = 'Próxima questão';
        if (this.currentMovie == null) {
            this.currentMovie = this.movies[this.indexMovie];
        }
        if (this.currentQuestion > 3) {
            this.indexMovie++;
            this.currentQuestion = 1;
            this.currentMovie = this.movies[this.indexMovie];
        }       
        this.loading = true;
        if (this.currentMovie != '') {
            fetch("https://imdb8.p.rapidapi.com/auto-complete?q="+encodeURI(this.currentMovie), {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                        "x-rapidapi-key": "0a324edf47mshd02e0b35e2fc273p10d6a3jsn11aaa3cf1305"
                    }
                })
                .then(response => {
                    return response.json();
                }).then(response => {
                    this.movie.name = response.d[0].l;
                    this.movie.year = response.d[0].y;
                    this.movie.cast = response.d[0].s;
                    this.movie.rank = response.d[0].rank;
                    this.loading = false;
                    this.getAnswerOptionsCurrentMovie();                   
                })
                .catch(err => {
                    console.error(err);
                });
            }
      },
      stopQuiz() {
          this.endProgress = true;
      },
      getCurrentQuizQuestion() {
          switch (this.currentQuestion) {
            case 1: return 'Em qual ano o filme ' + this.movie.name + ' foi lançado?';
            case 2: return 'Quais são atores que participaram do filme ' + this.movie.name + '?';
            case 3: return 'Em qual posição o filme ' + this.movie.name + ' esta atualmente no iMDB?';
          }
      },
      getAnswerOptionsCurrentMovie() {
        this.answerOptions = [];
         if (this.currentQuestion == 1) {
             this.answerOptions.push(this.movie.year);
             this.answerOptions.push(Math.random() * (this.movie.year + 5 - this.movie.year - 5) + this.movie.year - 5);
             this.answerOptions.push(Math.random() * (this.movie.year + 3 - this.movie.year - 3) + this.movie.year - 3); 
         } else if (this.currentQuestion == 2) {
             this.answerOptions.push(this.movie.cast);
             let randomActors = ['Anthony Hopkins','Angelina Jolie','Morgan Freeman',
             'Robert De Niro', 'Julia Roberts', 'Jeniffer Lawrence', 'Amy Adams', 
             'Tom Cruise', 'Brad Pitt', 'Nicole Kidman', 'Leonardo DiCaprio', 'Joseph Gordon-Levitt', 
             'Gal Gadot', 'George Clooney', 'Anne Hathaway', 'Daniel Kaluuya', 'Allison Williams']
             const shuffled = randomActors.sort(() => 0.5 - Math.random());
             this.answerOptions.push(shuffled.slice(0, 2).join(', '));
             this.answerOptions.push(shuffled.slice(2, 4).join(', '));
         } else {
             this.answerOptions.push(this.movie.rank);
             this.answerOptions.push(this.movie.rank + 1);
             this.answerOptions.push(this.movie.rank - 1);
         }
         this.answerOptions = this.answerOptions.sort(() => 0.5 - Math.random());
      },
      checkAnswer() {

      }
  },
  mounted() {
      this.visible = false;
  },
  components: {
      ButtonDefault,
      Loading,
      ButtonOption
  }
}
</script>

<style scoped>

    #buttonsQuiz {
        text-align: center;
        display: flex;
        justify-content: center;
    }

   .quiz-container {
       display: flex;
       flex-flow: column;
       align-items: center;
       margin-top: 20px;
       height: 300px;
   }

   .answer-options {
       display: flex;
       justify-content: center;
       align-content: center;
       flex-flow: column;
       text-align: center;
   }

</style>
