<template>
  <div class="container">
    <div class="logo-login">
      <img src="../static/images/logo.jpg" alt=""  @click="$router.push('/')" />
      <h2>Hệ thống quản lý hồ sơ điện tử công dân</h2>
    </div>
    <div class="card">
      <div class="content">
        <form @submit.prevent="login">
          <div class="form">
            <h2>Đăng nhập</h2>
            <p>Tài Khoản <small style="color: #c7422e">*</small></p>
            <input
              v-model="citizen_id"
              type="text"
              class="box"
              v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Tài khoản'),
              }"
              name="Tài khoản"
              id=""
              placeholder="Nhập số CCCD"
              autocomplete="on"
            />
            <span v-show="errors.has('Tài khoản')" class="err">{{
              errors.first("Tài khoản")
            }}</span>
            <p>Mật khẩu <small style="color: #c7422e">*</small></p>
            <input
              class="box"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Nhập mật khẩu"
              autocomplete="on"
              v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Mật khẩu'),
              }"
              name="Mật khẩu"
            />
            <span v-show="errors.has('Mật khẩu')" class="err">{{
              errors.first("Mật khẩu")
            }}</span>
            <p class="err" v-show="errDesc">
              *Hãy chắc rằng bạn đã nhập đúng tài khoản và mật khẩu. Xin vui
              lòng thử lại
            </p>
            <button class="login">Đăng nhập</button>
          </div>
        </form>
      </div>
    </div>
    <Notification
      :status="status"
      :object="'tài khoản'"
      :action="'Đăng nhập'"
      :isShowNoti="showNoti"
      v-if="showNoti == 'Ok'"
    >
    </Notification>
    <FooterPage />
  </div>
</template>

<script>
import { useListCityStore } from "@/store/listCity";
export default {
  data() {
    return {
      check: false,
      citizen_id: "",
      password: "",
      showPassword: false,
      list: {},
      role: [],
      status: "",
      showNoti: "",
      errDesc: false,
      listCity: useListCityStore(),
    };
  },
  onmounted() {
    this.deleteToken();
  },
  mounted() {
    // this.id = localStorage.getItem("id");
    this.deleteToken();

  },
  methods: {
    deleteToken: function () {
      localStorage.removeItem("auth._token.local");
    },
    async login() {
      try {
        localStorage.removeItem("auth._token.local");
        this.errDesc = false;
        await this.$auth
          .loginWith("local", {
            data: {
              citizen_id: this.citizen_id,
              password: this.password,
            },
          })
          .then((res) => {
            
            this.getCity()

            localStorage.setItem("id", this.citizen_id);
            this.role = res.data.role;
            localStorage.setItem("role", "citizen");
            for (let item of this.role) {
              if (item === "POLITICIAN") {
                this.check = true;
                localStorage.setItem("role", "politician");
                console.log(this.check);
                this.status = "thành công";
                this.showNoti = "Ok";
                return setTimeout(() => {
                  this.showNoti = "";
                  this.$router.push("/poli");
                }, 1000);
                
                break;
              } else if (item === "ADMIN") {
                localStorage.setItem("role", "admin");
                this.status = "thành công";
                this.showNoti = "Ok";
                return setTimeout(() => {
                  this.showNoti = "";
                  this.$router.push("/admin/statistical");
                }, 1000);
              }
            }
            this.status = "thành công";
            this.showNoti = "Ok";
            return setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/citizen");
            }, 1000);
            console.log("test ");
          });
      } catch (error) {
        this.errDesc = true;
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.error(error);
      }
    },
    async getCity() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/local/province`)
          .then((res) => {
            const list = useListCityStore()
            list.setListCity(res.data);
            console.log(list.getListCity);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
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
  padding: 0;
  margin: 0;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5px;
}
.logo-login {
  text-align: center;
  padding-top: 20px;
}
img {
  width: 100px;
  height: auto;
  cursor: pointer;
}
.form {
  padding: 10px 40px 40px;
  background-color: #fff;
  height: 380px;
  width: 280px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgb(205, 204, 204);
  margin-bottom: 50px;
  position: relative;
}
.form h2 {
  font-size: 40px;
  color: #127e23;
  text-align: center;
}
input {
  width: 260px;
  height: 25px;
  border: 1px solid #127e23;
  border-radius: 4px;
  margin: 10px 0;
}
.login {
  width: 283px;
  height: 35px;
  background: #127e23;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  position: absolute;
  bottom: 40px;
}
.box {
  padding: 5px 10px;
}
.err {
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  color: #ff4433;
}
</style>
