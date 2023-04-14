<template>
    <div>
      <TabLeft/>
      <Search v-model="searchId" @search="handleSearch" />
      <ListCitizen :items="list" :searchId="searchId" :genderEx="genderEx"
      @gender="gender" @handleClick="handleClick" />
      <ListCitizen :items="list" :searchId="searchId" :genderEx="genderEx"
      @gender="gender" @handleClick="handleClick" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        list: [],
        searchId: null,
        genderEx:'',
      }
    },
    mounted(){
      this.fetchData();
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
    }
  }
  </script>
  
  