
<template>
    <div class="container-admin">
        <Tableft/>
        <Navbar :userName="'Admin'"/>
        <nuxt-child/>
    </div>
</template>

<style scoped src="~/static/asset/styles.css"></style>
<!-- <script>
  export default {
    data() {
      return {
        message: "",
        list: {},
        listPoli: {},
        id: "",
        gender: "",
        idFamily: null,
        role: [],
        name: "",
      };
    },
    // middleware: "auth",
    mounted() {
      this.id = localStorage.getItem("id");
      this.fetchData();
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
        } catch (error) {
          console.log(error);
        }
      },
      logout: function () {
        localStorage.clear();
        localStorage.removeItem("auth._token.local");
        //login->index
        this.$router.push("/");
      },
    },
  };
  </script> -->
  <!-- <style scoped src="~/static/asset/styles.css"></style> -->
  <!-- <style scoped>
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .container {
    margin: 0;
    padding: 0;
  }
  
  .container h2 {
    padding: 10px;
    width: fit-content;
    margin-bottom: 0;
  }
  
  ul {
    list-style: none;
  }
  
  .infor {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 2px solid green;
    border-bottom: 2px solid green;
  }
  
  .infor-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
  }
  
  .list-infor {
    width: 50%;
  }
  
  .list-infor li {
    padding-bottom: 20px;
    line-height: 2;
    font-weight: 550;
  }
  
  .list-infor li span {
    font-weight: 400;
  }
  
  img {
    width: 180px;
    height: 210px;
    margin-right: 20px;
  }
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .container {
    margin: 0;
    padding: 0;
  }
  
  .container h2 {
    padding: 10px;
    width: fit-content;
    margin-bottom: 0;
  }
  
  .infor {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 2px solid green;
    border-bottom: 2px solid green;
  }
  
  .infor-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 70%;
  }
  
  .list-infor {
    width: 50%;
  }
  
  .list-infor li {
    padding-bottom: 20px;
    line-height: 2;
    font-weight: 550;
  }
  
  .list-infor li span {
    font-weight: 400;
  }
  
  img {
    width: 180px;
    height: 210px;
    margin-right: 20px;
    margin: 30px 0;
  }
  
  .header {
    display: flex;
    align-self: center;
    justify-content: space-between;
    background-color: green;
    height: 50px;
    color: #fff;
  }
  
  .content {
    display: flex;
  }
  
  ul {
    list-style: none;
    margin: 0;
  }
  
  .nav-item {
    text-align: center;
    padding: 15px 8px;
    border-radius: 4px;
    margin-right: 2px;
  }
  
  .nav-item svg {
    width: 18px;
    height: auto;
    padding-right: 10px;
    fill: #fff;
  }
  
  .nav-item:hover {
    background-color: #fff;
  }
  
  .nav-item:hover .link {
    color: black;
  }
  
  .nav-item:hover .logo-home {
    fill: black;
  }
  
  .passchange {
    display: none;
    background-color: green;
    color: #fff;
    position: absolute;
    top: 150px;
    right: 78px;
    padding: 10px;
    width: 170px;
  }
  
  .nickname:hover .passchange {
    display: block;
  }
  
  .nickname {
    padding: 12px 10px;
    border-radius: 4px;
  }
  
  .nickname:hover {
    background-color: #fff;
    color: black;
  }
  
  .management-child {
    display: none;
    position: absolute;
    left: 422px;
    top: 156px;
    padding-top: 15px;
    text-align: start;
    width: 180px;
    height: 100px;
    background-color: green;
    color: #fff;
  }
  
  .management-child li {
    padding-top: 10px;
  }
  
  .nav-item:hover .management-child {
    display: block;
  }
  
  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
  }
  
  .user svg {
    width: 20px;
    height: auto;
    padding: 0 20px;
    fill: #fff;
  }
  
  a {
    cursor: pointer;
    text-decoration: none;
    color: #fff;
  }
  
  .logout:hover {
    background-color: #fff;
    padding: 5px 10px;
    fill: black;
    margin-left: 20px;
    border-radius: 5px;
  }
  </style> -->
  
  