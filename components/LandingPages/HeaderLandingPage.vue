<template>
    <div class="container-header">
        <div class="header--logo">
        <img src="@/static/images/logo.jpg" alt="" />
        <h2>HỆ THỐNG QUẢN LÝ HỒ SƠ ĐIỆN TỬ CÔNG DÂN</h2>
      </div>
        <nuxt-link to="/login" class="link">
          <button class="header-login" >Đăng nhập</button>
        </nuxt-link>
    </div>
</template>

<style scoped src="@/static/asset/styles.css"></style>
<style scoped>
.container-header {
  display: flex;
  /* background-color: #d2fad8; */
  justify-content: space-between;
  align-items: center;
  padding:10px 190px;

}
.container-header h2 {
  margin: 0;
}
.link {
  text-decoration: none;
}
img {
  width: 150px;
  height: auto;
  color: aqua;
}
.header--logo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.header-login {
  padding: 7px 20px;
  border-radius: 5px;
  border: 1px solid #127e23;
  background-color: #ffff;
  font-size: 17px;
  cursor: pointer;
}
.header-login:hover {
  background-color: #127e23;
  color: #ffff;
  border: 2px solid #127e23;
}
</style>