<template>
    <div class="container">
      <div class="content">
        <div class="form">
            <h2>Đổi Mật khẩu</h2>
            <p>Mật khẩu cũ</p>
            <input type="password" class="pass" name="" id="" placeholder="Nhập mật khẩu mới" >
            <p>Mật khẩu mới</p>
            <input type="password" class="pass" name="" id="" placeholder="Nhập mật khẩu mới" >
            <div class="show-pass">
              <input type="checkbox" class="checkbox" name="" id="">
              <span>Hiện mật khẩu</span>
            </div>
            <button class="change">Đổi mật khẩu</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    components: {
    },
  
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
      width: 100%;
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
      padding: 40px 30px;
      background-color: #fff;
      height: 400px;
      width: 300px;
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
  
    .checkbox{
      width: 20px;
      height: auto;
    }
  
    .show-pass{
      text-align: end;
      padding-top:10px;
    }
  
    .change{
      width: 305px;
      height: 35px;
      margin-top:30px;
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