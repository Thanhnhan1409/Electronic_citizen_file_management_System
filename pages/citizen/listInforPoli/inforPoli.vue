<template>
  <div class="container">
    <Tableft />
    <Navbar :userName = 'name' />
    <InforCitizenNew :listInfor="list" />
    <InforPoli :listPoli="listPoli" />
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
      idFamily: null,
      role: [],
      name: "", //lưu tên user
      title: "đăng xuất",
    };
  },
  mounted() {
    this.id = localStorage.getItem("idViewInfor");
    this.fetchData();
    this.fetchDataPoli();
    this.name = localStorage.getItem("name");
  },
  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
          .then((res) => {
            this.list = res["data"];
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataPoli() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/politician/citizenId=${this.id}`)
          .then((res) => {
            this.listPoli = res["data"];
            localStorage.setItem("nameArea", this.listPoli.areaManage);
            localStorage.setItem("level", this.listPoli.levelManager);
            localStorage.setItem("idPolicitian", this.listPoli.politician_id);
            this.listPoli.levelManagerVN = this.checkLevelManager(this.listPoli);
          });
      } catch (error) {
        console.log(error);
      }
    },
    checkLevelManager(item) {
      switch (item.levelManager) {
        case "city": {
          return "Tỉnh";
        }
        case "district": {
          return "Huyện/Thành phố";
        }
        case "ward": {
          return "Thị trấn/Xã";
        }
        case "quarter": {
          return "Khối/Làng";
        }
        default:
          break;
      }
    },
  },
};
</script>
<style src="../../../static/asset/styles.css"></style>
