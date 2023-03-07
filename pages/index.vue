
<template>
  <div class="container">
    <div class="container">
      <Logo />
      <div class="header">
        <ul class="content">
          <li class="nav-item">
            <svg
              class="logo-home"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
              />
            </svg>
            <nuxt-link to="/" class="link">Trang chủ</nuxt-link>
          </li>
          <li class="nav-item see-inf">
            <nuxt-link to="/poli/seeInforCitizen/_seeInforCitizen" class="link">Xem thông tin</nuxt-link>
          </li>
          <li class="nav-item">
            <a href="" class="link">Quản lý thông tin</a>
            <ul class="management-child">
              <li>
                <nuxt-link to="/poli/addCitizen">Thêm tài khoản</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/poli/update">Cập nhập thông tin</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/poli/deleteCitizen">Xoá tài khoản</nuxt-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <nuxt-link to="/poli/requirement/_requirement" class="link">Nhận yêu cầu</nuxt-link>
          </li>
          <li class="nav-item">
            <a href="" class="link">Gửi thông báo</a>
          </li>
          <li class="nav-item">
            <nuxt-link to="/poli/appointment/_appointment"  class="link">Xem lịch hẹn</nuxt-link>
          </li>
          <li class="nav-item">
            <a href="" class="link">Gửi yêu cầu</a>
          </li>
          <li class="nav-item">
            <a href="" class="link">Thống kê và báo cáo</a>
          </li>
        </ul>

        <div class="user">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
            />
          </svg>
          <span class="nickname"
            >{{ name }}
            <nuxt-link to="/poli/changePass" class="passchange"
              >Đổi mật khẩu</nuxt-link
            >
          </span>
          <div to="/">
            <svg
              @click.prevent="logout"
              xmlns="http://www.w3.org/2000/svg"
              class="logout"
              viewBox="0 0 512 512"
            >
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              />
            </svg>
          </div>
        </div>
      </div>
      <h2>Thông tin cá nhân</h2>
      <div>
        <div class="infor">
          <img
            src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/326538807_878801156697098_8566777046600716424_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kXnmArmPyF4AX-HBWWm&_nc_ht=scontent.fdad1-2.fna&oh=00_AfCV4UkBupefj4sYTgZWeeY5Pcz2ngffrYmkt44nqVyO8w&oe=63EBB4D2"
            alt=""
          />
          <div class="infor-content">
            <ul class="list-infor">
              <li>
                Họ và tên: <span>{{ list.name }}</span>
              </li>
              <li>
                Số CCCD:
                <span>{{ list.citizen_id }}</span>
              </li>
              <li>
                Giới tính:
                <span>{{ gender }}</span>
              </li>
              <li>
                Quốc tịch:
                <span>{{ list.nationality }}</span>
              </li>
              <li>
                Nghề nghiệp:
                <span>{{ list.profession }}</span>
              </li>
              <li>
                Cấp vụ:
                <span>{{ listPoli.levelManager }}</span>
              </li>
              <li>
                Khu vực:
                <span>{{ listPoli.areaManage }}</span>
              </li>
              <li>
                Chức danh:
                <span>{{ listPoli.position }}</span>
              </li>
            </ul>
            <ul class="list-infor">
              <li>
                Ngày sinh:
                <span>{{ list.birth }}</span>
              </li>

              <li>
                Dân tộc:
                <span>{{ list.ethnic }}</span>
              </li>
              <li>
                Số hộ khẩu:
                <span>{{ this.list.family?.id_Family }}</span>
              </li>
              <li>
                Tôn giáo:
                <span>{{ list.religion }}</span>
              </li>
              <li>
                Quê quán:
                <span> {{ list.address }}</span>
              </li>
              <li>
                Số điện thoại:
                <span>{{ list.phone }}</span>
              </li>
              <li>
                Email:
                <span>{{ list.email }}</span>
              </li>
              <li>
                Married:
                <form action="">
                  <input type="radio" v-model="list.married" value="true" /> Đã
                  kết hôn
                  <input type="radio" v-model="list.married" value="false" />
                  Chưa kết hôn
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  </div>
</template>
  
  <script>
