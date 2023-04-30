<template>
  <div class="container">
    <button @click.prevent="isShowPopup = true" class="poli-delInfo">
      Xóa tài khoản
    </button>
    <PopupConfirm
      :title="'xóa tài khoản'"
      @action="deleteCitizen"
      v-show="isShowPopup"
      @closePopup="closePopup"
    >
    </PopupConfirm>
    <Notification
      :status="status"
      :object="'tài khoản'"
      :action="'Xóa'"
      :isShowNoti="showNoti"
      v-if="showNoti == 'Ok'"
    >
    </Notification>
    <InforCitizenNew :listInfor="listInfor" />
    <Criminalrecord :criminalRecord="listInfor.criminalRecord" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      listInfor: {},
      genderEx: "nu",
      id: null,
      isShowPopup: false,
      status: "",
      showNoti: "",
    };
  },
  mounted() {
    this.id = localStorage.getItem("idCitizenOfSeeInforCitizen");
    this.fetchDataCitizen();
  },
  methods: {
    async fetchDataCitizen() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
          .then((res) => {
            this.listInfor = res["data"];
          });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCitizen() {
      try {
        await this.$axios
          .delete(`http://localhost:8080/api/citizen/delete/id=${this.id}`)
          .then(() => {
            this.status = "thành công";
            this.showNoti = "Ok";
            setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/poli/inforPoli");
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
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.poli-delInfo {
  border: none;
  border-radius: 10px;
  padding: 8px 20px;
  background-color: green;
  color: #fff;
  font-weight: 550;
  position: absolute;
  right: 100px;
  top: 250px;
  cursor: pointer;
  z-index: 2;
}
.poli-delInfo:hover {
  background-color: rgb(40, 136, 40);
  box-shadow: 3px 3px 10px 3px rgb(209, 208, 208);
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
.display-hide {
  display: none !important;
}
</style>
