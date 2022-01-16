<template>
 <div class="item-header">
    <button type="button" class="button-default"  @click="$emit('btdefaultclicked', $event.target.checked)">
        {{ this.textButton }}
    </button>
 </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props:['textButton']
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;1,300;1,500&display=swap');

.button-default {
    min-width: 150px;
    max-width: 250px;
    border: 1px solid #FFF;
    padding: 5px 10px;
    margin: 15px 15px;
    cursor: pointer;
    background-color: transparent;
    color: #FFF;
    font-family: 'Roboto', sans-serif;
    transition: all ease 0.8s;
    border-radius: 8px;
}

.button-default:hover {
  cursor: pointer;
  box-shadow: inset 150px 0 0 0 #424242;
}

</style>
