<template>
  <div class="login">
    <input type="text" v-model="$store.state.currentUser.userName" required placeholder="Введите Логин">
    <input type="password" v-model="$store.state.currentUser.password" required placeholder="Введите Пароль">
    <input type="email" v-model="$store.state.currentUser.email" required placeholder="Введите Email">
    <button @click="createNewUser">Login</button>
    <button class="changeForm" @click="changeLogReg">Войти по логину и паролю</button>
  </div>
</template>

<script>

export default {
  name: "CreateUser",
  methods: {
    async createNewUser () {
      let response = await fetch('https://trello.backend.tests.nekidaem.ru/api/v1/users/create/', {
        method: "POST",
        headers: {
          "Authorization": "bearer",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username":this.$store.state.currentUser.userName,
          "email":this.$store.state.currentUser.password,
          "password":this.$store.state.currentUser.email
        })
      })
      console.log(response)
    },
    changeLogReg() {
      this.$store.commit('changeLogReg')
    }
  }
}
</script>

<style scoped>

</style>
  <!--"username":"Tryebefuhefh","email":"Tryebefuhefh@gmail.com","password":"Tryebefuhefh"-->