<template>
  <div class="container">
    <div class="content">
      <h2>Cập nhật thông tin cá nhân công dân</h2>
      <form @submit.prevent="fetchData" class="search">
        <input v-model="idSearch" class="input-search" type="text" placeholder="Nhập số CCCD"/>
        <svg class="glass-find" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        <button  @click.prevent="fetchData"  class="button-search"> Tìm kiếm </button>
      </form>
      <AddCitizen :list="list"></AddCitizen>
      <button  @click.prevent="submit" class="submit">Cập nhật</button>
      </div>
  </div>
</template>

<script>
import AddCitizen from "../../../components/AddCitizen.vue";
export default {
  components:{
    AddCitizen
  },
  data() {
    return {
      list: { },
      idSearch: '',
      namePage: "Cập nhật"
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
}

.container {
  padding: 0;
  overflow: hidden;
}

.container h2 {
  padding: 10px;
  width: fit-content;
  margin-bottom: 60px;
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
  padding: 10px 30px;
  background-color: green;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  margin-bottom: 40px;
  position: absolute;
  right: 2%;
  cursor: pointer;
  box-shadow: 3px 3px 3px 1px rgba(218, 169, 36, 0.25);
  top: 180px;
}

.glass-find{
  width: 20px;
  height: auto;
  position: absolute;
  left: 25px;  
  top: 237px;
}

.input-search{
  margin: 20px 0;
  border-radius: 20px;
  position: absolute;
  left: 15px;  
  top: 210px;
  width: 200px;
  height: 20px;
  border: 1px solid black;
  padding: 5px 5px 5px 35px;
}

.button-search{
  position: absolute;
  left: 275px;  
  top: 235px;
  background-color: green;
  color: #fff;
  padding: 5px 12px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}
</style>