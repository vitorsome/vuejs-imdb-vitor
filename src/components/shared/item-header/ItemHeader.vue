<template>
 <div class="item-header">
     <i></i>
     <router-link :to="this.href ? this.href :'/' ">
        <slot></slot>
     </router-link>
 </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props:['href']
}
</script>

<style scoped>

.item-header {
  margin: 10px 30px;
  display: flex;
  color: #FFF;
}

.item-header a {
  color: white;
}

.item-header a:visited {
  color: #FFF;
}

</style>
