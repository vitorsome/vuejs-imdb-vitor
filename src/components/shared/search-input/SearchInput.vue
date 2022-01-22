<template>
  <div class="search-input">
    <input type="text" :id="id" :placeholder="placeholder"/>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  props: ['id', 'placeholder']
}
</script>

<style scoped>

.search-input input {
  min-width: 350px;
  max-width: 500px;
  height: 32px;
  color: #FFF;
  background-color: transparent;
  border: 1px solid #FFF;
  border-radius: 8px;
}

</style>
