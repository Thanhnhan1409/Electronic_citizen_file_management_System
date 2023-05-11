<template>
    <div class="container">
      <Tableft/>
      <Navbar/>
      <InforCitizenNew :listInfor="list"/>
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
              title: 'đăng xuất'
          };
      },
      // middleware: "auth",
      mounted() {
          this.id = localStorage.getItem("id");
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
                      localStorage.setItem("name", this.list.name);
                  });
              }
              catch (error) {
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
                      console.log(this.listPoli);
                  });
              }
              catch (error) {
                  console.log(error);
              }
          },
      },
  };
  </script>
  <style src="~/static/asset/styles.css"></style>
  