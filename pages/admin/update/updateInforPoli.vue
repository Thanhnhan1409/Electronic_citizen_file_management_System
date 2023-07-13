<template>
  <div class="container">
    <BackToList class="backtolist" />
    <Search class="search" v-model="idSearch" @search="handleSearch" />
    <div class="content--item">
      <multiselect
        v-model="selectedPoliId"
        :options="listPolicitian"
        placeholder="Chọn cán bộ"
        label="name"
        @input="updateselectedPoliId"
      ></multiselect>
      <span v-show="errors.has('idPoli')" class="err">{{
        errors.first("idPoli")
      }}</span>
    </div>
    <div class="infor">
      <AddOrUpdatePoli
        :listPoli="listPoli"
        class="form"
        :action="'Cập nhật'"
        @openPopup="openPopup()"
      />
    </div>
    <PopupConfirm
      :title="'cập nhật thông tin CBCC'"
      @action="updatePoliInfor()"
      v-show="isShowPopup"
      @closePopup="closePopup"
    >
    </PopupConfirm>
    <Notification
      :status="status"
      :object="'thông tin CBCC'"
      :action="'Cập nhật'"
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
      idSearch: "",
      isShowPopup: false,
      status: "",
      showNoti: "",
      selectedPoliId: "",
      idPolicitian: "",
      listPolicitian: [],
      // levelManager: "Cả nước",
      // isShowCity: false,
      // isShowDistrict: false,
      // isShowTown: false,
      // isShow: true,
      // listLevelPoli: ["Cả nước", "Tỉnh/Thành phố", "Quận/Huyện", "Xã/Phường"],
      // listInfor: {},
      // listCity: [],
      // listDistrict: [],
      // listWard: [],
      levelManager: "Cả nước",
      inforSearch: {},
      selectedCitizenId: "",
      idCitizen: "",
      listCitizen: [],
    };
  },
  middleware: "auth",
  mounted() {
    this.fetchListDataPoli();
    this.id = localStorage.getItem("idPolicitian");
  },
  methods: {
    async fetchDataPoli() {
      try {
        await this.$axios
          .get(
            `http://localhost:8080/api/politician/citizenId=${this.idPolicitian}`
          )
          .then((res) => {
            this.listPoli = res.data;
            console.log("poli" + this.listPoli);
            this.listPoli.citizen_id = this.idSearch;
            this.listPoli.levelManagerVN = this.checkLevelManager(this.listPoli);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchListDataPoli() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/politician/listPolitician/country`)
          .then((res) => {
            this.listPolicitian = res.data.map((item) => item.citizen);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async updatePoliInfor() {
      try {
        console.log("id" + this.listPoli.citizen_id);
        console.log("area" + this.listPoli.areaManage);
        console.log("level" + this.listPoli.levelManager);
        console.log("positon" + this.listPoli.position);
        await this.$axios
          .put(
            `http://localhost:8080/api/politician/update/politicianId=${
              this.listPoli.politicianId
            }/?levelManageEncode=${encodeURIComponent(
              this.listPoli.levelManager
            )}&areaManageEncode=${encodeURIComponent(
              this.listPoli.areaManage
            )}&positionEncode=${encodeURIComponent(this.listPoli.position)}`
          )
          .then((res) => {
            this.listPoli = res["data"];
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
    handleSearch(id) {
      this.idSearch = id;
      this.fetchDataPoli();
    },
    closePopup() {
      this.isShowPopup = false;
    },
    openPopup() {
      console.log("hehhe");
      this.isShowPopup = true;
    },
    async updateselectedPoliId(value) {
      if (this.selectedPoliId !== null) {
        this.idPolicitian = this.selectedPoliId.citizenId;
        this.selectedPoliId = value;
        this.fetchDataPoli();
      }
    },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
/*   */

.search {
  position: absolute;
  top: 0px;
  right: 40px;
  z-index: 3;
  width: fit-content;
}

.form {
  margin-top: 110px;
}
.infor {
  position: relative;
  top: 60px;
}
.backtolist {
  position: absolute;
  top: 60px;
}
.multiselect {
  margin-top: 10px;
}
.content--item {
  padding-bottom: 7px;
  position: absolute;
  top: 80px;
  left: 40px;
  width: fit-content;
  z-index: 3;
  margin: 0;
}
</style>
