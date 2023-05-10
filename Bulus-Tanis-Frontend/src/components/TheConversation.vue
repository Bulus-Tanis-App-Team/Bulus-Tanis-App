<template>
  <div
    class="text"
    :class="whoSend ? 'active' : ''"
    @click="setHover"
  >
    <p class="">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ["mail", "message","userMail"],

  data() {
    return {
      whoSend: false,
      isHovering: false,
    };
  },

  methods: {
      setHover(){
        this.isHovering= !this.isHovering;
      },
      whoSendMessage(){
        if(this.mail==this.userMail){
          this.whoSend=true;
        }
        else{
          this.whoSend=false;
        }
      },
  },
  mounted() {
    this.whoSendMessage();
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
