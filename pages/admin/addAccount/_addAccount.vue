<template>
  <div class="container">
    <BackToList/>
    <div id="overlay" class="display-hide"></div>
    <div class="content">
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
        password: "123",
        criminalRecord:'',
        nationality: "Việt Nam"
      },
      isShowPopup: false,
      status: "",
      showNoti: "",
    };
  },
  methods: {
    async submit() {
      try {
        console.log(this.list);
        this.isShowPopup = false;
        this.list.idFamily= this.list.family;
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


.content {
  margin-top: 140px;
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
  top: 30px;
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

</style>
