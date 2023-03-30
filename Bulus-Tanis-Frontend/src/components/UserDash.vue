<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />

  <div class="row  g-0 z bg-danger">
    <div class="col-3 all-user shadow-lg p-3">

      <div>
  <button type="button" class="btn btn-primary konumara-btn" data-bs-toggle="modal" data-bs-target="#modalsearch" >Konum Ara</button>
</div>

<div>
  <button type="button" class="btn btn-primary profile-btn" data-bs-toggle="modal" data-bs-target="#modalprofile" >Profil</button>
</div>

<div class="modal fade" id="modalsearch" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Konum Ara</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <label for="country">Ülke:</label>
          <input type="text" id="country" name="country"><br>

          <label for="city">Şehir:</label>
          <input type="text" id="city" name="city"><br>

          <label for="district">İlçe:</label>
          <input type="text" id="district" name="district"><br>

          <label for="neighborhood">Mahalle:</label>
          <input type="text" id="neighborhood" name="neighborhood"><br>

          <button type="submit">Ara</button>
        </form>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>
</div>

<!-- Profile modal -->
<div class="modal fade" id="modalprofile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Profil</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <label for="name">Profil İsmi:</label>
          <input type="text" id="name" name="name" value="<?php echo $profile['name']; ?>"><br>

          <label for="country">Ülke:</label>
          <input type="text" id="country" name="country" value="<?php echo $profile['country']; ?>"><br>

          <label for="city">Şehir:</label>
          <input type="text" id="city" name="city" value="<?php echo $profile['city']; ?>"><br>

          <label for="district">İlçe:</label>
          <input type="text" id="district" name="district" value="<?php echo $profile['district']; ?>"><br>

          <label for="neighborhood">Mahalle:</label>
          <input type="text" id="neighborhood" name="neighborhood" value="<?php echo $profile['neighborhood']; ?>"><br>

          <button type="submit">Kaydet</button>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalupdate">Değişiklik Yap</button>
        </form>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>
</div>


<!-- Update modal -->
<div class="modal fade" id="modalupdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Profil Değişiklik Yap</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <label for="name">Profil İsmi:</label>
          <input type="text" id="name" name="name"><br>

          <label for="country">Ülke:</label>
          <input type="text" id="country" name="country"><br>

          <label for="city">Şehir:</label>
          <input type="text" id="city" name="city"><br>

          <label for="district">İlçe:</label>
          <input type="text" id="district" name="district"><br>

          <label for="neighborhood">Mahalle:</label>
          <input type="text" id="neighborhood" name="neighborhood"><br>

          <div class="mb-3">
            <label for="image" class="form-label">Profil Resmi:</label>
            <input class="form-control" type="file" id="image" name="image">
          </div>

          <button type="submit">Kaydet</button>
        </form>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>
</div>

      <div class="text-center mb-2 p-0"><h3>Chat List</h3></div>
      <all-user
        v-for="result in results"
        :key="result.Id"
        :Id="result.Id"
        :FirstName="result.FirstName"
        :LastName="result.LastName"
        :Email="result.Email"
        @convo="convo"
      >
      </all-user>
    </div>

    <div class="col-9 convo">
      <div class="col-12 mt-1  all-msg">
        <div class="m-3">
          <img  v-if="chatterName"         
          src="https://media.istockphoto.com/vectors/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-vector-id1130884625?k=20&m=1130884625&s=612x612&w=0&h=OITK5Otm_lRj7Cx8mBhm7NtLTEHvp6v3XnZFLZmuB9o="
          alt=""
        />
        <span
          v-if="chatterName"
          class="shadow-lg bg-white rounded-pill mt-1 me-1 ps-3 pe-3"
          ><b>{{ chatterName }}</b></span
        >
        <button @click="logout" type="button" class="btn btn-danger">Logout</button>
        </div>

       <div  v-if="chatterName">
        <the-conversation 
          v-for="x in results2"
          :key="x.Id"
          :Id="x.Id"
          :Text="x.Text"
          :UserId="x.UserId"
          :UserId2="x.UserId2"
        ></the-conversation>
       </div>
      </div>

      <form @submit.prevent="sendMsg" class="w-75" action="">
        <div class="send-msg">
          <div>
            <input
              type="text"
              class="form-control  inpt"
              placeholder="Enter Your Message"
              aria-label="Enter Your Message"
              aria-describedby="basic-addon2"
              v-model="Text"
            />
          </div>
          <div>
            <button type="submit" class="btn btn-primary send-btn">Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AllUser from "./AllUser.vue";
