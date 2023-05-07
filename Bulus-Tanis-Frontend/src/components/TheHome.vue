<template>
  <section class="login">
    <div class="login_box col-12 row">
      <div class="left col-6">
        <div class="contact">
          <form @submit.prevent="login">
            <h3>Buluş & Tanış</h3>
            <input type="text" placeholder="Email" v-model="Email">
            <input type="text" placeholder="Şifre" v-model="Password">
            <div class="btn-group" role="group" aria-label="Basic example">
              <router-link to="/registration" custom v-slot="{ navigate }">
                <button class="kayit_ol" @click="navigate" role="link">Kayıt Ol</button>
              </router-link>
              <div style="padding-left: 70px;">
                <button class="submit">Giriş Yap</button>
              </div>
            </div>


          </form>
        </div>
      </div>
      <div class="right col-6">
        <div>
          <img class="logoresim" src="../assets/logo2.png" alt="Logo">
        </div>
        <div class="right-text">
          <h2>Buluş & Tanış</h2>
          <h5>Hayatına Anlam Kat</h5>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import axios from 'axios';
import { BASE_URL } from '../../config.backend'
export default {
  data() {
    return {
      Email: "",
      Password: "",
      loginURL: "",
    }
  },
  methods: {    
    async login() {
      this.loginURL = BASE_URL + "/auth/login"
      axios
      .post(this.loginURL, {
        "userMail": this.Email,
        "userPassword": this.Password
      })
      .then(res => {
        let userInfo = res.data;
        //AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        //console.log(userInfo.mesaj);
        if (userInfo.token) {
          localStorage.setItem('token', JSON.stringify(userInfo.token));
          localStorage.setItem('userName', JSON.stringify(userInfo.user.userName));
          localStorage.setItem('userMail', JSON.stringify(userInfo.user.userMail));
          localStorage.setItem('userCountry', JSON.stringify(userInfo.user.userCountry));
          localStorage.setItem('userCity', JSON.stringify(userInfo.user.userCity));
          localStorage.setItem('userDistrict', JSON.stringify(userInfo.user.userDistrict));
          localStorage.setItem('userNeighbourhood', JSON.stringify(userInfo.user.userNeighbourhood));
          console.log(userInfo.mesaj);  
          this.$router.push('/user');
        } else {
          console.log(userInfo.mesaj);
          // Alert.alert(
          //   `Giriş Başarısız`,
          //   `${userInfo.mesaj}`,
          // );
        }
      })
      .catch(e => {
          console.log(`register error ${e}`);
      });
    }
  }
}
</script>
<style scoped>
.logoresim {
  position: absolute;
  left: 225px;
  top: 50px;
  width: 200px;
  height: 200px;
}

.login {
  height: 100vh;
  width: 100%;
  background: radial-gradient(#653d84, #332042);
  /* linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593); */
  position: relative;
}

.login_box {
  width: 1050px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  overflow: hidden;
}

.login_box .left {
  width: 41%;
  height: 100%;
  padding: 25px 25px;

}

.login_box .right {
  width: 59%;
  height: 100%
}

.left .top_link a {
  color: #452A5A;
  font-weight: 400;
}

.left .top_link {
  height: 20px
}

.left .contact {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  height: 100%;
  width: 73%;
  margin: auto;
}

.left h3 {
  text-align: center;
  margin-bottom: 40px;
}

.left input {
  border: none;
  width: 80%;
  margin: 15px 0px;
  border-bottom: 1px solid #4f30677d;
  padding: 7px 9px;
  width: 100%;
  overflow: hidden;
  background: transparent;
  font-weight: 600;
  font-size: 14px;
}

.left {
  background: linear-gradient(-45deg, #dcd7e0, #fff);
}

.submit {
  border: none;
  padding: 10px 50px;
  border-radius: 8px;
  display: block;
  margin: auto;
  margin-top: 20px;
  background: #583672;
  color: #fff;
  font-weight: bold;
  -webkit-box-shadow: 0px 9px 15px -11px rgba(88, 54, 114, 1);
  -moz-box-shadow: 0px 9px 15px -11px rgba(88, 54, 114, 1);
  box-shadow: 0px 9px 15px -11px rgba(88, 54, 114, 1);
}

.kayit_ol {
  border: none;
  padding: 10px 50px;
  border-radius: 8px;
  display: block;
  margin: auto;
  margin-top: 20px;
  background: #583672;
  color: #fff;
  font-weight: bold;
  -webkit-box-shadow: 0px 9px 15px -11px rgba(88, 54, 114, 1);
  -moz-box-shadow: 0px 9px 15px -11px rgba(88, 54, 114, 1);
  box-shadow: 0px 9px 15px -11px rgba(88, 54, 114, 1);
}

.kayit_ol:hover,
.submit:hover {
  background: linear-gradient(rgba(242, 57, 127, 0.7), rgba(175, 70, 189, 0.71) 100%);
}

.right {
  background: linear-gradient(rgba(242, 57, 127, 0.7), rgba(175, 70, 189, 0.71) 100%);
  color: #fff;
  position: relative;
}

.right .right-text {
  height: 100%;
  position: relative;
  transform: translate(0%, 45%);
}

.right-text h2 {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 50px;
  font-weight: 500;
}

.right-text h5 {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-weight: 400;
}

.right .right-inductor {
  position: absolute;
  width: 70px;
  height: 7px;
  background: #fff0;
  left: 50%;
  bottom: 70px;
  transform: translate(-50%, 0%);
}

.rooter_css {
  text-decoration: none;
  color: #333;
}

.top_link img {
  width: 28px;
  padding-right: 7px;
  margin-top: -3px;
}

@media only screen and (max-width: 480px) {
  html {
    font-size: 50.5%;
  }

  .login_box {
    width: 480px;
    /* height: 600px; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px 4px 22px -8px #0004;
    display: flex;
    overflow: hidden;
  }

  .login_box .left {
    width: 11%;
    height: 100%;
    padding: 25px 25px;

  }

}</style>