<template>
  <div class="container">
    <div class="seeInfor--content">
      <h2 class="title">Danh sách công dân tại {{ this.level }} {{ this.nameArea }}</h2>
      <Search v-model="idSearch" @search="handleSearch" class="seeInfor--form"/>
      <button @click="isShow = true" class="button-show">Hiển thị toàn bộ</button>
      <ListInforCitizen v-show="isShow" :items="listCitizen"  @handleClick="handleClick"/>
      <ListInforCitizen v-show="!isShow" :items="listTmp" @handleClick="handleClick"/>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      listCitizen: [],
      level: "",
      nameArea: "",
      url: "",
      id: null,
      idCitizen: null,
      idSearch: '',
      isShow: true,
      fUrl: "http://localhost:8080/api/citizen/listCitizen/"
    };
  },
  mounted() {
    this.id = localStorage.getItem("id");
    this.level = localStorage.getItem("level");
    this.nameArea = localStorage.getItem("nameArea");
    this.checkLevelManager();
    this.fetchData();
  },
  computed:{
    listTmp(){
      return this.listCitizen.filter(item => item.citizenId == this.idSearch)
    }
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
      else this.url = `${this.fUrl}quarter=${encodeURIComponent(this.nameArea)}`;
      console.log(this.url);
      console.log("tesst1");
    },
    handleClick(citizenId) {
      localStorage.setItem("idCitizenOfSeeInforCitizen", citizenId);
      this.$router.push("/poli/seeInforCitizen/inforCitizen");
      console.log(this.idCitizen);
    },
    async fetchData() {
      try {
        console.log("aaa" + this.nameArea);
        await this.$axios
          .get(`${this.url}`,)
          .then((res) => {
            this.listCitizen = res.data;
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>
.display-none {
  background: red !important;
}

* {
  font-family: "lato", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin: 0 40px 0 280px;
  padding: 0 20px;
}

.title {
  font-size: 22px;
  margin: 20px;
  margin-bottom: 70px;
  color: #4B4545;
  /* text-align: center; */
}

.seeInfor--content {
  margin-top: 50px;
  padding: 20px 0;
  box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 10px;
  position: relative;
}
.seeInfor--form{
  position: absolute;
    right: 0px;
    top: 80px;
    margin: 0;
    width: fit-content;
}

.button-show {
  position: absolute;
  top: 80px;
  left: 20px;
  border-radius: 10px;
  padding: 7px 10px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
  transition: all 0.2s ease;
}
.button-show:hover{
  transform: scale(1.03);
  box-shadow: 3px 3px 10px 3px rgb(221, 221, 221);
}
</style>