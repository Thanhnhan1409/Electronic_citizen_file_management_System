<template>
  <div class="container-add">
    <BackToList/>
    <div id="overlay" class="display-hide"></div>
    <div class="content">
      <h2>Đăng ký thông tin cá nhân công dân</h2>
      <nuxt-link to="/admin/addAccount/addRolePoli">
        <div class="add--role">
          Thêm quyền quản lý
          <svg
            class="add__role--svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L370.7 256 233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L178.7 256 41.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
            />
          </svg>
        </div>
      </nuxt-link>
      <!-- <button @click.prevent="openPopUp" class="submit">Đăng ký</button> -->
      <AddAccount
        :list-infor="list"
        :action="'Đăng ký'"
        @openPopup="openPopupAdd()"
        class="addAcc-content"
      />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        //set pw lại nơi Be
        password: "123",
        nationality: 'Việt Nam'
      },
      isShowPopup: false,
      status: "",
      showNoti: "",
    };
  },
  // middleware: 'main',
  methods: {
    async submit() {
      try {
        console.log(this.list);
        this.isShowPopup = false;
        await this.$axios
          .post("http://localhost:8080/api/v1/auth/register", this.list)
          .then((res) => {
            this.status = "thành công";
            this.showNoti = "Ok";
            this.isShowPopup = false;
            setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/admin/listInforAll/_listInforAll");
            }, 1500);
          });
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
    openPopupAdd() {
      this.isShowPopup = true;
    },
  },
};
</script>
<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.container h2 {
  /* padding: 10px;
    margin: 50px 0 30px 280px ; */
  position: absolute;
  top: 110px;
  left: 330px;
  text-align: center;
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -100%;
  opacity: 0.6;
  background-color: rgb(139, 142, 144);
  animation: overlay 0.5s ease forwards;
  z-index: 10;
}
.display-block {
  display: block !important;
}

.display-hide {
  display: none !important;
}
.content {
  margin-top: 140px;
}
ul {
  list-style: none;
}

input {
  padding: 5px;
  width: 200px;
  margin-left: 10px;
}
.add--role {
  background-color: #ffffff;
  box-shadow: 3px 3px 10px rgb(202, 200, 200);
  position: absolute;
  color: black;
  font-weight: 600;
  top: 130px;
  right: 50px;
  z-index: 2;
  padding: 7px 15px;
  border-radius: 5px;
  display: flex;
  transition: all 0.3s linear;
}
.add__role--svg {
  width: 15px;
  height: auto;
  fill: green;
  margin-left: 10px;
  transition: all 0.3s linear;
}
.add--role:hover {
  transform: scale(1.05);
}
.add--role:hover .add__role--svg {
  transform: translateX(10px);
}
.addAcc-content {
  position: relative;
  top: 40px;
}

</style>
