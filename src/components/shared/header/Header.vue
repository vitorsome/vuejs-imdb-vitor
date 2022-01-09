<template>
  <div id="header">
      <img src="" alt="logo"/>
      <div class="menu-header">
        <ItemHeader href="">Sobre mim</ItemHeader>
        <ItemHeader href="experience">Minha experiência</ItemHeader>
        <ItemHeader href="projeto">Este projeto</ItemHeader>
      </div>
  </div>
</template>

<script>
import ItemHeader from '../item-header/ItemHeader';

export default {
  data () {
    return {
      
    }
  },
  components:{
    ItemHeader:ItemHeader
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;1,500&display=swap');

#header {
  width: 100%;
  font-family: 'Roboto', sans-serif;
}

.menu-header {
    display: flex;
    justify-content: center;
}
</style>
