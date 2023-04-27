<template>
  <div class="container">
    <TabLeft/>
    <Search class="search-form" v-model="idSearch" @search="handleSearch"/>
    <div class="content">
      <!-- <h2 class="title--poli">Danh sách cán bộ công chức</h2> -->
      <button @click="isShow = true" class="button-show">Hiển thị toàn bộ</button>
      <ListPoli class="test" v-show="isShow" :list="listPolitician"  @handleClick="handleClick1"/>
      <ListPoli class="test" v-show="!isShow" :list="listTmp1" @handleClick="handleClick1"/>
      <!-- <h2 class="title--citizen">Danh sách công dân</h2> -->
      <ListCitizen class="test" v-show="isShow" :items="listCitizen" @handleClick="handleClick2" />
      <ListCitizen class="test" v-show="!isShow" :items="listTmp2" @handleClick="handleClick2"/>
    </div>
    
  </div>
</template>
<script>
export default{
  data() {
    return {
      listCitizen: [],
      listPolitician: [],
      level: "",
      nameArea: "",
      id: '',
      idCitizen: null,
      idSearch: '',
      isShow: true,
    };
  },
  computed: {
      listTmp1() {
        return this.listPolitician.filter(item => item.citizen.citizenId.toString() == this.idSearch)
      },
      listTmp2() {
        return this.listCitizen.filter(item => item.citizen_id.toString() == this.idSearch)
      }
    },
  mounted() {
    this.id = localStorage.getItem("id");
    this.level = localStorage.getItem("level");
    this.nameArea = localStorage.getItem("nameArea");
    this.fetchData();
    this.fetchDataPoli();
  },
  methods:{
    handleSearch(id) {
      this.idSearch = id;
      this.isShow= false;
    },
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/country`)
          .then((res) => {
            this.listCitizen = res.data;
            console.log("lisst citizen" + this.listCitizen)
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
  }
}
</script>


<style scoped>
.container{
  margin-left: 280px;
  margin-top: 100px;
  position: relative;
}

h2{
  padding: 10px 0 50px 0;
  margin: 0;
}
.title--citizen{
  position: absolute;
  top: 30px;
}
.search-form{
position: absolute;
top:75px;
left: 20px;
z-index: 3;
margin: 0;
width: fit-content;
}
.button-show {
  position: absolute;
  top: 65px;
  right: 70px;
  border-radius: 10px;
  padding: 7px 10px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
  z-index: 7;
  transition: all 0.2s linear;
}
.button-show:hover{
  transform: scale(1.02);
}
.test{
  width: 93%;
  position: relative;
  margin-bottom: 70px;
}
</style>

