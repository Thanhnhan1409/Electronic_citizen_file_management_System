<template>
  <div class="container">
    <h2>Đăng ký thông tin cá nhân công dân</h2>
    <div class="content">
      <!-- <button @click.prevent="isShowPopup=true" class="submit">Đăng ký</button> -->
      <AddAccount
        :listInfor="list"
        :action="'Đăng ký'"
        @openPopup="openPopup"
      />
    </div>
    <PopupConfirm
      :title="'thêm tài khoản'"
      @action="submit"
      v-show="isShowPopup"
      @closePopup="closePopup"
    >
    </PopupConfirm>
    <Notification
      :status="status"
      :object="'tài khoản'"
      :action="'Thêm'"
      :isShowNoti="showNoti"
      v-if="showNoti == 'Ok'"
    >
    </Notification>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        password: "123",
        criminalRecord:''
      },
      isShowPopup: false,
      status: '',
      showNoti:''
    };
  },
  // middleware:['auth'],
  methods: {
    async submit() {
      try {
        console.log(this.list);
        await this.$axios
          .post("http://localhost:8080/api/v1/auth/register", this.list)
          .then((res) => {
            this.status = "thành công";
            this.showNoti = "Ok";
            this.isShowPopup = false;
            setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/poli/inforPoli/_inforPoli");
            }, 1500);
          });
        console.log(this.list);
      } catch (error) {
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.log(error);
      }
    },
    closePopup() {
      this.isShowPopup = false;
    },
    openPopup() {
      this.isShowPopup = true;
    },
  },
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.container h2 {
  position: relative;
  left: 330px;
  top: 70px;
  width: fit-content;
}
img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

input {
  padding: 5px;
  width: 200px;
  margin-left: 10px;
}

.submit {
  padding: 8px 20px;
  background-color: green;
  color: #fff;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  margin-bottom: 40px;
  position: absolute;
  right: 80px;
  cursor: pointer;
  top: 190px;
  z-index: 2;
  transition: all 0.2s ease;
}
.submit:hover {
  background-color: rgb(40, 136, 40);
  box-shadow: 3px 3px 10px 3px rgb(209, 208, 208);
}
</style>