export default {
  components: {},
  data() {
    return {
      message: "",
      list: {},
      listPoli: {},
      id: "",
      gender: "",
      idFamily: null,
      role: [],
      name: "",
    };
  },
  // middleware: "auth",
  mounted() {
    this.id = localStorage.getItem("id");
    this.fetchData();
    this.fetchDataPoli();
    this.checkGender();
    this.getFamilyId();
    this.name = localStorage.getItem("name");
  },
  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
          .then((res) => {
            this.list = res["data"];
            localStorage.setItem("name", this.list.name);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataPoli() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/politician/citizenId=${this.id}`)
          .then((res) => {
            this.listPoli = res["data"];
            localStorage.setItem('nameArea', this.listPoli.areaManage)
            localStorage.setItem('level', this.listPoli.levelManager)
            localStorage.setItem('idPolicitian', this.listPoli.politician_id)
            console.log(this.listPoli);
          });
      } catch (error) {
        console.log(error);
      }
    },
    logout: function () {
      localStorage.clear();
      localStorage.removeItem("auth._token.local");
      this.$router.push("/login");
    },
    checkGender() {
      if (this.list.gender === false) this.gender = "Nữ";
      else this.gender = "Nam";
    },
    getFamilyId() {
      for (let item in this.list) {
        console.log(item);
      }
    },
  },
};
</script>
  
  <style scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin: 0;
  padding: 0;
}

.container h2 {
  padding: 10px;
  width: fit-content;
  margin-bottom: 0;
}

ul {
  list-style: none;
}

.infor {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid green;
  border-bottom: 2px solid green;
}

.infor-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70%;
}

.list-infor {
  width: 50%;
}

.list-infor li {
  padding-bottom: 20px;
  line-height: 2;
  font-weight: 550;
}

.list-infor li span {
  font-weight: 400;
}

img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin: 0;
  padding: 0;
}

.container h2 {
  padding: 10px;
  width: fit-content;
  margin-bottom: 0;
}

.infor {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid green;
  border-bottom: 2px solid green;
}

.infor-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70%;
}

.list-infor {
  width: 50%;
}

.list-infor li {
  padding-bottom: 20px;
  line-height: 2;
  font-weight: 550;
}

.list-infor li span {
  font-weight: 400;
}

img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

.header {
  display: flex;
  align-self: center;
  justify-content: space-between;
  background-color: green;
  height: 50px;
  color: #fff;
}

.content {
  display: flex;
}

ul {
  list-style: none;
  margin: 0;
}

.nav-item {
  text-align: center;
  padding: 15px 8px;
  border-radius: 4px;
  margin-right: 2px;
}

.nav-item svg {
  width: 18px;
  height: auto;
  padding-right: 10px;
  fill: #fff;
}

.nav-item:hover {
  background-color: #fff;
}

.nav-item:hover .link {
  color: black;
}

.nav-item:hover .logo-home {
  fill: black;
}

.passchange {
  display: none;
  background-color: green;
  color: #fff;
  position: absolute;
  top: 150px;
  right: 78px;
  padding: 10px;
  width: 170px;
}

.nickname:hover .passchange {
  display: block;
}

.nickname {
  padding: 12px 10px;
  border-radius: 4px;
}

.nickname:hover {
  background-color: #fff;
  color: black;
}

.management-child {
  display: none;
  position: absolute;
  left: 222px;
  top: 156px;
  padding-top: 15px;
  text-align: start;
  width: 180px;
  height: 100px;
  background-color: green;
  color: #fff;
}

.management-child li {
  padding-top: 10px;
}

.nav-item:hover .management-child {
  display: block;
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
}

.user svg {
  width: 20px;
  height: auto;
  padding: 0 20px;
  fill: #fff;
}

a {
  cursor: pointer;
  text-decoration: none;
  color: #fff;
}

.logout:hover {
  background-color: #fff;
  padding: 5px 10px;
  fill: black;
  margin-left: 20px;
  border-radius: 5px;
}
</style>

<!-- <template>
  <div class="container">
    <div class="logo-login">
      <img src="../static/logo.jpg" alt="" />
      <h2>Hệ thống quản lý hồ sơ điện tử công dân</h2>
    </div>
    <div class="card">
      <div class="content">
        <form @submit.prevent="login">
          <div class="form">
            <h2>Đăng nhập</h2>
            <p>Tài Khoản</p>
            <input
              v-model="citizen_id"
              type="text"
              class="box"
              name=""
              id=""
              placeholder="Nhập số CCCD"
              required
            />
            <p>Mật khẩu</p>
            <input
              class="box"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Nhập mật khẩu"
              required
            />
            <button class="login">Đăng nhập</button>
          </div>
        </form>
      </div>
    </div>
    <FooterPage />
  </div>
</template>
  
  <script>
import FooterPage from "~/components/FooterPage.vue";
export default {
  components: {
    FooterPage,
  },
  data() {
    return {
      check: false,
      citizen_id: "",
      password: "",
      showPassword: false,
      list: {},
      role:[],
    };
  },
  mounted() {
    // this.id = localStorage.getItem("id");
    this.deleteToken();
  },
  methods: {
    async login() {
      try {
				await this.$auth.loginWith('local', {
					data: {
            citizen_id: this.citizen_id,
            password: this.password,
          }
				}).then( res => {
          localStorage.setItem("id",this.citizen_id)
          this.role = res.data.role;
          console.log(this.role);
            for(let item of this.role){
              console.log(item);
              if(item =='POLITICIAN')
              {
                this.check = true;
                console.log(this.check)
                break;
              }  
            }
            if (this.check == false)
              this.$router.push('/error');
            else this.$router.push('/poli/inforPoli');
        })
        
      } catch (error) {
        console.error(error);
      }
    },
    deleteToken: function(){
        localStorage.removeItem("auth._token.local");
      }
  }
};
</script>
  <style scoped>
body {
  padding: 0;
  margin: 0;
}

html {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.container {
  width: 100%;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 25px;
}

.logo-login {
  text-align: center;
  padding-top: 20px;
}

img {
  width: 100px;
  height: auto;
}

.form {
  padding: 10px 40px 40px;
  background-color: #fff;
  height: 380px;
  width: 300px;
  border: 0.5px solid black;
}

.form h2 {
  font-size: 40px;
  color: green;
  text-align: center;
}

input {
  width: 300px;
  height: 30px;
  border: 1px solid green;
  border-radius: 4px;
}

.checkbox {
  width: 20px;
  height: auto;
}

.showButton {
  text-align: end;
  padding-top: 10px;
}

.show-pass {
  text-align: end;
  padding-top: 10px;
  background-color: green;
  color: #fff;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.login {
  width: 305px;
  height: 35px;
  margin-top: 30px;
  background: green;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.box {
  padding: 5px 10px;
}
</style> -->