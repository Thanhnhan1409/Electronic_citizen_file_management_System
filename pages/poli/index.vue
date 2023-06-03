<template>
  <div class="container">
    <Navbar :userName =  "name"/>
    <InforCitizenNew :listInfor="list" />
    <InforPoli :listPoli="informationPoli" />
  </div>
</template>
<script>
import { useListCitizenStore} from '@/store/listCitizen'
export default {
  data() {
    return {
      message: "",
      list: {},
      informationPoli: {},
      id: "",
      idFamily: null,
      role: [],
      name: "", //lưu tên user
      title: "đăng xuất",
      listCitizen: [],
      listCitizenStore: useListCitizenStore(),
      level: "",
      nameArea: "",
      url: "",
      fUrl: "http://localhost:8080/api/citizen/listCitizen/",

    };
  },
  // middleware: "auth",
  mounted() {
    this.id = localStorage.getItem("id");
    this.fetchData();
    this.fetchDataPoli();
    this.name = localStorage.getItem("name");
    this.fetchListCitizen()
  },
  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
          .then((res) => {
            this.list = res["data"];
              localStorage.setItem("name", this.list.name);
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
            this.informationPoli = res["data"];
            this.informationPoli.levelManagerVN = this.checkLevelManagerPoli(this.informationPoli.levelManager);
            console.log(this.informationPoli);
            this.level = this.informationPoli.levelManager;
            this.nameArea = this.informationPoli.areaManage;
            localStorage.setItem("nameArea", this.nameArea);
            localStorage.setItem("level", this.level);
            localStorage.setItem("idPolicitian", this.informationPoli.politician_id);
          });
      } catch (error) {
        console.log(error);
      }
    },
    checkLevelManager() {
      if (this.level == "city")
        this.url = `${this.fUrl}city=${encodeURIComponent(this.nameArea)}`;
      else if (this.level == "district")
        this.url = `${this.fUrl}district=${encodeURIComponent(this.nameArea)}`;
      else if (this.level == "town")
        this.url = `${this.fUrl}town=${encodeURIComponent(this.nameArea)}`;
      else
        this.url = `${this.fUrl}quarter=${encodeURIComponent(this.nameArea)}`;
    },
    async fetchListCitizen() {
      this.checkLevelManager()
      try {
        await this.$axios.get(`${this.url}`).then((res) => {
          // this.listCitizen = res.data;
          this.listCitizenStore.setListCitizen(res.data);
          this.listCitizen = this.listCitizenStore.getListCitizen;
        });
      } catch (error) {
        console.log(error);
      }
    },
    checkLevelManagerPoli(item) {
      switch (item) {
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
<style src="~/static/asset/styles.css"></style>
