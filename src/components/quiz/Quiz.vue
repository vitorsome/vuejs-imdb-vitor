<template>
     <div id="container">
        <Loading :visible="loading"></Loading>
        <div v-if="this.movie != '' && this.endProgress == false" class="quiz-container">
            <div>{{ this.getCurrentQuizQuestion() }}</div>
            <div v-if="this.answerOptions.length > 0" id="options" class="answer-options">
               <div v-for="option in this.answerOptions" :key="option">
                    <ButtonDefault v-on:btdefaultclicked="checkAnswer">{{ option }}</ButtonDefault>
               </div>
            </div>
        </div>
        <div v-if="endProgress">
            <div>Obrigado por jogar! :)</div>
            <div>A sua pontuação final foi de: {{this.score}}</div>
        </div>
        <div id="buttonsQuiz">
            <ButtonDefault v-if="this.currentQuestion > 0" v-on:btdefaultclicked="stopQuiz">Encerrar Quiz!</ButtonDefault>
            <ButtonDefault v-on:btdefaultclicked="startQuiz">Iniciar Quiz</ButtonDefault>
        </div>
    </div>
</template>

<script>
import ButtonDefault from '../shared/button-default/ButtonDefault.vue';
import Loading from '../shared/loading/Loading.vue';

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
        answerOptions: []
    }
  },
  methods: {
      startQuiz() {
        const currentMovie = this.movies[this.indexMovie];
        this.loading = true;
        if (currentMovie != '') {
            fetch("https://imdb8.p.rapidapi.com/auto-complete?q="+encodeURI(currentMovie), {
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
                    this.currentQuestion++;
                    this.getAnswerOptionsCurrentMovie();
                    if (this.currentQuestion > 3) {
                        this.indexMovie++;
                        this.currentQuestion = 0;
                    }
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
             let randomActors = ['Anthony Hopkins','Angelina Jolie','Morgan Freeman','Robert De Niro', 'Julia Roberts', 'Jeniffer Lawrence', 'Amy Adams', 'Tom Cruise', 'Brad Pitt', 'Nicole Kidman', 'Leonardo DiCaprio']
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
      Loading
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
   }

   .answer-options {
       display: flex;
       justify-content: center;
       align-content: center;
       flex-flow: column;
   }

</style>
