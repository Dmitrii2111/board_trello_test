<template>
<div class="login">
  <input type="text" v-model="$store.state.currentUser.userName" required placeholder="Введите Логин">
  <input type="password" v-model="$store.state.currentUser.password" required placeholder="Введите Пароль">
  <button @click="login">Вход</button>
  <button class="changeForm" @click="changeLogReg">Зарегистрироваться</button>
</div>
</template>

<script>
import store from './store/store'

export default {
  name: "Login",
  store,
  methods: {
    async login() {
      let response = await fetch('https://trello.backend.tests.nekidaem.ru/api/v1/users/login/', {
        method: "POST",
        headers: {
          "Authorization": "bearer",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username":this.$store.state.currentUser.userName,
          "password":this.$store.state.currentUser.password
        })
      })
      if (response.ok) {
        this.$store.state.loggedIn = 'logged'
        let result = await response.json()
        this.$store.commit('setData', result.token)
      } else {
        this.$store.state.loggedIn = 'unLogged'
      }
    },
    changeLogReg() {
      this.$store.commit('changeLogReg')
    }
  },

}
</script>

<style>

.login {
  width: 20%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #686363;
  border-radius: 20px;
  padding: 3% 3% 0;
  box-shadow: 13px 10px 26px 9px rgba(246, 237, 237, 0.22);
}
input, button {
  width: 90%;
  border: none;
  border-radius: 10px;
  outline: none;
  padding: 10px;
}
button:hover {
  cursor: pointer;
}
button {
  background: rgba(52, 175, 26, 0.75);
  color: white;
}
.changeForm{
  background: transparent;
  border: none;
  color: #0c7ae0;
  text-decoration: underline;
}
</style>