<template>
  <div class="container">
    <div class="logo-login">
      <img src="../static/images/logo.jpg" alt="" />
      <h2>Hệ thống quản lý hồ sơ điện tử công dân</h2>
    </div>
    <div class="card">
      <div class="content">
        <form @submit.prevent="login">
          <div class="form">
            <h2>Đăng nhập</h2>
            <p>Tài Khoản</p>
            <input v-model="citizen_id" type="text" class="box" name="" id="" placeholder="Nhập số CCCD" required />
            <p>Mật khẩu</p>
            <input class="box" :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Nhập mật khẩu"
              required />
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
      role: [],
    };
  },
  onmounted() {
    this.deleteToken();
  },
  mounted() {
    this.id = localStorage.getItem("id");
    this.deleteToken();
  },
  methods: {
    deleteToken: function () {
      localStorage.removeItem("auth._token.local");
    },
    async login() {
      try {
        localStorage.removeItem("auth._token.local");
        await this.$auth.loginWith('local', {
          data: {
            citizen_id: this.citizen_id,
            password: this.password,
          }
        }).then(res => {
          localStorage.setItem("id", this.citizen_id)
          this.role = res.data.role;
          console.log(this.role);
          for (let item of this.role) {
            console.log(item);
            if (item == 'POLITICIAN') {
              this.check = true;
              console.log(this.check)
              break;
            }
          }
          console.log("test ");
          if (this.check == false) {
            this.$router.push('/error');
            console.log("test1 ");
          }
          else this.$router.push('/poli/inforPoli');
        })

      } catch (error) {
        console.error(error);
      }
    },

  }
};
</script>
<style src="../static/asset/styles.css"></style>
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
  margin: 0;
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
  /* border: 0.5px solid black; */
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgb(205, 204, 204);
  margin-bottom: 50px;
}

.form h2 {
  font-size: 40px;
  color: green;
  text-align: center;
}

input {
  width: 280px;
  height: 30px;
  border: 1px solid green;
  border-radius: 4px;
  margin: 10px 0;
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
</style>
<!-- <template>
  <div class="container">
    <Tableft/>
    <Navbar/>
    <InforCitizenNew :listInfor="list" :genderEx="genderEx" @gender="gender" />
    <InforPoli :listPoli="listPoli" />
  </div>
</template>
<script>
import Tableft from '@/components/Tableft.vue';
import InforCitizenNew from '@/components/InforCitizenNew.vue';
import InforPoli from '@/components/InforPoli.vue';
import Navbar from '../components/Navbar.vue';
export default {
  components: {
    InforCitizenNew,
    Tableft,
    InforPoli
  },
  data() {
    return {
      message: "",
      list: {},
      listPoli: {},
      id: "",
      genderEx: "",
      idFamily: null,
      role: [],
      name: "",//lưu tên user
    };
  },
  // middleware: "auth",
  mounted() {
    this.id = localStorage.getItem("id");
    this.fetchData();
    this.fetchDataPoli();
    // this.gender();
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
    logout() {
      localStorage.clear();
      localStorage.removeItem("auth._token.local");
      this.$router.push("/login");
    },
    gender(list) {
            if (list.gender === false) return (this.genderEx = "nữ");
            else return (this.genderEx = "nam");
        },
    getFamilyId() {
      for (let item in this.list) {
        console.log(item);
      }
    },
  },
};
</script>
  

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
</style> --> -->