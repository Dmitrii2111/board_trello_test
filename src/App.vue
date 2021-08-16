<template>
<!-- test -->
  <div id="app">
    <button class="logout-button" @click="logOut">Logout</button>
    <div class="container" v-if="$store.state.loggedIn === 'logged'">
      <Column v-for="column in $store.state.columnTitles"
              :id="column.row"
              :dataId="column.row"
              :key="column.row"
              :column-title="column.name"
              :titleColor="column.back"
      ></Column>
    </div>
    <div class="container-log_reg" v-else>
      <login v-if="$store.state.log"></login>
      <create-user v-else></create-user>
    </div>

  </div>


</template>

<script>
import Column from './components/Column.vue'
import CreateUser from './CreateUser'
import Login from './Login'
import store from './store/store'

export default {
  name: 'App',
  store,
  components: {CreateUser, Login, Column},
  methods: {
    async getCards() {
      let token = localStorage.getItem('token')
      let result = await fetch('https://trello.backend.tests.nekidaem.ru/api/v1/cards/', {
        method: 'GET',
        headers: {
          "Authorization": "JWT " + token,
          "Content-Type": "application/json",
        },
      })
      let data = await result
      if(data.status === '401') {
        this.logOut()
      } else {
        let cards = await data.json()
        this.$store.state.currentCards =  cards
      }


    },
    logOut() {
      localStorage.removeItem('token')
      this.$store.state.loggedIn = 'unLogged'
    },
  },
  created() {
      this.getCards()
  },
  mounted() {
    if(localStorage.getItem('token')) {
      this.$store.state.currentUser.token = localStorage.getItem('token')
      this.$store.state.loggedIn = 'logged'
      this.getCards()
    }
  }

}
</script>

<style>
body{
  margin: 0;
  background: #000000;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  padding-top: 4rem;
}
.container {
  display: flex;
  justify-content: space-around;
}
.container-log_reg{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logout-button{
  position: absolute;
  min-width: 60px;
  max-width: 12%;
  top: 10px;
  right: 20px;
}
</style>
