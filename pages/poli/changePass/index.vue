<template>
    <div class="container">
      <div class="content">
        <form class="form">
            <h2>Đổi Mật khẩu</h2>
            <!-- <p>Số CCCD:</p>
            <input type="number" class="pass" placeholder="Nhập số CCCD" > -->
            <p>Mật khẩu cũ</p>
            <input type="password" v-model="changePass.oldPassword" class="pass"  placeholder="Nhập mật khẩu mới" >
            <p>Mật khẩu mới</p>
            <input type="password" v-model="changePass.newPassword" class="pass"  placeholder="Nhập mật khẩu mới" >
            <button class="change" @click.prevent="submit" >Đổi mật khẩu</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    components: {
    },
    data(){
      return{
        changePass: {
          citizen_id: '',
          oldPassword: '',
          newPassword: ''
        }
      }
    },
    // middleware: 'auth',
    mounted(){
      this.changePass.citizen_id = localStorage.getItem('id');
    },
    methods:{
      test: function(){
        console.log('test1');
      }
      ,
      async submit() {
      try {
        console.log('test1')
        console.log(this.changePass);
        await this.$axios
          .put("http://localhost:8080/api/v1/auth/changePassword", this.changePass
          )
          .then((res) => {
            console.log('test2')
            //index=>inforPoli
            this.$router.push("/poli/inforPoli");
            
          });
        console.log(this.changePass);
      } catch (error) {
        console.log('test3')
        console.log(error);
      }
    },
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
      margin-left: 280px;
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