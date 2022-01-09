<template>
  <div class="container-loading">
    <div v-show="visible" class="loading"></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  props: ['id', 'visible'],  
}
</script>

<style scoped>
  .loading {
    height: 40px;
    width: 40px;
    border: 3px solid #FFF;
    border-right: none;
    border-top: none;
    animation: rotation 2s infinite linear;
    border-radius: 30px;
    position: absolute;
    top:50%;
    left: 50%;
  }

  @keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}


</style>
