<template>
  <div class="container">
    <Navbar :userName="name" />
    <ButtonDownload :urlDownloadPDF="urlDownloadPDF" />
    <Search v-model="idSearch" @search="handleSearch" class="seeInfor--form" />
    <button @click="isShow = true" class="button-show">Hiển thị toàn bộ</button>
    <ListInfor6Colums
      :listTmp="isShow === true ? listCitizen : listTmp"
      :object="'poliListCitizen'"
      :title="'công dân'"
      @pushToDetailInfor="handleClick"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      listCitizen:[],
      level: "",
      nameArea: "",
      url: "",
      idPolicitian: null,
      idCitizen: null,
      idSearch: "",
      isShow: true,
      fUrl: "http://localhost:8080/api/citizen/listCitizen/",
      urlDownloadPDF: "",
      name: "",
    };
  },
  mounted() {
    this.idPolicitian = localStorage.getItem("idPolicitian");
    this.level = localStorage.getItem("level");
    this.nameArea = localStorage.getItem("nameArea");
    this.name = localStorage.getItem("name");
    this.checkLevelManager();
    this.fetchData();
    this.urlDownloadPDF = `http://localhost:8080/api/citizen/export-to-pdf/citizen/poliId=${this.idPolicitian}`;
  },
  computed: {
    listTmp() {
      return this.listCitizen.filter(
        (item) =>
          item.citizenId.toString() === this.idSearch ||
          item.name
            .toString()
            .toLowerCase()
            .includes(this.idSearch.toLowerCase()) ||
          item.location.city
            .toString()
            .toLowerCase()
            .includes(this.idSearch.toLowerCase()) ||
          item.location.quarter
            .toString()
            .toLowerCase()
            .includes(this.idSearch.toLowerCase()) ||
          item.location.town
            .toString()
            .toLowerCase()
            .includes(this.idSearch.toLowerCase()) ||
          item.location.district
            .toString()
            .toLowerCase()
            .includes(this.idSearch.toLowerCase()) ||
          item.address
            .toString()
            .toLowerCase()
            .includes(this.idSearch.toLowerCase())
      );
    },
  },
  methods: {
    handleSearch(id) {
      this.idSearch = id;
      this.isShow = false;
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
    handleClick() {
      this.$router.push("/poli/viewInforCitizen/inforCitizen");
    },
    async fetchData() {
      try {
        await this.$axios.get(`${this.url}`).then((res) => {
          this.listCitizen =res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.seeInfor--form {
  position: absolute;
  right: 10px;
  top: 70px;
  margin: 0;
  width: fit-content;
  z-index: 3;
}

.button-show {
  position: absolute;
  top: 70px;
  left: 20px;
  border-radius: 10px;
  padding: 7px 10px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 3;
}
.button-show:hover {
  transform: scale(1.03);
  box-shadow: 3px 3px 10px 3px rgb(221, 221, 221);
}
</style>
