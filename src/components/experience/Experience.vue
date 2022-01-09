<template>
    <div>
        <h1>A experiência de {{ nome }} com Vue.js</h1>
        <img />
    </div>
</template>

<script>

export default {
  data () {
    return {
        nome: 'Vitor'
    }
  }
}
</script>

<style scoped>
    h1 {
        font-size: 30px;
        color: blue;
    }
</style>
