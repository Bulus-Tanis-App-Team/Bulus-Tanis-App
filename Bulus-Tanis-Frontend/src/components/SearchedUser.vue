<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card p-3">
      <div class="d-flex align-items-center">
        <div class="image">
          <img
            src="https://media.istockphoto.com/vectors/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-vector-id1130884625?k=20&m=1130884625&s=612x612&w=0&h=OITK5Otm_lRj7Cx8mBhm7NtLTEHvp6v3XnZFLZmuB9o="
            class="rounded"
            width="155"
          />
        </div>

        <div class="ml-3 w-100">
          <div style="text-align: center">
            <h5 class="mb-0 mt-0">{{ userName }}</h5>
          </div>

          <div
            class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats"
          >
            <div class="d-flex flex-column">
              <span class="articles">Ülke:</span>
              <span class="number1">{{ userCountry }}</span>
            </div>

            <div class="d-flex flex-column">
              <span class="followers">Şehir:</span>
              <span class="number2">{{ userCity }}</span>
            </div>

            <div class="d-flex flex-column">
              <span class="rating">İlçe</span>
              <span class="number3">{{ userDistrict }}</span>
            </div>

            <div class="d-flex flex-column">
              <span class="rating">Mahalle</span>
              <span class="number3">{{ userNeighbourhood }}</span>
            </div>
            <div class="d-flex flex-column">
              <span class="articles">Email:</span>
              <span class="number3">{{ userMail }}</span>
            </div>
          </div>

          <div class="button mt-2 d-flex flex-row align-items-center">
            <button class="btn btn-sm btn-outline-primary w-100" @click="createFriendShip">
              Arkadaş Ol Ve Sohbet Et
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "../../config.backend";
export default {
  props: [
    "userName",
    "userMail",
    "userCountry",
    "userCity",
    "userDistrict",
    "userNeighbourhood",
  ],

  data() {
    return {
      friendshipStatus: false,
      friendshipMesaj:"",
      createFriendShipURL: "",
      friendMail: "",
    };
  },
  created() {
    //this.userID = this.$store.getters["user/loggedUserId"];
    // console.log(this.userID)
  },
  methods: {
    async createFriendShip() {
      this.createFriendShipURL = BASE_URL + "/friends/create";
      this.friendMail = JSON.parse(localStorage.getItem("userMail"));
      await axios
        .post(this.createFriendShipURL, {
          userMail: this.userMail,
          friendMail: this.friendMail,
        })
        .then((res) => {
          let info = res.data;          
          this.friendshipStatus=info.status;
          this.friendshipMesaj=info.mesaj;
          this.$emit('friendship-alert-emit', {status: this.friendshipStatus, message: this.friendshipMesaj});
          console.log(res.data.friendInfo);
          if(info.status){
            this.$emit('add-all-friends-list-emit', res.data.friendInfo);
          }          
          console.log(this.friendshipStatus);
          console.log(info.mesaj);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
body {
  background-color: #b3e5fc;
  border-radius: 10px;
}
.d-flex {
  display: flex;
  flex-direction: column; /* sütunları satıra çevir */
}
.card {
  width: 400px;
  border: none;
  border-radius: 10px;

  background-color: #fff;
}

.stats {
  background: #f2f5f8 !important;

  color: #000 !important;
}
.articles {
  font-size: 10px;
  color: #a1aab9;
}
.number1 {
  font-weight: 500;
}
.followers {
  font-size: 10px;
  color: #a1aab9;
}
.number2 {
  font-weight: 500;
}
.rating {
  font-size: 10px;
  color: #a1aab9;
}
.number3 {
  font-weight: 500;
}
</style>
