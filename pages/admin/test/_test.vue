<!-- <template>
    <div>
      <h1>Search Items</h1>
      <form @submit.prevent="searchItems">
        <label>
          Search ID:
          <input v-model="searchId" type="text" />
        </label>
        <button type="submit">Search</button>
      </form>
      <test :list="list" :idsToMatch="matchedIds" v-if="showResult" />
    </div>
  </template>
  
  <script>
  import test from '../../../components/test.vue'
  
  export default {
    components: {
        test
    },
    data() {
      return {
        searchId: '',
        list:[],
        matchedIds: [],
        showResult: false,
        id:null
      }
    },
    mounted(){
      this.id = localStorage.getItem("id");
      this.fetchData();
    },
    methods: {
      searchItems() {
        this.matchedIds = [parseInt(this.searchId)]
        this.showResult = true
      },
      async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/country`)
          .then((res) => {
            this.list = res.data;
          });
      } catch (error) {
        console.log("test fectdata");
        console.log(error);
      }
    },
    },
  }
  </script>
   -->
<template>
  <div>
    <TabLeft />
    <Search v-model="searchId" @search="handleSearch" />
    <InforOfPoli :items="filteredItems"  :genderEx="genderEx" @gender="gender" @handleClick="handleClick" />
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      list: [],
      searchId: null,
      genderEx: '',
      listCitizen: [],
      listPolitician: [],
      level: "",
      nameArea: "",
      url: "",
      id: null,
      idCitizen: null,
      genderEx: '',
      listTmp1: [],
      listTmp2: [],
      isShow: true,
    }
  },
  mounted() {
    this.id = localStorage.getItem("id");
    this.level = localStorage.getItem("level");
    this.nameArea = localStorage.getItem("nameArea");
    this.fetchData();
    // this.fetchDataPoli();
  },
  computed:{
    filteredItems() {
        return this.list.filter(item => item.citizenId== this.searchId)
      }
  },
  methods: {
    handleSearch(id) {
      this.searchId = id
    },
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/country`)
          .then((res) => {
            this.list = res.data;
          });
      } catch (error) {
        console.log("test fectdata");
        console.log(error);
      }
    },
    gender(gender) {
      if (gender === false) return (this.genderEx = "nữ");
      else return (this.genderEx = "nam");
    },
    handleClick(citizenId) {
      localStorage.setItem("admin_idCitizen", citizenId);
      this.$router.push("/admin/listInforAll/poliInfor");
      console.log(this.idCitizen);
    },
    handleClick1(citizenId) {
      localStorage.setItem("admin_idCitizen", citizenId);
      this.$router.push("/admin/listInforAll/poliInfor");
      console.log(this.idCitizen);
    },
    handleClick2(citizenId) {
      localStorage.setItem("admin_idCitizen", citizenId);
      this.$router.push("/admin/listInforAll/citizenInfor");
      console.log(this.idCitizen);
    },
  },
}
</script>
  
  