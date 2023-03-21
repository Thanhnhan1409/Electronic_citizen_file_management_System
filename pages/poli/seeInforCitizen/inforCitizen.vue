<template>
  <div class="container">
    <Tableft />
    <button @click.prevent="deleteCitizen" class="poli-delInfo" >Xóa tài khoản</button>
    <InforCitizenNew :listInfor="listInfor" :genderEx="genderEx" @gender="gender" />  
    </div>
</template>
      
<script>
import Tableft from '@/components/Tableft.vue';
import InforCitizenNew from '@/components/InforCitizenNew.vue';
export default {
  components: {
    Tableft,
    InforCitizenNew
  },
  data() {
    return {
      listInfor: {},
      genderEx: "nu",
      id: null,
    };
  },
  mounted() {
    this.id = localStorage.getItem("idCitizenOfSeeInforCitizen");
    this.fetchDataCitizen();
  },
  methods: {
    async fetchDataCitizen() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
          .then((res) => {
            this.listInfor = res["data"];
            console.log(this.listInfor);
          });
      } catch (error) {
        console.log(error);
      }
    },
    gender(list) {
      if (list.gender === false) return (this.genderEx = "nữ");
      else return (this.genderEx = "nam");
    },
    async deleteCitizen() {
      try {
        confirm("Bạn có muốn xoá tài khoản không?")
        await this.$axios.delete(
            `http://localhost:8080/api/citizen/delete/id=${this.id}`
            ).then(() =>{
                alert('xoá thành công');
                //index=>inforPoli
                this.$router.push("/poli/inforPoli");
            
            })
          console.log(this.list)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
 .poli-delInfo{
    border: none;
    border-radius: 10px;
    padding: 8px 20px;
    background-color: green;
    color: #fff;
    font-weight: 550;
    position: absolute;
    right: 40px;
    top: 120px;
    font-size: 18px;
    cursor: pointer;
  }
</style>
      
      <!-- <style scoped>
body {
  margin: 0;
}

html {
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
}

.crimiantion {
  padding: 20px;
  border-bottom: 2px solid green;
  margin-bottom: 30px;
}

.crimimal-content {
  background-color: #f3f3f3;
  padding: 20px 10px;
  border-radius: 10px;
  min-height: 100px;
  margin-bottom: 10px;
}
</style> -->