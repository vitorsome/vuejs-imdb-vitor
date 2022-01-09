<template>
  <div id="app">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
  
import Header from './components/shared/header/Header';

export default {
  name: 'app',
  components: {
    'my-header':Header
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

body {
  background-color: #121212;
  color: #FFF;
  font-family: 'Roboto', sans-serif;
}


</style>
