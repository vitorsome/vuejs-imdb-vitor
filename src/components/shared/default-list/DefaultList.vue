<template>
    <div>
        <table v-if="items.length > 0" :id="id">
            <thead>
                <th></th>
                <th>Nome</th>
                <th>Ano</th>
                <th>Estrelando</th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td>
                    <img v-if="typeof item.i != 'undefined'" :src="item.i.imageUrl">
                </td>
                <td>{{ item.l }}</td>
                <td>{{ item.y }}</td>
                <td>{{ item.s }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  props: ['id','items']
}
</script>

<style scoped>

    table {
        width: 100%;
        padding: 20px 40px;
        text-align: center;
    }

    table td {
        cursor: pointer;
        border-top: 1px solid #FFF;
    }

    table img {
        width: 50px;
    }

    @media (max-width: 800px) {
        table {
            padding: 20px 10px;
        }
    }
</style>
