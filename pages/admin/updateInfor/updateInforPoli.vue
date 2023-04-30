<template>
  <div class="container">
    <BackToList class="backtolist"/>
    <Search class="search" v-model="idSearch" @search="handleSearch" />
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
    };
  },
  mounted() {
    this.id = localStorage.getItem("idCitizen");
    // this.name = localStorage.getItem('nameCitizen');
    // this.listPoli.citizen_id = this.idSearch;
  },
  methods: {
    async fetchDataPoli() {
      try {
        console.log("inforPoli");
        await this.$axios
          .get(
            `http://localhost:8080/api/politician/citizenId=${this.idSearch}`
          )
          .then((res) => {
            console.log(this.listPoli);
            this.listPoli = res["data"];
            this.listPoli.citizen_id = this.idSearch;
            console.log(this.listPoli);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async updatePoliInfor() {
      try {
        console.log("id"+ this.listPoli.citizen_id);
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
            // alert("Cập nhật thành công!");
            this.listPoli = res["data"];
            this.status = "thành công";
            this.showNoti = "Ok";
            this.isShowPopup = false;
            setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/admin/listInforAll/_listInforAll");
            }, 1500);
            // this.$router.push("/admin/listInforAll/_listInforAll");
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
    handleSearch(id) {
      this.idSearch = id;
      this.fetchDataPoli();
    },
    closePopup() {
      this.isShowPopup = false;
    },
    openPopup(){
        console.log("hehhe");
      this.isShowPopup = true;
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
.backtolist{
  position: absolute;
  top: 60px;
}
</style>