import TheConversation from "./TheConversation.vue";
export default {
  components: {
    AllUser,
    TheConversation,
  },
  data() {
    return {
      results: [],
      results2: [],
      loggedMail: "",
      Text: "",
      Id1: "",
      Id2: "",
      chatterName: "",
      
    };
  },

  computed: {
  },

  created() {
    this.loggedMail = this.$store.getters["user/loggedEmail"];
    this.GetLoggedUser();
  },
  methods: {
    logout(){
      this.$router.replace('/');
      this.results2=[];
      this.$store.reset();
    },
    sendMsg() {
      // alert()
      this.Id1 = this.$store.getters["user/loggedUserId"];
      this.Id2 = this.$store.getters["user/getId2"];
      //console.log("vvv"+ this.chatterName)
      fetch("https://localhost:44313/api/create/messsage/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Text: this.Text,
          UserId: this.Id1,
          UserId2: this.Id2,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not save the data");
          } else {
            this.Text = "";
            this.UserId = "";
            this.UserId2 = "";
          }
        })
        .catch((error) => {
          this.error = error;
          console.log(error);
        });
    },
    async loadUsers() {
      await fetch("https://localhost:44313/api/all/user", {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
            //console.log(response)
          }
        })
        .then((data) => {
          //   console.log(data)
          const results = [];
          for (const id in data) {
            results.push({
              Id: data[id].Id,
              FirstName: data[id].FirstName,
              LastName: data[id].LastName,
              Email: data[id].Email,
            });
          }
          //console.log(results)
          const UserIndex = results.findIndex(
            (x) => x.Id === this.$store.getters["user/loggedUserId"]
          );

          results.splice(UserIndex, 1);
          this.results = results;
          console.log(UserIndex);
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error;
        });
    },
    async GetLoggedUser() {
      await fetch(
        `https://localhost:44313/api/login/user/${this.loggedMail}/`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
            //console.log(response)
          }
        })
        .then((data) => {
          console.log(data.Id);
          this.$store.dispatch("user/addUserDetail", {
            Id: data.Id,
            FirstName: data.FirstName,
            LastName: data.LastName,
          });
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error;
        });
    },

    convo(value) {
      // alert();
      // console.log(value);
      this.chatterName = value;
      // console.log(this.Id2)
      //console.log(this.results2);
    },

    allMessages() {
      this.Id1 = this.$store.getters["user/loggedUserId"];
      this.Id2 = this.$store.getters["user/getId2"];
      fetch(
        `https://localhost:44313/api/all/coversation/${this.Id1}/${this.Id2}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
            //console.log(response)
          }
        })
        .then((data) => {
          //   console.log(data)
          const results = [];
          for (const id in data) {
            results.push({
              Id: data[id].Id,
              Text: data[id].Text,
              UserId: data[id].UserId,
              UserId2: data[id].UserId2,
            });
          }
          this.results2 = results;
          //   console.log(this.results)
        })
        .catch((error) => {
          console.log(error);
          // alert(error)
        });
    },
  },
  mounted() {
    this.loadUsers();
    setInterval(this.allMessages, 2000);
  },
};
</script>

<style scoped>
.all-msg {
  height: 70%;
  overflow-y: scroll;
}
.send-btn {
  margin-top: 10px;
  float: right;
}
.konumara-btn{
    position:relative;
    left: +170px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.inpt {
  border: 0;
  margin-bottom: 15px;

  margin-left: 20px;
  margin-right: 10px;
  margin-top:60px;
  width:98%;
}
.inpt::placeholder {
  font-family: Arial, Helvetica, sans-serif;
}
.all-user {
  background: rgba(255, 255, 255, 0.562);
  overflow-y:scroll;
  height: 100%;
}
.send-msg{
  overflow: hidden;
}
img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
.covo {
  margin-left: 10px;
}
.z {
  background: linear-gradient(#06bfd44f, #164182b6);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  height: 100vh;
}

form {
  font-family: Arial, sans-serif;
  width: 400px;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 10px;
}

input[type=text], input[type=email], input[type=tel],input[type=message] {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 10px;
}

button[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

button[type=submit]:hover {
  background-color: #45a049;

}


</style>