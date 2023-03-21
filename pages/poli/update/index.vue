<template>
  <div class="container">
    <div class="content">
      <h2>Cập nhật thông tin cá nhân công dân</h2>
      <SearchVue v-model="idSearch" @search="handleSearch" class="search--form"/>
      <AddAccount :list-infor="list"></AddAccount>
      <button  @click.prevent="submit" class="submit">Cập nhật</button>
      </div>
  </div>
</template>

<script>
import AddCitizen from "@/components/AddCitizen.vue";
import SearchVue from "@/components/Search.vue";
import AddAccount from "@/components/AddAccount.vue";
export default {
  components:{
    AddCitizen,
    SearchVue,
    AddAccount
  },
  data() {
    return {
      list: { },
      idSearch: '',
    };
  },
  // middleware: 'nhan',
  methods: {
    async fetchData() {
      try {
        await this.$axios.get(
            `http://localhost:8080/api/citizen/listCitizen/id=${this.idSearch}`
          )
          .then((res) => {
            this.list = res.data;
            this.list.quarter = res.data.location.quarter;
            this.list.town = res.data.location.town;
            this.list.district = res.data.location.district;
            this.list.city  = res.data.location.city;
            this.list.idFamily = res.data.family.id_Family;
            console.log(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      try {
        console.log(this.list);
        console.log("test1");
        await this.$axios
          .put(`http://localhost:8080/api/citizen/update`,this.list
          )
          .then((res) => {
            console.log("test");
            alert('Cập nhật thành công!');
            this.list = res.data;
          });
          console.log("test2");
        console.log(this.list);
      } catch (error) {
        console.log("test3");
        console.log(error);
      }
    },
    handleSearch(id){
      this.idSearch = id;
      this.fetchData();
    }
  },
};
</script>

<style scoped>
body {
  margin: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}

.container {
  padding: 0;
  overflow: hidden;
}

.container h2 {
  padding: 10px;
  width: fit-content;
  margin:80px 0 20px 300px;
}

img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

input {
  padding: 5px;
  width: 200px;
  margin-left: 10px;
  border-radius: 8px;
  border: 0.8px solid black;
}

.submit {
  padding: 10px 20px;
  background-color: green;
  color: #fff;
  font-size: 18px;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  margin-bottom: 40px;
  position: absolute;
  right: 80px;
  cursor: pointer;
  box-shadow: 3px 3px 3px 1px rgba(218, 169, 36, 0.25);
  top: 190px;
}
.search--form{
  position: absolute;
  right: -80px;
  top: -200px;
}
</style>