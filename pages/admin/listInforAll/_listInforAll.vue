<template>
  <div class="container">
    <Search class="search-form" v-model="idSearch" @search="handleSearch" />
    <div class="content">
      <button @click="isShow = true" class="button-show">
        Hiển thị toàn bộ
      </button>
      <ListInfor6Colums
        :listTmp="isShow === true ? listPolitician : listTmp1"
        :object="'poli'"
        :title="'cán bộ'"
        @pushToDetailInfor="handleClick1"
      />

      <ListInfor6Colums
        :listTmp="isShow === true ? listCitizen : listTmp2"
        :object="'poliListCitizen'"
        :title="'công dân'"
        @pushToDetailInfor="handleClick2"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listCitizen: [],
      listPolitician: [],
      level: "",
      nameArea: "",
      id: "",
      idCitizen: null,
      idSearch: "",
      isShow: true,
    };
  },
  computed: {
    listTmp1() {
      return this.listPolitician.filter(
        (item) => item.citizen.citizenId.toString() == this.idSearch
      );
    },
    listTmp2() {
      return this.listCitizen.filter(
        (item) => item.citizen_id.toString() == this.idSearch
      );
    },
  },
  mounted() {
    this.id = localStorage.getItem("id");
    this.level = localStorage.getItem("level");
    this.nameArea = localStorage.getItem("nameArea");
    this.fetchData();
    this.fetchDataPoli();
  },
  methods: {
    handleSearch(id) {
      this.idSearch = id;
      this.isShow = false;
    },
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/country`)
          .then((res) => {
            this.listCitizen = res.data;

            console.log("lisst citizen" + this.listCitizen);
          });
      } catch (error) {
        console.log("test fectdata");
        console.log(error);
      }
    },
    async fetchDataPoli() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/politician/listPolitician/country`)
          .then((res) => {
            this.listPolitician = res.data;
            this.listPolitician.forEach((politician) => {
              politician.levelManagerVN = this.checkLevelManager(politician);
            });
            console.log("poli" + res.data);
          });
      } catch (error) {
        console.log("test fetchdataPoli");
        console.log(error);
      }
    },
    handleClick1(citizenId) {
      localStorage.setItem("admin_idCitizen", citizenId);
      this.$router.push("/admin/listInforAll/poliInfor");
    },
    handleClick2(citizenId) {
      localStorage.setItem("admin_idCitizen", citizenId);
      this.$router.push("/admin/listInforAll/citizenInfor");
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
.content {
  position: relative;
  width: 100%;
}
.search-form {
  position: absolute;
  top: 75px;
  right: 20px;
  z-index: 3;
  margin: 0;
  width: fit-content;
}
.button-show {
  position: absolute;
  border-radius: 10px;
  padding: 7px 10px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
  z-index: 7;
  transition: all 0.2s linear;
  width: 120px;
  top: 140px;
  left: 89%;
}
.button-show:hover {
  transform: scale(1.02);
}
</style>
