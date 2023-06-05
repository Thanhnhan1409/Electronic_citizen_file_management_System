<template>
  <div class="container">
    <BackToList class="backtolist" />
    <InforCitizenNew class="infor-citizen" :list-infor="list" />
    <InforPoli :listPoli="listPoli" />
    <div class="admin-delete">
      <p class="admin-delInfo">Xóa tài khoản</p>
      <svg
        class="admin__icon--arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
      >
        <path
          d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
        />
      </svg>
      <div class="addmin-del-options">
        <button @click.prevent="openPopup1()" class="button-del admin-delAcc">
          Xóa tài khoản vĩnh viễn
        </button>
        <br />
        <button
          @click.prevent="openPopup2()"
          class="button-del admin-delInfPoli"
        >
          Xóa thông tin CBCC
        </button>
      </div>
    </div>
    <PopupConfirm
      :title="title"
      @action="actionAd == 'all' ? deleteAccount() : deleteInfPoli()"
      v-show="isShowPopup"
      @closePopup="closePopup()"
    />
    <Notification
      :status="status"
      :object="obj"
      :action="'Xóa'"
      :isShowNoti="showNoti"
      v-if="showNoti == 'Ok'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      list: {},
      listPoli: {},
      id: "",
      idPoli: null,
      genderEx: "",
      isMarried: "",
      obj: "",
      isShowPopup: false,
      status: "",
      showNoti: "",
      actionAd: "",
      title: "",
    };
  },
  mounted() {
    this.id = localStorage.getItem("admin_idCitizen");
    this.fetchData();
    this.fetchDataPoli();
  },

  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
          .then((res) => {
            this.list = res["data"];
            console.log("data" + this.list);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataPoli() {
      try {
        console.log("poliInfor");
        await this.$axios
          .get(`http://localhost:8080/api/politician/citizenId=${this.id}`)
          .then((res) => {
            this.listPoli = res["data"];
            this.listPoli.levelManagerVN = this.checkLevelManager(
              this.listPoli
            );
            console.log(this.listPoli);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAccount() {
      try {
        this.isShowPopup = false;
        await this.$axios
          .delete(`http://localhost:8080/api/citizen/delete/id=${this.id}`)
          .then(() => {
            this.obj = "tài khoản";
            this.status = "thành công";
            this.showNoti = "Ok";
            this.isShowPopup = false;
            setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/admin/listInforAll/_listInforAll");
            }, 1500);
          });
        console.log(this.list);
      } catch (error) {
        this.obj = "tài khoản ";
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.log(error);
      }
    },
    async deleteInfPoli() {
      try {
        this.isShowPopup = false;
        this.idPoli = this.listPoli.politicianId;
        await this.$axios
          .delete(
            `http://localhost:8080/api/politician/delete/politicianId=${this.idPoli}`
          )
          .then(() => {
            this.obj = "thông tin CBCC";
            this.status = "thành công";
            this.showNoti = "Ok";
            this.isShowPopup = false;
            setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/admin/listInforAll/_listInforAll");
            }, 1500);
          });
        console.log(this.list);
      } catch (error) {
        this.obj = "thông tin CBCC ";
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.log(error);
      }
    },
    openPopup1() {
      this.isShowPopup = true;
      this.actionAd = "all";
      this.title = "Xóa tài khoản";
    },
    openPopup2() {
      this.isShowPopup = true;
      this.actionAd = "";
      this.title = "Xóa thông tin CBCC";
    },
    closePopup() {
      this.isShowPopup = false;
    },
    checkLevelManager(item) {
      if (item.levelManager === "city") {
        return "Tỉnh";
      }
      if (item.levelManager === "district") {
        return "Huyện/Thành phố";
      }
      if (item.levelManager === "ward") {
        return "Thị trấn/Xã";
      }
      if (item.levelManager === "quarter") {
        return "Khối/Làng";
      }
    },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.container h2 {
  padding: 10px;
  width: fit-content;
  margin-bottom: 30px;
  position: relative;
  position: relative;
  left: 320px;
  bottom: -30px;
}

ul {
  list-style: none;
}
.admin__icon--arrow {
  width: 8px;
  height: auto;
  position: absolute;
  right: 48px;
  top: 120px;
  fill: #fff;
  transition: all 0.3s linear;
}

img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

.admin-delInfo {
  border: none;
  border-radius: 10px;
  padding: 8px 15px;
  background-color: #127e23;
  color: #fff;
  font-weight: 550;
  position: absolute;
  right: 40px;
  top: 110px;
  cursor: pointer;
  width: 110px;
  transition: all 0.2s linear;
}

.addmin-del-options {
  /* display: block; */
  background-color: #127e23;
  padding: 10px 15px;
  border-radius: 10px;
  width: 170px;
  position: absolute;
  top: 144px;
  right: 36px;
  margin: 0;
  display: none;
  opacity: 0;
  transform: translateY(-100%);
  transition: all 0.3 linear;
}
.addmin-del-options:hover {
  display: block;
}
.button-del {
  width: 170px;
  border: none;
  padding: 7px 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: green;
  color: #fff;
  font-weight: 550;
  cursor: pointer;
}
.admin-delete {
  position: absolute;
  top: 120px;
  right: 40px;
}
.admin-delete:hover .addmin-del-options {
  display: block;
  opacity: 1;
  transform: translateY(0);
}
.admin-delete:hover .admin-delInfo {
  background-color: #fff;
  color: #127e23;
  box-shadow: 3px 3px 10px rgb(194, 192, 192);
}
.admin-delete:hover .admin__icon--arrow {
  transform: rotate(90deg);
  fill: green;
}
.button-del:hover {
  background-color: #fff;
  color: black;
}
.backtolist {
  position: absolute;
  top: 30px;
}
</style>
