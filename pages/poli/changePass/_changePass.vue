<template>
  <div class="container">
    <Navbar :userName = "name" />

    <div class="content">
      <form class="form">
        <h2>Đổi Mật khẩu</h2>
        <p>Mật khẩu cũ</p>
        <input
          type="password"
          v-model="changePass.oldPassword"
          class="pass"
          placeholder="Nhập mật khẩu mới"
          v-validate="'required'"
          :class="{
            input: true,
            'is-danger': errors.has('Họ và tên'),
          }"
          name="Mật khẩu cũ"
        />
        <span v-show="errors.has('Mật khẩu cũ')" class="err">{{
          errors.first("Mật khẩu cũ")
        }}</span>
        <p>Mật khẩu mới</p>
        <input
          type="password"
          v-model="changePass.newPassword"
          class="pass"
          placeholder="Nhập mật khẩu mới"
          v-validate="'required|min:10|max:50'"
          :class="{
            input: true,
            'is-danger': errors.has('Họ và tên'),
          }"
          name="Mật khẩu mới"
        />
        <span v-show="errors.has('Mật khẩu mới')" class="err">{{
          errors.first("Mật khẩu mới")
        }}</span>
        <p class="err" v-show="errDesc" >*Hãy chắc rằng bạn đã nhập đúng mật khẩu cũ. Xin vui lòng thử lại </p>
        <button class="change" @click.prevent="isShowPopup = true">
          Đổi mật khẩu
        </button>
      </form>
    </div>
    <PopupConfirm
      :title="'thay đổi mật khẩu'"
      @action="submit"
      v-show="isShowPopup"
      @closePopup="closePopup"
    >
    </PopupConfirm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changePass: {},
      isShowPopup: false,
      errDesc: false,
      name:''
    };
  },
  // middleware: 'auth',
  mounted() {
    this.changePass.citizen_id = localStorage.getItem("id");
    this.name = localStorage.getItem('name')
  },
  methods: {
    async submit() {
      try {
        console.log("test1");
        console.log(this.changePass);
        this.isShowPopup = false;
        this.errDesc=false;
        const result = await this.$validator.validateAll();
        await this.$axios
          .put(
            "http://localhost:8080/api/v1/auth/changePassword",
            this.changePass
          )
          .then((res) => {
            console.log("test2");
            //index=>inforPoli
            //this.$router.push("/poli/inforPoli");
            
            this.$router.push("/poli");
          });
        console.log(this.changePass);
      } catch (error) {
        this.errDesc=true;
        console.log("test3");
        console.log(error);
      }
    },
    closePopup() {
      this.isShowPopup = false;
    },
  },
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
  margin-left: 280px;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
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
  margin-top: 80px;
  padding: 40px 30px;
  background-color: #fff;
  height: 400px;
  width: 325px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgb(184, 182, 182);
}

.form h2 {
  font-size: 30px;
  color: green;
  text-align: center;
}
.form p {
  padding: 15px 0 8px 0;
}
input {
  width: 300px;
  height: 30px;
  border: 1px solid green;
  border-radius: 4px;
}

.change {
  width: 320px;
  height: 35px;
  margin-top: 50px;
  background: green;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.pass {
  padding: 5px 10px;
}
.err {
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  color: #ff4433;
}
</style>
