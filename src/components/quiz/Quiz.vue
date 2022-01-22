<template>
     <div id="container">
        <div style="position:relative;height:300px;">
            <Loading :visible="loading"></Loading>
            <div v-if="this.movie != null && this.endProgress == false && this.loading == false" :style="this.loading == true ? 'visibility:hidden' : ''"  class="quiz-container">
                <div>{{ this.getCurrentQuizQuestion() }}</div>
                <div v-if="this.answerOptions.length > 0" id="options" class="answer-options">
                <div v-for="option in this.answerOptions" :key="option">
                    <ButtonOption v-on:btdefaultclicked="checkAnswer(option)" :textButton="option"></ButtonOption>
                </div>
                </div>
            </div>
        </div>
        <div v-if="endProgress">
            <div>Obrigado por jogar! :)</div>
            <div>Você acertou <b>{{this.score}}</b> questões!</div>
        </div>
        <div id="buttonsQuiz">
            <ButtonAction v-if="this.currentQuestion == 0" v-on:btdefaultclicked="startQuiz" :textButton="this.nextButtonText"></ButtonAction>
            <ButtonDefault v-if="this.currentQuestion > 0" v-on:btdefaultclicked="stopQuiz" textButton="Encerrar Quiz"></ButtonDefault>
            <ButtonDefault v-if="this.currentQuestion > 0" v-on:btdefaultclicked="startQuiz" :textButton="this.nextButtonText"></ButtonDefault>
        </div>
    </div>
</template>

<script>
import ButtonDefault from '../shared/button-default/ButtonDefault.vue';
import Loading from '../shared/loading/Loading.vue';
import ButtonOption from '../shared/button-option/ButtonOption.vue';
import ButtonAction from '../shared/button-action/ButtonAction.vue';
import Cache from '../../core/cache';
import Movie from '../../core/Movie';

export default {
  data () {
    return {
        movie: new Movie(),
        currentQuestion: 0,
        movies: ['Inception', 'Interstellar', 'Dunkirk', 'Get Out', "Gravity", 'Gone Girl', 'Wonder Woman', 'Inside Out'],
        props: ['visible'],
        indexMovie: 0,
        score: 0,
        endProgress: false,
        loading: false,
        answerOptions: [],
        currentMovie: null,
        nextButtonText: "Iniciar",
        cache: new Cache()
    }
  },
  methods: {
      startQuiz() {
        this.endProgress = false;
        if (this.currentQuestion == 0 && this.indexMovie == 0) {
            this.score = 0;
        }
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
            this.movie.requestMovieImdb(this.currentMovie).then(() => {
                this.loading = false;
                this.getAnswerOptionsCurrentMovie();
            });
        }
      },
      stopQuiz() {
          this.endProgress = true;
          this.nextButtonText = 'Jogar novamente';
          this.indexMovie = 0;
          this.currentQuestion = 0;
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
             'Gal Gadot', 'George Clooney', 'Anne Hathaway', 'Daniel Kaluuya', 'Allison Williams'];
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
      checkAnswer(option) {
          if (this.currentQuestion == 1 && option == this.movie.year) {
              this.score++;
          } else if (this.currentQuestion == 2 && option == this.movie.cast) {
              this.score++;
          } else if (this.currentQuestion == 3 && option == this.movie.rank) {
              this.score++;
          }
          this.startQuiz();
      }
  },
  mounted() {
      this.visible = false;
      console.log();
  },
  components: {
      ButtonDefault,
      Loading,
      ButtonOption,
      ButtonAction
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
