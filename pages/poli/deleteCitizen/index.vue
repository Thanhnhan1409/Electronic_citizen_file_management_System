<template>
  <div class="container">
    <h2>Xoá thông tin cá nhân</h2>
    <form @submit.prevent="fetchData" class="search">
      <input v-model="idSearch" class="input-search" type="text" placeholder="Nhập số CCCD" />
      <svg class="glass-find" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>
      <button @click.prevent="fetchData" class="button-search"> Tìm kiếm </button>
    </form>
    <button @click.prevent="deleteData" class="submit">Xoá tài khoản</button>
    <InforCitizenNew :list-infor="list" :genderEx="genderEx" @gender="gender"></InforCitizenNew>
  </div>
</template>
    
<script>
import InforCitizenNew from '../../../components/InforCitizenNew.vue';
export default {
  components: {
    InforCitizenNew
  },
  data() {
    return {
      message: "",
      list: {},
      idSearch: '',
      genderEx: ''
    };
  },
  mounted() {
    this.idSearch = localStorage.getItem('id');
    this.fetchData();
  },
  // middleware: 'auth',
  methods: {
    async fetchData() {
      try {
        await this.$axios.get(
          `http://localhost:8080/api/citizen/listCitizen/id=${this.idSearch}`
        )
          .then((res) => {
            this.list = res['data'];
          console.log(this.list)
          });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData() {
      try {
        confirm("Bạn có muốn xoá tài khoản không?")
        await this.$axios.delete(
          `http://localhost:8080/api/citizen/delete/id=${this.idSearch}`
        ).then(() => {
          alert('xoá thành công');
          //index=>inforPoli
          this.$router.push("/poli/inforPoli");
            
        })
        console.log(this.list)
      } catch (error) {
        console.log(error);
      }
    },
    gender(list) {
      if (list.gender === false) return (this.genderEx = "nữ");
      else return (this.genderEx = "nam");
    },
  },
}
</script>
    
<style scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.container {
  padding: 0;
}

.container h2 {
  padding: 10px;
  margin-bottom: 70px;
  width: fit-content;
}

ul {
  list-style: none;
}

img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}
.search{
  position: absolute;
  right: 400px;
  top: -100px;
}
.glass-find {
  width: 20px;
  height: auto;
  position: absolute;
  left: 33px;
  top: 239px;
}

.input-search {
  margin: 20px 0;
  border-radius: 20px;
  position: absolute;
  left: 25px;
  top: 213px;
  width: 200px;
  height: 18px;
  border: 1px solid black;
  padding: 5px 5px 5px 35px;
}

.button-search {
  position: absolute;
  left: 275px;
  top: 233px;
  background-color: green;
  color: #fff;
  padding: 7px 12px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  width: 80px;
}

.submit {
  padding: 7px 15px;
  background-color: green;
  color: #fff;
  border: none;
  font-size: 18px;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: 220px;
}
</style>