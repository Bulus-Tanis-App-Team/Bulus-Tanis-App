<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div class=" col-12 row list mt-3 " >
        <div class="img col-2"><img src="https://media.istockphoto.com/vectors/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-vector-id1130884625?k=20&m=1130884625&s=612x612&w=0&h=OITK5Otm_lRj7Cx8mBhm7NtLTEHvp6v3XnZFLZmuB9o=" alt="">
        </div>
        <div class="col-6 ">
           <div class="name m-0">
            <p>{{friendName}}</p>
           </div>
           <div class="mb-2">
            <button @click="setMessagingPanel">Mesajlaş</button>
           </div>
        </div>
    </div> 
</template>

<script>
export default {
  props: ['friendName','friendEmail'],

  data() {
    return {
    };
  },
  emits:['set-messaging-panel'],
  created() {

  },
  methods:{
    setMessagingPanel(){
      this.$emit('set-messaging-panel',{userNameGetMessage: this.friendName,userMailGetMessage: this.friendEmail});
    }
  },
  mounted() {
    
  },

};

</script>

<style scoped>
  .list:hover{
    background: rgba(103, 14, 186, 0.499);
  }
  
  button,a {
    text-decoration: none;
    padding: 0.2rem 0.5rem;
    font: inherit;
    background-color: #3a0061;
    border: 1px solid #3a0061;
    color: white;
    cursor: pointer;
    border-radius: 30px;
    font-size: 10px;
    margin-bottom: 6px;
    margin-left: 10px;
  }

  img{
      height: 40px;
      width: 40px;
      border-radius: 50%;
  }
  .name p{
      margin: 0;
      margin-left: 15px;
      white-space: nowrap;
  }
  .list{
    padding-top: 4px;
    height: 4rem;
    transition: 0.3s ease-in;
  }
</style>