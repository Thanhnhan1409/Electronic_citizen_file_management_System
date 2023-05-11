<template>
  <div class="container">
    <!-- <h3 class="title">Đăng ký thông tin cá nhân công dân</h3> -->
    <div class="content">
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
        criminalRecord:'',
        nationality: "Việt Nam"
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
        this.list.idFamily= this.list.family;
        await this.$axios
          .post("http://localhost:8080/api/v1/auth/register", this.list)
          .then((res) => {
            this.status = "thành công";
            this.showNoti = "Ok";
            this.isShowPopup = false;
            setTimeout(() => {
              this.showNoti = "";
            //this.$router.push("/poli/inforPoli");
              this.$router.push("/poli");
            }, 1500);
          });
        console.log(this.list);
      } catch (error) {
        this.isShowPopup = false;
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
.title {
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

.content{
  position: relative;
  top: 65px;
}
</style>
