<template>
    <div class="container">
      <h2> Danh sách các yêu cầu</h2>
      <button @click="renderAllAppoitment" class="button-all">Tất cả</button>
      <button @click="renderWaitingAppoitment" class="button-waiting">Đang xử lý</button>
      <button @click="renderExceptAppoitment" class="button-except">Chấp nhận</button>
      <button @click="renderDeniedtAppoitment" class="button-denied">Từ chối</button>
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-0">STT</div>
          <div class="col col-1">Số CCCD</div>
          <div class="col col-2">Tên</div>
          <div class="col col-3">Ngày</div>
          <div class="col col-7">Nội dung</div>
          <div class="col col-6">Trạng thái</div>
        </li>
        <ul class="responsive-table content" v-for="item of listTmp" :key="item.id_requirement">
          <li class="table-row display">
            <div class="col col-0" data-label="STT">{{ item.id_requirement }}</div>
            <div class="col col-1" data-label="Số CCCD công dân">
              {{ item.author.citizenId }}
            </div>
            <div class="col col-2" data-label="Tên">{{ item.author.name }}</div>
            <div class="col col-3" data-label="Ngày">{{ item.date }}</div>      
          <div class="col col-7" data-label="Nội dung">{{ item.description }}</div>
            <div class="col col-6" data-label="Trạng thái" > <span class="status-waiting">{{ item.status }}</span>
              <div class="handle-status">
                <button class="button-handle" @click.prevent="except(item)">Chấp nhận</button>
                <button class="button-handle" @click.prevent="denied(item)">Từ chối</button>
              </div>
            </div>
          </li>
        </ul>
      </ul>
  
  
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        status: "",
        listAppointment: [],
        listTmp: [],
        idPoli: null,
        day: '',
        idStatus: null,
        updateStatus:"",
      };
    },
    mounted() {
      this.idPoli = localStorage.getItem('idPolicitian')
      this.fetchData();
    },
    methods: {
      renderAllAppoitment() {
        this.hideOptionsTohandleStatus();
        this.listTmp.splice(0, this.listTmp.length)
        for (let i = 0; i < this.listAppointment.length; i++)
          this.listTmp.push(this.listAppointment[i]);
      },
      renderWaitingAppoitment() {
        this.renderOptionsTohandleStatus()
        this.listTmp.splice(0, this.listTmp.length)
        for (let i = 0; i < this.listAppointment.length; i++)
          if (this.listAppointment[i].status == "Đang xử lý") {
            this.listTmp.push(this.listAppointment[i]);
          }
      },
      renderExceptAppoitment() {
        this.hideOptionsTohandleStatus();
        this.listTmp.splice(0, this.listTmp.length)
        for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Chấp nhận") {
          this.listTmp.push(this.listAppointment[i]);
        }
        
      },
      renderDeniedtAppoitment() {
        this.hideOptionsTohandleStatus();
        this.listTmp.splice(0, this.listTmp.length)
        for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Từ chối") {
          this.listTmp.push(this.listAppointment[i]);
        }
      },
      hideOptionsTohandleStatus(){
        let waitStatus = document.querySelectorAll('.status-waiting');
        for(let j =0; j<waitStatus.length; j++)
          waitStatus[j].classList.remove("display-hide")
        let handleStatus = document.querySelectorAll('.handle-status');
        for(let i =0; i<handleStatus.length; i++)
          handleStatus[i].classList.remove("display-block");
      },
      renderOptionsTohandleStatus(){
        let waitStatus = document.querySelectorAll('.status-waiting');
        for(let j =0; j<waitStatus.length; j++)
          waitStatus[j].classList.add("display-hide")
        let handleStatus = document.querySelectorAll('.handle-status');
        for(let i =0; i<handleStatus.length; i++)
          handleStatus[i].classList.add("display-block");
        
      },
      async patchStatus() {
        try {
          await this.$axios
            .patch(`http://localhost:8080/api/requirement/updateStatus/id=${this.idStatus}`,{
              string: this.updateStatus
            })
            .then((res) => {
              this.listAppointment = res.data;
              this.listTmp = this.listAppointment.slice();
              console.log(res);
            });
        } catch (error) {
          console.log(error);
        }
      },
      async fetchData() {
        try {
          console.log("aaa" + this.nameArea);
          await this.$axios
            .get(`http://localhost:8080/api/requirement/politicianId=${this.idPoli}`)
            .then((res) => {
              this.listTmp.splice(0,this.listTmp.length)
              this.listAppointment = res.data;
              this.listTmp = this.listAppointment.slice();
              console.log(res);
            });
        } catch (error) {
          console.log(error);
        }
      },
      except(item){
        this.idStatus = item.id_requirement;
        this.updateStatus = "Chấp nhận"
        this.patchStatus();
        this.renderWaitingAppoitment();
      },
      denied(item){
        this.idStatus = item.id_requirement;
        this.updateStatus = "Từ chối"
        this.patchStatus();
        this.renderWaitingAppoitment();
      }
    },
  };
  </script>
  
  <style scoped>
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

  .responsive-table .col-5 {
    flex-basis: 15%;
  }
  
  .responsive-table .col-6 {
    flex-basis: 15%;
  }
  
  .responsive-table .col-7 {
    flex-basis: 20%;
  }
  
  .responsive-table div {
    text-align: center;
    cursor: pointer;
  }
  
  .input-search {
    width: 200px;
    padding: 5px 10px 5px 35px;
    border-radius: 15px;
    border: 0.5px solid black;
    position: absolute;
    right: 200px;
    top: 270px;
  }
  
  .icon-glass {
    width: 18px;
    height: auto;
    position: absolute;
    top: 275px;
    right: 420px;
  }
  
  .button-search {
    position: absolute;
    top: 270px;
    right: 120px;
    border-radius: 15px;
    padding: 5px 10px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
  }
  
  .button-all {
    position: absolute;
    top: 270px;
    left: 120px;
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
  }
  
  .button-waiting {
    position: absolute;
    top: 270px;
    left: 190px;
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
  }
  
  .button-except {
    position: absolute;
    top: 270px;
    left: 287px;
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
  }
  
  .button-denied {
    position: absolute;
    top: 270px;
    left: 385px;
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
  }
  
  .button-handle{
    border-radius: 15px;
    padding: 5px 7px;
    border: none;
    background-color: green;
    color: #fff;
    cursor: pointer;
  }
  
  .handle-status{
    display: none;
  }
  
  .display-block{
    display: block !important;
  }
  
  .display-hide{
    display: none !important;
  }
  </style>