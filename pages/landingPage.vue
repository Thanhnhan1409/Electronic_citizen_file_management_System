<template>
  <div class="container-lp">
    <div class="header">
      <div class="header--logo">
        <img src="~/static/images/logo.jpg" alt="" />
        <h2>HỆ THỐNG QUẢN LÝ HỒ SƠ ĐIỆN TỬ CÔNG DÂN</h2>
      </div>
      <!-- <div class="header-login"> -->
        <nuxt-link to="/" class="link">

          <button class="header-login" >Đăng nhập</button>
        </nuxt-link>
      <!-- </div> -->
    </div>
    <div class="navbar">
      <nuxt-link to="/landingPage/home" class="link">
        <div class="navbar--home navbar-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
            />
          </svg>
          <span>Trang chủ</span>
        </div>
      </nuxt-link>

      <nuxt-link to="/landingPage/inforAndService" class="link">
        <div class=" navbar-item">Thông tin và dịch vụ</div>
      </nuxt-link>
      <nuxt-link to="/landingPage/support" class="link">
        <div class=" navbar-item">Hỗ trợ</div>
      </nuxt-link>
    </div>
      <nuxt-child />
    <FooterPage/>
  </div>
</template>
<style scoped src="../static/asset/styles.css"></style>
<style scoped>
.container-lp {
  /* padding:10px 100px; */
}
.link {
  text-decoration: none;
}
img {
  width: 150px;
  height: auto;
  color: aqua;
}
.header {
  display: flex;
  /* background-color: #d2fad8; */
  justify-content: space-between;
  align-items: center;
  padding:10px 190px;

}
.header h2 {
  margin: 0;
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
.navbar{
    display: flex;
    width: 100%;
    box-sizing: border-box;
    background-color: #127e23;
    color: #ffff;
    padding-left: 190px;
}
.navbar--home svg{
    width: 18px;
    height: auto;
}
.navbar-item{
    padding: 10px 20px;
    color: #ffff;
    fill: #ffff;

}
.navbar-item:hover{
    background-color: #fff;
    color: black;
}
.navbar-item:hover svg{
    fill:  black;
}
</style>
<style>
body{
  margin: 0;
}
</style>