<template>
  <div class="container"> 
    <div id="overlay" class=" display-hide"></div>
    <div class="content">
      <h2>Đăng ký thông tin cá nhân công dân</h2>
      <button @click.prevent="openPopUp" class="submit">Đăng ký</button>
      <AddAccount :listInfor="list"/>
      <PopupConfirm @action="submit" :title="title"/>
      </div>
  </div>
</template>

<script>
import AddAccount from '@/components/AddAccount.vue';
import PopupConfirm from '@/components/PopupConfirm.vue';
export default {
  components:{
    AddAccount,
    PopupConfirm
  },
  data() {
    return {
      list: {
        password: "123",
      }, 
      title: "thêm tài khoản"
    };
  },
  // middleware:['auth'],
  methods: {
    async submit() {
      try {
        console.log(this.list);
        await this.$axios
          .post("http://localhost:8080/api/v1/auth/register", this.list
          )
          .then((res) => {
            this.$router.push("/poli/inforPoli");
            
          });
        console.log(this.list);
      } catch (error) {
        console.log(error);
      }
    },
    openPopUp(item) {
      document.querySelector('#overlay').classList.remove('display-hide');
      document.querySelector('#popup--confirm-change').classList.remove('display-hide');
      document.querySelector('#popup--confirm-change').classList.add('display-block');
      document.querySelector('#popup--confirm-change').classList.add('display-block');
      this.idReq = item.id_requirement ;
    }
  },
};
</script>
<style src="../../../static/asset/styles.css"></style>
<style scoped>
.content h2{
  position: absolute;
  left: 330px;
  top: 70px;
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -100%;
  opacity: 0.6;
  background-color: rgb(139, 142, 144);
  animation: overlay 0.5s ease forwards;
  z-index: 10;
}
img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

input {
  padding: 5px;
  width: 200px;
  margin-left: 10px;
}

.submit {
  padding: 10px 30px;
  background-color: green;
  color: #fff;
  font-size: 18px;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  margin-bottom: 40px;
  position: absolute;
  right: 80px;
  cursor: pointer;
  box-shadow: 3px 3px 3px 1px rgba(218, 169, 36, 0.25);
  top: 190px;
}
.display-block {
  display: block !important;
}

.display-hide {
  display: none !important;
}
/* #popup--confirm-change{
  width: 280px;
  height: auto;
  background-color: #fff;
  padding: 10px 25px;
  border-radius: 5px;
  position: fixed;
  z-index: 90;
  top:40%;
  left: 45%;
  
}
#popup--confirm-change span{
  font-weight: 600;
  text-align: center;
}

.popup--icon-close {
  width: 10px;
  height: auto;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  fill: #818281;
}
.popup--button button {
  margin-top: 15px;
  padding: 5px 10px;
  cursor: pointer;
  width: 135px;
  border: 0.3px solid black;
}
.popup--button{
  display: flex;
  padding: 10px;
  justify-content: space-between;
  
}
.cancel{
  background-color: #fff;
  border: 0.3px solid black;
  color: green;
  
}
.confirm{
  background-color: green;
  color: #fff;
  border: 1.3px solid #fff;
  margin-left: 5px;
} */
</style>