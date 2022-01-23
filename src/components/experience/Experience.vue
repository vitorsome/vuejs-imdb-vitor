<template>
    <div>
        <h1>Sobre este projeto</h1>
        <p>
            Este projeto foi totalmente desenvolvido com o framework <a href="https://vuejs.org/" target="_blank">VueJS</a>.
        </p>
        <p>Ainda, as informações de filmes são obtidas através de uma API com informações do <a href="https://www.imdb.com/" target="_blank">iMDB</a>.</p>
        <p>O código fonte desse projeto pode ser visto no <a href="https://github.com/vitorsome/vuejs-imdb-vitor" target="_blank">Github do desenvolvedor.</a></p>
        

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
       font-size: 24px;
       text-align: center;
    }

    a {
        color: #FFF;
        font-weight: bold;
    }

    p {
        margin-left: 50px;
    }

    @media (max-width: 768px) {
        p {
            margin-left: 0;
        }
    }
</style>
