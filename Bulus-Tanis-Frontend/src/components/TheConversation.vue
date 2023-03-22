<template>
  <div
    class="text"
    :class="otherMsg ? 'active' : ''"
    @click="setHover"
  >
    <p class="">{{ Text }}</p>

    <button v-on:click="deleteChat(Id)" v-if="isHovering">Delete</button>
  </div>
</template>

<script>
export default {
  props: ["Id", "Text", "UserId", "UserId2"],

  data() {
    return {
      otherMsg: false,
      isHovering: false,
    };
  },

  methods: {
      setHover(){
        this.isHovering= !this.isHovering;
      },
    setOtherMsg() {
      if (this.UserId2 !== this.$store.getters["user/loggedUserId"]) {
        this.otherMsg = true;
      }
    },

    deleteChat(id) {
      //  console.log(id)
      fetch(`https://localhost:44313/api/delete/chat/${id}`, {
        method: "GET",
      }).then((response) => {
        if (response.ok) {
          return response.json();
          //console.log(response)
        }
      });
    },
  },
  mounted() {
    this.setOtherMsg();
  },
};
</script>

<style scoped>
.text {
  background: rgba(255, 255, 255, 0.719);
  margin-left: 10px;
  padding: 10px;
  border-radius: 10px;
  width: 70%;
  margin-top: 10px;
}
.active {
  background: rgba(0, 162, 255, 0.568);
}

button,a {
  text-decoration: none;
  padding: 0.3rem 0.5rem;
  font: inherit;
  background-color: #b4302ba1;
  border: 0;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  font-size: 10px;
  margin-bottom: 6px;
}
</style>
