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
          <p class="err" v-show="errDesc" >*Hãy chắc rằng bạn đã nhập đúng tài khoản và mật khẩu. Xin vui lòng thử lại </p>
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
        this.errDesc=false;
        await this.$auth
          .loginWith("local", {
            data: {
              citizen_id: this.citizen_id,
              password: this.password,
            },
          })
          .then((res) => {
            localStorage.setItem("id", this.citizen_id);
            this.role = res.data.role;
            console.log(this.role);
            for (let item of this.role) {
              console.log(item);
              if (item == "CITIZEN") {
                this.check = true;
                console.log(this.check);
                break;
              }
            }
            console.log("test ");
            if (this.check == false) {
              this.status = "thất bại";
              this.showNoti = "Ok";
              setTimeout(() => {
                this.showNoti = "";
              }, 1500);
              console.log("test1 ");
            } else {
              this.status = "thành công";
              this.showNoti = "Ok";
              setTimeout(() => {
                this.showNoti = "";
                this.$router.push("/citizen");
              }, 1000);
            }
          });
      } catch (error) {
        this.errDesc=true;
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.error(error);
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
  width: 280px;
  /* border: 0.5px solid black; */
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgb(205, 204, 204);
  margin-bottom: 50px;
  position: relative;
}

.form h2 {
  font-size: 40px;
  color: green;
  text-align: center;
}

input {
  width: 260px;
  height: 25px;
  border: 1px solid green;
  border-radius: 4px;
  margin: 10px 0;
}

.login {
  width: 283px;
  height: 35px;
  /* margin-top: 50px; */
  background: green;
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
