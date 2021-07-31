<template>
  <div class="column"
       @drop="onDrop($event, dataId)"
       @dragover.prevent
       @dragenter.prevent

  >
    <div class="column-title" :class="titleColor">{{columnTitle}}</div>
    <Card v-for="(card) in $store.state.currentCards.filter(e => +e.row === dataId)"
          :key="card.id"
          :id="card.row"
          :title="card.id"
          :text="card.text"
          :row="card.row"

    ></Card>
    <textarea v-if="activeAdding" rows="5" cols="20" v-model="$store.state.newCard.cardText"></textarea>
    <button class="add-button" @click="openNewTaskInput"> <span>+</span> Добавить</button>
  </div>
</template>

<script>
import Card from "@/components/Card";
import store from "@/store/store";

export default {
  name: "Column",
  components: {Card},
  store,
  data() {
    return {
      activeAdding: false,
      taskValue: []
    }
  },
  props: {
    columnTitle: {
      type: String,
      default: 'Column type'
    },
    titleColor: {
      type: String,
      default: 'orange'
    },
    dataId: {
      type: Number
    }
  },
  methods: {
    openNewTaskInput(event) {
      if(this.activeAdding && this.$store.state.newCard.cardText) {
        this.createNewCard(event)
      }
      this.activeAdding = !this.activeAdding
      this.$store.state.newCard.cardText = ''
    },
    async createNewCard(event) {
      //Формируем новую карточку
      console.log(event.target.parentElement)
      let token = localStorage.getItem('token')
      this.$store.state.newCard.row = event.target.parentElement.getAttribute('id')
      let response = await fetch('https://trello.backend.tests.nekidaem.ru/api/v1/cards/',{
        method: 'POST',
        headers: {
          "Authorization": "JWT " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "row": this.$store.state.newCard.row,
          "text": this.$store.state.newCard.cardText
        })
      })
      let data = await response.json()
      console.log(data)
    },
    async refreshCard(card) {
      let token = localStorage.getItem('token')
      let res = await fetch(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${card.id}/`,{
        method: 'PATCH',
        body: JSON.stringify({
          "row": card.row,
          "seq_num": card.seq_num,
          "text": card.text
        }),
        headers: {
          "Authorization": "JWT " + token,
          "Content-Type": "application/json"
        }
      })
      if(!res.ok) {
        alert('Oops!')
      }
    },
    onDrop(e, columnId) {
      const cardId = +e.dataTransfer.getData('cardId')
      this.$store.state.currentCards.forEach(e => {
        if(e.id === cardId ) {
          e.row = columnId.toString()
          this.refreshCard(e)
        }
      })
    }
  },


}
</script>

<style scoped>
.column {
  width: 23%;
  background: rgba(73, 72, 72, 0.81);
}
  .orange {
    background: #ff6600;
  }
  .blue {
    background: #045bad;
  }
  .yellow {
       background: #eebf15;
     }
  .green {
    background: green;
  }
  .column-title{
    width: 100%;
    padding: 1rem 0;
    text-transform: uppercase;
    color: #ffffff;
  }
  .add-button{
    border: 1px solid white;
    border-radius: unset;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 auto;
    background: transparent;
    margin-bottom: 10px;
  }
  textarea{
    box-sizing: border-box;
    width: 90%;
    background: transparent;
    outline: none;
    color: white;
    padding-left: 10px;
  }
</style>