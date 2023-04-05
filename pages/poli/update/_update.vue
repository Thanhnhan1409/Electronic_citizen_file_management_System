<template>
  <div class="container">
    <div class="content">
      <h2>Cập nhật thông tin cá nhân công dân</h2>
      <SearchVue id="search-form" v-model="idSearch" @search="handleSearch" />
      <AddAccount :list-infor="list"></AddAccount>
      <button @click.prevent="openPopUp" class="submit">Cập nhật</button>
      <PopupConfirm @action="submit"/>
    </div>
  </div>
</template>

<script>
import SearchVue from "@/components/Search.vue";
import AddAccount from "@/components/AddAccount.vue";
import PopupConfirm from "@/components/PopupConfirm.vue";
export default {
  components: {
    SearchVue,
    AddAccount,
    PopupConfirm
  },
  data() {
    return {
      list: {},
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
            this.list.city = res.data.location.city;
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
          .put(`http://localhost:8080/api/citizen/update`, this.list
          )
          .then((res) => {
            this.list = res.data;
          });
        console.log("test2");
        console.log(this.list);
      } catch (error) {
        console.log("test3");
        console.log(error);
      }
    },
    handleSearch(id) {
      this.idSearch = id;
      this.fetchData();
    },
    openPopUp(item) {
      document.querySelector('#overlay').classList.remove('display-hide');
      document.querySelector('#popup--confirm-change').classList.remove('display-hide');
      document.querySelector('#popup--confirm-change').classList.add('display-block');
      document.querySelector('#popup--confirm-change').classList.add('display-block');
      this.idReq = item.id_requirement ;
    },
  },
};
</script>
<style src="../../../static/asset/styles.css"></style>
<style scoped>
.container h2 {
  position: absolute;
  top: 70px;
  left: 330px;
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

#search-form {
  /* padding: 80px; */
  position: absolute;
  top: -260px;
  right: -60px;
}
</style>