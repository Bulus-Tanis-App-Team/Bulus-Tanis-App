<template>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

	<section class="login">
		<div class="login_box col-12 row">
			<div class="left col-6">
				<div class="top_link"><a href="#"><img src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download" alt="">Return home</a></div>
				<div class="contact">
					<form action=""  @submit.prevent="register">
						<h3>Buluş & Tanış'a Katılın</h3>
						<input type="text" placeholder="İsim" v-model="FirstName">
						<input type="text" placeholder="Soy İsim" v-model="LastName">
						<input type="text" placeholder="E-mail" v-model="Email">
            <input type="password" placeholder="Şifre" v-model="Password">
            <input type="text" placeholder="Ülke" v-model="Country">
            <input type="text" placeholder="Şehir" v-model="City">
            <input type="text" placeholder="İlçe" v-model="District">
            <input type="text" placeholder="Mahalle" v-model="Neighbourhood">
            <h5 v-if="successful" class="text-success">Kayıt Başarılı</h5>
						<button class="submit">Kayıt Ol</button>
					</form>
				</div>
			</div>
			<div class="right col-6" >
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
    data(){
        return{
          FirstName:"",
          LastName:"", 
          Email:"",
          Password:"",
          Country:"",
          City:"",
          District:"",
          Neighbourhood:"",
          registerURL:"",
          successful:false,
          clicked:false,
        }
    },
    methods:{
      async register(){ 
        this.registerURL = BASE_URL + "/auth/signup"
      axios
      .post(this.registerURL, {
        "userName": this.FirstName+" "+this.LastName,
        "userMail": this.Email,
        "userPassword": this.Password,
        "userCountry": this.Country,
        "userCity": this.City,
        "userDistrict": this.District,
        "userNeighbourhood": this.Neighbourhood,
      })
      .then(res => {
        let registerInfo = res.data;
        console.log(registerInfo.mesaj);   
        if(registerInfo.user){
          this.successful = true;
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
.logoresim{
    position:absolute;
    left:170px;
    top:50px;
    width:200px; 
    height:200px;
}
.login {
    height: 100vh;
    width: 100%;
    background: radial-gradient(#653d84, #332042);
    position: relative;
}
.login_box {
    width: 1050px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    overflow: hidden;
}
.login_box .left{
  width: 41%;
  height: 100%;
  padding: 25px 25px;
  
}
.login_box .right{
  width: 59%;
  height: 100%  
}
.left .top_link a {
    color: #452A5A;
    font-weight: 400;
}
.left .top_link{
  height: 20px
}
.left .contact{
	display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    height: 100%;
    width: 73%;
    margin: auto;
}
.left h3{
  text-align: center;
  margin-bottom: 40px;
}
.left input {
    border: none;
    width: 80%;
    margin: 1px 5px;
    border-bottom: 1px solid #4f30677d;
    padding: 7px 9px;
    width: 100%;
    overflow: hidden;
    background: transparent;
    font-weight: 600;
    font-size: 14px;
}
.left{
	background: linear-gradient(-45deg, #dcd7e0, #fff);
}
.submit {
    border: none;
    padding: 15px 70px;
    border-radius: 8px;
    display: block;
    margin: auto;
    margin-top: 50px;
    background: #583672;
    color: #fff;
    font-weight: bold;
    -webkit-box-shadow: 0px 9px 15px -11px rgba(88,54,114,1);
    -moz-box-shadow: 0px 9px 15px -11px rgba(88,54,114,1);
    box-shadow: 0px 9px 15px -11px rgba(88,54,114,1);
}



.right {
	background: linear-gradient(rgba(242, 57, 127, 0.7) , rgba(175, 70, 189, 0.71) 100%);
	color: #fff;
	position: relative;
}

.right .right-text{
  height: 100%;
  position: relative;
  transform: translate(0%, 45%);
}
.right-text h2{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 50px;
  font-weight: 500;
}
.right-text h5{
  display: block;
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-weight: 400;
}

.right .right-inductor{
  position: absolute;
  width: 70px;
  height: 7px;
  background: #fff0;
  left: 50%;
  bottom: 70px;
  transform: translate(-50%, 0%);
}
.top_link img {
    width: 28px;
    padding-right: 7px;
    margin-top: -3px;
}
.submit:hover{
  background:linear-gradient(rgba(242, 57, 127, 0.7) , rgba(175, 70, 189, 0.71) 100%);
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
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px 4px 22px -8px #0004;
    display: flex;
    overflow: hidden;
}

.login_box .left{
  width: 11%;
  height: 100%;
  padding: 25px 25px;
  
}
}
</style>