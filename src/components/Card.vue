<template>
  <div class="card" draggable="true"
      @dragstart="onDragstart($event, title)">
    <h3>id: {{ title }}</h3> <span class="delete-button" @click="deleteCard(title)">delete</span>
    <p>{{ text }}</p>
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: {
      title: {
        type: Number
      },
      text: {
        type: String
      },
      row: {
        type: String
      }
    },
    methods: {
      onDragstart(e, title) {
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('cardId', title.toString())
      },
      async deleteCard(cardId) {
        let token = localStorage.getItem('token')
        let response = await fetch(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${cardId}/`, {
          method: 'DELETE',
          headers: {
            "Authorization": "JWT " + token,
            "Content-Type": "application/json",
          }
        })
        if(!response.ok) {
          alert('OOps')
        }
      }
    },

  }
</script>

<style>
.card {
  width: 90%;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.97);
  text-align: left;
  background: rgba(159, 159, 165, 0.97);
  padding-left: 10px;
  border: 1px solid rgba(255, 255, 255, 0.67);
  box-sizing: border-box;
  margin-top: 15px;
  margin-bottom: 15px;
  position: relative;
}
.delete-button{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
