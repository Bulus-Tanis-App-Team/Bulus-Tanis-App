<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />
  <div
    id="friendshipStatusAlert"
    name="friendshipStatusAlert"
    class="alert position-fixed"
    role="alert"
    style="display: none"
  >
    {{ this.friendshipMesaj }}
  </div>
  <div class="row g-0 z bg-danger">
    <div class="col-3 all-user shadow-lg p-3">
      <div>
        <button
          type="button"
          class="btn btn-primary konumara-btn"
          data-bs-toggle="modal"
          data-bs-target="#modalsearch"
        >
          Konum Ara
        </button>
      </div>

      <div>
        <button
          type="button"
          class="btn btn-primary profile-btn"
          data-bs-toggle="modal"
          data-bs-target="#modalprofile"
        >
          Profil
        </button>
      </div>

      <div
        class="modal fade"
        id="modalsearch"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Konum Ara</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" id="konumAraModalBody">
              <form>
                <label for="searchingCountry">Ülke:</label>
                <input
                  type="text"
                  id="searchingCity"
                  v-model.trim="searchingCountry"
                /><br />

                <label for="searchingCity">Şehir:</label>
                <input
                  type="text"
                  id="searchingCity"
                  v-model.trim="searchingCity"
                /><br />

                <label for="searchingDistrict">İlçe:</label>
                <input
                  type="text"
                  id="searchingDistrict"
                  v-model.trim="searchingDistrict"
                /><br />

                <label for="searchingNeighbourhood">Mahalle:</label>
                <input
                  type="text"
                  id="searchingNeighbourhood"
                  v-model.trim="searchingNeighbourhood"
                /><br />

                <button type="submit" @click="getSearchingUsers">Ara</button>
              </form>
            </div>
            <div
              class="modal-body"
              id="searchedUserModalBody"
              style="display: none"
            >
              <button class="btn btn-secondary" @click="backSearchingUsers">
                Geri
              </button>
              <searched-user
                v-for="user in searchingUsers"
                :key="user.userMail"
                :userName="user.userName"
                :userMail="user.userMail"
                :userCountry="user.userCountry"
                :userCity="user.userCity"
                :userDistrict="user.userDistrict"
                :userNeighbourhood="user.userNeighbourhood"
                @friendship-alert-emit="updateFriendshipStatusEmit"
                @add-all-friends-list-emit="handleAddAllFriendsListEmit"
              >
              </searched-user>
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>

      <!-- Profile modal -->
      <div
        class="modal fade"
        id="modalprofile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Profil</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <label for="name">Profil İsmi:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  v-model="userName"
                /><br />

                <label for="country">Ülke:</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  v-model="userCountry"
                /><br />

                <label for="city">Şehir:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  v-model="userCity"
                /><br />

                <label for="district">İlçe:</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  v-model="userDistrict"
                /><br />

                <label for="neighborhood">Mahalle:</label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  v-model="userNeighbourhood"
                /><br />

                <button type="submit">Kaydet</button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalupdate"
                >
                  Değişiklik Yap
                </button>
              </form>
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>

      <!-- Update modal -->
      <div
        class="modal fade"
        id="modalupdate"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Profil Değişiklik Yap
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <label for="name">Profil İsmi:</label>
                <input type="text" id="name" name="name" /><br />

                <label for="country">Ülke:</label>
                <input type="text" id="country" name="country" /><br />

                <label for="city">Şehir:</label>
                <input type="text" id="city" name="city" /><br />

                <label for="district">İlçe:</label>
                <input type="text" id="district" name="district" /><br />

                <label for="neighborhood">Mahalle:</label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                /><br />

                <div class="mb-3">
                  <label for="image" class="form-label">Profil Resmi:</label>
                  <input
                    class="form-control"
                    type="file"
                    id="image"
                    name="image"
                  />
                </div>

                <button type="submit">Kaydet</button>
              </form>
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>

      <div class="text-center mb-2 p-0"><h3>Arkadaş Listesi</h3></div>
      <all-friends
        v-for="friend in allFriends"
        :key="friend.userMail"
        :friendName="friend.userName"
        :friendEmail="friend.userMail"
        @set-messaging-panel="handleSetMessagingPanel"
      >
      </all-friends>
    </div>

    <div class="col-9">
      <div class="col-12 mt-1">
        <div class="m-3">
          <img
            v-if="userNameGetMessage"
            src="https://media.istockphoto.com/vectors/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-vector-id1130884625?k=20&m=1130884625&s=612x612&w=0&h=OITK5Otm_lRj7Cx8mBhm7NtLTEHvp6v3XnZFLZmuB9o="
            alt=""
          />
          <span
            v-if="userNameGetMessage"
            class="shadow-lg bg-white rounded-pill mt-1 me-1 ps-3 pe-3"
            ><b>{{ userNameGetMessage }}</b></span
          >
          <button @click="logout" type="button" class="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
      <div class="chat-container">
        <div v-if="userNameGetMessage" class="message-container">
          <the-conversation
            v-for="message in allMessagesWithFriend"
            :key="message._id"
            :mail="message.userMailSendMessage"
            :message="message.message"
            :userMail="userMail"
          ></the-conversation>
        </div>
      </div>
      <div class="col-12 mt-1">
        <form class="w-75">
          <div>
            <div>
              <input
                type="text"
                class="form-control inpt"
                placeholder="Enter Your Message"
                aria-label="Enter Your Message"
                aria-describedby="basic-addon2"
                v-model="message"
              />
            </div>
            <div>
              <button
                class="btn btn-primary send-btn"
                @click="sendMessage"
                v-if="userMailGetMessage"
              >
                Gönder
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AllFriends from "./AllFriends.vue";
import SearchedUser from "./SearchedUser.vue";
import TheConversation from "./TheConversation.vue";
import axios from "axios";
import { BASE_URL } from "../../config.backend";
import { io } from "socket.io-client";
export default {
  components: {
    AllFriends,
    TheConversation,
    SearchedUser,
  },
  data() {
    return {
      results: [],
      results2: [],
      userName: "",
      userMail: "",
      userCountry: "",
      userCity: "",
      userDistrict: "",
      userNeighbourhood: "",
      searchingCountry: "",
      searchingCity: "",
      searchingDistrict: "",
      searchingNeighbourhood: "",
      searchingUsers: [],
      searchURL: "",
      friendshipMesaj: "",
      friendshipStatus: false,
      allFriends: [],
      userNameGetMessage: "",
      userMailGetMessage: "",
      allMessagesWithFriend: [],
      message: "",
      textSocket: "",
      loggedMail: "",
      Id1: "",
      Id2: "",
      chatterName: "",
    };
  },

  computed: {},

  created() {
    //this.loggedMail = this.$store.getters["user/loggedEmail"];
    //this.GetLoggedUser();
    this.getUserInfo();
    this.socket = io(BASE_URL, {
      query: {
        userMail: this.userMail,
      },
    });
    this.socket.on("getMessage", (data) => {
      console.log("Mesaj alındı:", data);
      // if bloğunu yazmassak olan şey:
      // bahadır ve mehmet konusuyor
      // ayşe bahadura mesaj attığında
      //ayşenin mesajı bahadırın mehmetle olna chatine düşüyor // db tarafında sorun yok, mehmet bu mesahı göremez.
      //sadece bahadır için front-end hatası oluyor.
      if(data.userMailSendMessage == this.userMailGetMessage){        
        this.allMessagesWithFriend.push(data);
      }
    });
    this.socket.on("handleUpdateAllFriendsList", (data) => {
      //console.log('Yeni biri sizi eklendi:', data.userName);
      this.allFriends.push(data);
    });
  },
  methods: {
    async sendMessage() {
      let getMessagesURL = BASE_URL + "/message/send";
      await axios
        .post(getMessagesURL, {
          userMailSendMessage: this.userMail,
          userMailGetMessage: this.userMailGetMessage,
          message: this.message,
        })
        .then((res) => {
          this.allMessagesWithFriend.push(res.data.message);
          this.emitSocketSendedMessage();
          //console.log(res.data);
        })
        .catch((e) => {
          console.log(`sendMessage err: ${e}`);
        });
    },
    async handleAddAllFriendsListEmit(data) {
      this.allFriends.push(data);
      //socket ile karşı tarafan çevrim içi ise biz onu eklediğimizde onun listesine düşelim.
      //console.log("Eklemiş olduğunuz: "+data.userName+" kişisinin ekranı güncelleniyor");
      await this.socket.emit("updateAllFriendsList", {
        friend: data,
        userMail: this.userMail,
        userName: this.userName,
      });
    },
    async handleSetMessagingPanel({ userNameGetMessage, userMailGetMessage }) {
      this.userNameGetMessage = userNameGetMessage;
      this.userMailGetMessage = userMailGetMessage;
      let getMessagesURL = BASE_URL + "/message/get";
      await axios
        .post(getMessagesURL, {
          userMailSendMessage: this.userMail,
          userMailGetMessage: this.userMailGetMessage,
        })
        .then((res) => {
          this.allMessagesWithFriend = res.data;
          //console.log(res.data);
        })
        .catch((e) => {
          console.log(
            `handleSetMessagingPanel : getMessagesWithFriend err: ${e}`
          );
        });
      //console.log("şuan mesajlaşılan kişi: Name: " + userNameGetMessage+" | Email: "+userMailGetMessage);
    },
    async getAllFriends() {
      let getAllFriendsURL = BASE_URL + "/friends/get";
      await axios
        .post(getAllFriendsURL, {
          userMail: this.userMail,
        })
        .then((res) => {
          this.allFriends = res.data;
          //console.log(this.allFriends);
        })
        .catch((e) => {
          console.log(`getAllFriends err: ${e}`);
        });
    },
    async emitSocketSendedMessage() {
      // mesajın yollanması için back-end den mesaj başarıyla geçmeli. bu nedenle nack-end e send edilen kısmın response true
      //kısmına bu kod eklenicek
      console.log("emitSocketSendedMessage msj: " + this.message);
      await this.socket.emit("sendMessage", {
        userMailGetMessage: this.userMailGetMessage,
        userMailSendMessage: this.userMail,
        message: this.message,
      });
      this.message = "";
    },
    updateFriendshipStatusEmit({ status, message }) {
      this.friendshipStatus = status;
      this.friendshipMesaj = message;
      // console.log(
      //   "updateFriendshipStatusEmit: " +
      //     this.friendshipStatus +
      //     " " +
      //     this.friendshipMesaj
      // );
      var friendshipStatusAlert = document.getElementById(
        "friendshipStatusAlert"
      );

      if (this.friendshipStatus == true) {
        friendshipStatusAlert.classList.add("alert-success");
      } else {
        friendshipStatusAlert.classList.add("alert-danger");
      }

      friendshipStatusAlert.style.display = "block";

      // Belirli bir süre (20 saniye) sonra alert komponentini gizle
      setTimeout(function () {
        friendshipStatusAlert.classList.remove("alert-success");
        friendshipStatusAlert.classList.remove("alert-danger");
        friendshipStatusAlert.style.display = "none";
      }, 5000);
    },
    backSearchingUsers() {
      document.getElementById("konumAraModalBody").style.display = "block";
      document.getElementById("searchedUserModalBody").style.display = "none";
    },
    async getSearchingUsers() {
      this.searchURL = BASE_URL + "/search/get";
      await axios
        .post(this.searchURL, {
          searchingCountry: this.searchingCountry,
          searchingCity: this.searchingCity,
          searchingDistrict: this.searchingDistrict,
          searchingNeighbourhood: this.searchingNeighbourhood,
        })
        .then((res) => {
          this.searchingUsers = res.data; // bu veriyi diziyi atıp SearchedUser compenentinde bastırıyoruz.
          // this.searchingUsers.forEach(element => {
          //   console.log(element.userName);
          // });
          document.getElementById("konumAraModalBody").style.display = "none";
          document.getElementById("searchedUserModalBody").style.display =
            "block";
        })
        .catch((e) => {
          console.log(`getSearchingUsers err: ${e}`);
        });
    },
    getUserInfo() {
      this.userName = JSON.parse(localStorage.getItem("userName"));
      this.userMail = JSON.parse(localStorage.getItem("userMail"));
      this.userCountry = JSON.parse(localStorage.getItem("userCountry"));
      this.userCity = JSON.parse(localStorage.getItem("userCity"));
      this.userDistrict = JSON.parse(localStorage.getItem("userDistrict"));
      this.userNeighbourhood = JSON.parse(
        localStorage.getItem("userNeighbourhood")
      );
      //açıklama başla: genelde önce kendi konumumuzdaki kişileri arama eğilimindeyiz bu sebeple kendi konumumuz default olarak aranacak konuma atanır.
      this.searchingCountry = this.userCountry;
      this.searchingCity = this.userCity;
      this.searchingDistrict = this.userDistrict;
      this.searchingNeighbourhood = this.userNeighbourhood;
      //açıklama bitiş:
    },
    logout() {
      this.$router.replace("/");
      // this.results2=[];
      // this.$store.reset();
    },
    // sendMsg() {
    //   // alert()
    //   this.Id1 = this.$store.getters["user/loggedUserId"];
    //   this.Id2 = this.$store.getters["user/getId2"];
    //   //console.log("vvv"+ this.chatterName)
    //   fetch("https://localhost:44313/api/create/messsage/user", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       Text: this.Text,
    //       UserId: this.Id1,
    //       UserId2: this.Id2,
    //     }),
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("Could not save the data");
    //       } else {
    //         this.Text = "";
    //         this.UserId = "";
    //         this.UserId2 = "";
    //       }
    //     })
    //     .catch((error) => {
    //       this.error = error;
    //       console.log(error);
    //     });
    // },
    // async loadUsers() {
    //   await fetch("https://localhost:44313/api/all/user", {
    //     method: "GET",
    //   })
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //         //console.log(response)
    //       }
    //     })
    //     .then((data) => {
    //       //   console.log(data)
    //       const results = [];
    //       for (const id in data) {
    //         results.push({
    //           Id: data[id].Id,
    //           FirstName: data[id].FirstName,
    //           LastName: data[id].LastName,
    //           Email: data[id].Email,
    //         });
    //       }
    //       //console.log(results)
    //       const UserIndex = results.findIndex(
    //         (x) => x.Id === this.$store.getters["user/loggedUserId"]
    //       );

    //       results.splice(UserIndex, 1);
    //       this.results = results;
    //       console.log(UserIndex);
    //     })
    //     .catch((error) => {
    //       this.isLoading = false;
    //       this.error = error;
    //     });
    // },
    // async GetLoggedUser() {
    //   await fetch(
    //     `https://localhost:44313/api/login/user/${this.loggedMail}/`,
    //     {
    //       method: "GET",
    //     }
    //   )
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //         //console.log(response)
    //       }
    //     })
    //     .then((data) => {
    //       console.log(data.Id);
    //       this.$store.dispatch("user/addUserDetail", {
    //         Id: data.Id,
    //         FirstName: data.FirstName,
    //         LastName: data.LastName,
    //       });
    //     })
    //     .catch((error) => {
    //       this.isLoading = false;
    //       this.error = error;
    //     });
    // },

    // convo(value) {
    //   // alert();
    //   // console.log(value);
    //   this.chatterName = value;
    //   // console.log(this.Id2)
    //   //console.log(this.results2);
    // },

    // allMessages() {
    //   this.Id1 = this.$store.getters["user/loggedUserId"];
    //   this.Id2 = this.$store.getters["user/getId2"];
    //   fetch(
    //     `https://localhost:44313/api/all/coversation/${this.Id1}/${this.Id2}`,
    //     {
    //       method: "GET",
    //     }
    //   )
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //         //console.log(response)
    //       }
    //     })
    //     .then((data) => {
    //       //   console.log(data)
    //       const results = [];
    //       for (const id in data) {
    //         results.push({
    //           Id: data[id].Id,
    //           Text: data[id].Text,
    //           UserId: data[id].UserId,
    //           UserId2: data[id].UserId2,
    //         });
    //       }
    //       this.results2 = results;
    //       //   console.log(this.results)
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       // alert(error)
    //     });
    // },
  },
  mounted() {
    this.getAllFriends();
    //this.loadUsers();
    //setInterval(this.allMessages, 2000);
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
.konumara-btn {
  position: relative;
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
  margin-top: 60px;
  width: 98%;
}
.inpt::placeholder {
  font-family: Arial, Helvetica, sans-serif;
}
.all-user {
  background: rgba(255, 255, 255, 0.562);
  overflow-y: scroll;
  height: 100%;
}
.send-msg {
  position: absolute;
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

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="message"] {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 10px;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

button[type="submit"]:hover {
  background-color: #45a049;
}
.position-fixed {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
}
.chat-container {
  position: relative;
  height: 400px; /* Mesajlar ve formun alacağı toplam yükseklik */
  overflow-y: auto; /* Mesajları aşan içeriklerde kaydırma çubuğu görüntülenir */
}

.message-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
}

.message-form {
  position: absolute;
  height: 200px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: #f5f5f5;
}
</style>
