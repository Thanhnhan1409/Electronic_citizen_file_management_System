<template>
  <div class="container-addPoli">
    <BackToList />
    <div id="overlay" class="display-hide"></div>
    <h2 class="title">Thêm thông tin cán bộ công chức</h2>
    <AddOrUpdatePoli
      class="add-poli--form"
      :listPoli="listPoli"
      :action="'Đăng ký'"
      @openPopup="openPopupAdd()"
    />
    <PopupConfirm
      :title="'thêm thông tin CBCC'"
      @action="submit"
      v-show="isShowPopup"
      @closePopup="closePopup"
    >
    </PopupConfirm>
    <Notification
      :status="status"
      :object="'thông tin CBCC'"
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
      listPoli: {},
      isShowPopup: false,
      status: "",
      showNoti: "",
    };
  },
  methods: {
    async submit() {
      try {
        this.isShowPopup = false;
        console.log("id"+ this.listPoli.citizen_id);
        console.log("area" + this.listPoli.areaManage);
        console.log("level" + this.listPoli.levelManager);
        console.log("positon" + this.listPoli.position);
        await this.$axios
          .post(
            "http://localhost:8080/api/v1/auth/registerPolitician",
            this.listPoli
          )
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
    openPopupAdd(){
        console.log("hehhe");
      this.isShowPopup = true;
    },
  },
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.add-poli--form {
  margin-top: 130px;
}
.title {
  position: absolute;
  left: 330px !important;
  width: fit-content;
  top: 80px;
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

.submit {
  padding: 7px 20px;
  background-color: green;
  color: #fff;
  font-size: 18px;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  margin-bottom: 40px;
  position: absolute;
  right: 80px;
  cursor: pointer;
  box-shadow: 3px 3px 8px rgba(218, 169, 36, 0.25);
  top: 240px;
  transition: all 0.2s linear;
  z-index: 2;
}

.submit:hover {
  transform: scale(1.05);
}
</style>
