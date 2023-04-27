<template>
  <div class="container-updateRole">
    <BackToList />
    <div id="overlay" class="display-hide"></div>
    <h2 class="title">Cập nhật thông tin cán bộ</h2>
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

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.title {
  position: absolute;
  left: 320px;
  top: 80px;
  width: fit-content;
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
.search {
  position: absolute;
  top: 180px;
  left: 320px;
}

.form {
  margin-top: 110px;
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
  top: 30px;
  transition: all 0.2s linear;
  z-index: 2;
}

.submit:hover {
  transform: scale(1.05);
}
.infor {
  position: relative;
  top: 60px;
}
</style>
