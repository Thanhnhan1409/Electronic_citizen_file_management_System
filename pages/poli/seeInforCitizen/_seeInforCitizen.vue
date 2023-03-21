<template>
  <div class="container">
    <div class="seeInfor--content">
      <h2>Danh sách công dân tại {{ this.level }} {{ this.nameArea }}</h2>
      <Search v-model="idSearch" @search="handleSearch" class="seeInfor--form"/>
      <button @click="isShow = true" class="button-show">Hiển thị toàn bộ</button>
      <ListInforCitizen v-show="isShow" :items="listCitizen" :genderEx="genderEx" @handleClick="handleClick" @gender="gender" />
      <ListInforCitizen v-show="!isShow" :items="listTmp" :genderEx="genderEx" @handleClick="handleClick" @gender="gender" />

    </div>

  </div>
</template>

<script>
import ListInforCitizen from '@/components/ListInforCitizen.vue';
import Search from '@/components/Search.vue';
export default {
  components: {
    ListInforCitizen,
    Search
  },
  data() {
    return {
      listCitizen: [],
      level: "",
      nameArea: "",
      url: "",
      id: null,
      idCitizen: null,
      idSearch: '',
      genderEx: '',
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
      if (this.level == "tỉnh")
        this.url = `${this.fUrl}city=${encodeURIComponent(this.nameArea)}`;
      else if (this.level == "huyện")
        this.url = `${this.fUrl}district=${encodeURIComponent(this.nameArea)}`;
      else if (this.level == "xã")
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
    },
    gender(gender) {
      if (gender === false) return (this.genderEx = "nữ");
      else return (this.genderEx = "nam");
    },
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
  max-width: 1250px;
  margin: 0 40px 0 280px;
  padding: 0 20px;
}

h2 {
  font-size: 18px;
  margin: 20px;
  color: #4B4545;
  /* text-align: center; */
}

h2 small {
  font-size: 0.5em;
}

.seeInfor--content {
  margin-top: 50px;
  padding: 20px 0;
  box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 10px;
}
.seeInfor--form{
  position: absolute;
  right: -20px;
  top: -180px;
}

.button-show {
  position: absolute;
  top: 85px;
  left: 700px;
  border-radius: 10px;
  padding: 7px 10px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
}</style>