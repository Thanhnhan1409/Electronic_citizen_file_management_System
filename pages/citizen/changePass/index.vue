<template>
  <div class="container">
    <navbar />
    <tableft />
    <div class="content">
      <form class="form">
        <h2>Đổi Mật khẩu</h2>
        <p>Mật khẩu cũ</p>
        <input type="password" v-model="changePass.oldPassword" class="pass" placeholder="Nhập mật khẩu cũ">
        <p>Mật khẩu mới</p>
        <input type="password" v-model="changePass.newPassword" class="pass" placeholder="Nhập mật khẩu mới">
        <button class="change" @click.prevent="submit">Đổi mật khẩu</button>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../components/Navbar.vue';
import Tableft from '../../../components/Tableft.vue';
export default {
  components: {
    Navbar,
 Tableft },
  data() 
    {
    return {
      changePass: {
        citizen_id: '',
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  mounted() {
    this.changePass.citizen_id = localStorage.getItem('id');
  },
  methods: {
    async submit() {
      try {
        if (this.changePass.oldPassword === this.changePass.newPassword) {
          alert('Mật khẩu mới không được giống mật khẩu cũ');
          return;
        }
        await this.$axios.put('http://localhost:8080/api/v1/auth/changePassword', this.changePass);
        this.$router.push('/citizen');
      } catch (error) {
        console.log(error);
        alert('Đã có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại sau.');
      }
    }
  }
}
</script>

  
  <style scoped>
    body{
      padding: 0;
      margin:0;
    }
  
    html{
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
  
    .container{
      display: block;
      margin-left:auto;
    }
  
    .content{
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
    }
  
  
    .logo-login{
      text-align: center;
      padding-top: 20px;
    }
  
    img{
      width: 100px;
      height: auto;
    }
  
    .form{
      margin-top: 80px;
      padding: 40px 30px;
      background-color: #fff;
      height: 400px;
      width: 325px;
      border-radius: 10px;
      box-shadow: 3px 3px 10px rgb(184, 182, 182);
      
    }
  
    .form h2{
      font-size: 30px;
      color: green;
      text-align: center;
    }
  
    input{
      width: 300px;
      height: 30px;
      border: 1px solid green;
      border-radius: 4px;
    }
  
    .change{
      width: 320px;
      height: 35px;
      margin-top:50px;
      background: green;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .pass{
      padding: 5px 10px;
    }
  </style>