<template>
<div class="container">
    <h2> Danh sách cuộc hẹn {{ this.status }}</h2>
    <button @click="isShow=true" class="button-waiting">Đang xử lý</button>
    <button @click="isShow1=true" class="button-except">Chấp nhận</button>
    <button @click="isShow2=true" class="button-denied">Từ chối</button>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-0">STT</div>
        <div class="col col-1">Số CCCD</div>
        <div class="col col-2">Tên</div>
        <div class="col col-3">Ngày</div>
        <div class="col col-4">Từ</div>
        <div class="col col-5">Đến</div>
      </li> 
      <ul v-show="isShow" class="responsive-table content" v-for="item of listCitizen" :key="item.id">
        <li class="table-row display" @click.prevent="handleClick(item.citizen_id)">
          <div class="col col-0" data-label="STT">1</div>
          <div class="col col-1" data-label="Số CCCD">
            {{ item.citizen_id }}
          </div>
          <div class="col col-2" data-label="Tên">{{ item.name }}</div>
          <div class="col col-3" :keyup=gender(item.gender) data-label="Giới tính">{{genderEx }}</div>
          <div class="col col-4" data-label="Số điện thoại">
            {{ item.phone }}
          </div>
          <div class="col col-5" data-label="Địa chỉ">{{ item.address }}</div>
        </li>
      </ul>
      <ul v-show="!isShow" class="responsive-table content" v-for="item of listTmp" :key="item.id">
        <li class="table-row display" @click.prevent="handleClick(item.citizen_id)">
          <div class="col col-0" data-label="STT">1</div>
          <div class="col col-1" data-label="Số CCCD">
            {{ item.citizen_id }}
          </div>
          <div class="col col-2" data-label="Tên">{{ item.name }}</div>
          <div class="col col-3" :keyup=gender(item.gender) data-label="Giới tính">{{genderEx }}</div>
          <div class="col col-4" data-label="Số điện thoại">
            {{ item.phone }}
          </div>
          <div class="col col-5" data-label="Địa chỉ">{{ item.address }}</div>
        </li>
      </ul>

    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
        status:"Đang xử lý",
      listAppointment: [],
      idPoli:null,
      day: '',
    };
  },
  mounted() {
    this.idPoli = localStorage.getItem('idPolicitian')
    this.fetchData();
  },
  methods: {
    handleClick(citizenId) {
      localStorage.setItem("idCitizenOfSeeInforCitizen", citizenId);
      this.$router.push("/poli/seeInforCitizen/inforCitizen");
      console.log(this.idCitizen);
    },
    searchInforCitizen(){
      console.log("testSearch")
      // document.querySelector('.content').classList.add('display-none')
      this.isShow = false;

      for(let i=0; i < this.listCitizen.length; i++)
        if( this.listCitizen[i].citizen_id == this.idSearch)
        {
          this.listTmp.push(this.listCitizen[i]);
        }

    },
    seeInfor: function () {
      this.idCitizen = this.listCitizen.citizen_id;
      console.log(this.idCitizen);
    },
    async fetchData() {
      try {
        console.log("aaa" + this.nameArea);
        await this.$axios
          .post(`http://localhost:8080/api/appointment/politicianDateAppointmentStatus`, {
            politician_id:this.idPoli,
            appointmentDate: this.day,
            status: this.status
          })
          .then((res) => {
            this.listCitizen = res.data;
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    gender(gender) {
      if (gender === false) return (this.genderEx = "nữ");
      else return (this.genderEx = "nam");
    },
  },
};
</script>

<style scoped>
.display-none{
  background: red !important;
}

body {
  font-family: "lato", sans-serif;
}
.container {
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

h2 {
  font-size: 26px;
  margin: 50px 0 80px 0;
  text-align: center;
}

h2 small {
  font-size: 0.5em;
}

.responsive-table {
  padding-left: 0;
}
.responsive-table li {
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}

.responsive-table .table-header {
  background-color: rgb(159, 188, 159);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.responsive-table .table-row {
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}

.responsive-table .col-0 {
  flex-basis: 10%;
}

.responsive-table .col-1 {
  flex-basis: 10%;
}

.responsive-table .col-2 {
  flex-basis: 15%;
}

.responsive-table .col-3 {
  flex-basis: 15%;
}

.responsive-table .col-4 {
  flex-basis: 15%;
}

.responsive-table .col-5 {
  flex-basis: 15%;
}

.responsive-table div {
  text-align: center;
  cursor: pointer;
}

.input-search{
  width: 200px;
  padding: 5px 10px 5px 35px;
  border-radius: 15px;
  border: 0.5px solid black;
  position: absolute;
  right: 200px;
  top: 270px;
}

.icon-glass{
  width: 18px;
  height: auto;
  position: absolute;
  top: 275px;
  right: 420px;
}

.button-search{
  position: absolute;
  top: 270px;
  right: 120px;
  border-radius: 15px;
  padding: 5px 10px ;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
}

.button-waiting{
  position: absolute;
  top: 270px;
  left: 120px;
  border-radius: 10px;
  padding: 7px 15px ;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
}

.button-except{
  position: absolute;
  top: 270px;
  left: 230px;
  border-radius: 10px;
  padding: 7px 15px ;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
}

.button-denied{
  position: absolute;
  top: 270px;
  left: 340px;
  border-radius: 10px;
  padding: 7px 15px ;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
}
</style>