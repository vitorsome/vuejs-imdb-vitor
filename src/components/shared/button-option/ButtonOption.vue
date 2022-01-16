<template>
 <div class="item-header">
    <button type="button" class="button-option"  @click="$emit('btdefaultclicked', $event.target.checked)">
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

.button-option {
        background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
        border-radius: 8px;
        border-style: none;
        box-sizing: border-box;
        color: #FFFFFF;
        cursor: pointer;
        flex-shrink: 0;
        font-family: "Inter UI","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
        font-size: 16px;
        font-weight: 500;
        height: 40px;
        padding: 0 1.6rem;
        text-align: center;
        text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
        transition: all .5s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        margin: 10px 5px;
        min-width: 400px;
    }

    .button-option:hover {
        box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
        transition-duration: .1s;
    }

    @media (min-width: 768px) {
        .button-option {
            padding: 0 2.6rem;
        }
    }

</style>
