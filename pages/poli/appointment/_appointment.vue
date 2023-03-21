<template>
    <div class="container">
      <h2 class="app-title"> Danh sách các yêu cầu</h2>
      <div class="select-Date">
        Ngày: 
        <select v-model="date"  id="form-date" > 
          <option>Tất cả</option>
          <option class="form__date--item" v-for="(item,index) in listDate" :key="index" :value="item" >{{ item }}</option>
        </select>
      </div>
      
      <div class="app-button">
        <button @click="renderAllAppoitment" class="button-all">Tất cả</button>
        <button @click="renderWaitingAppoitment" class="button-waiting">Đang xử lý</button>
        <button @click="renderExceptAppoitment" class="button-except">Chấp nhận</button>
        <button @click="renderDeniedtAppoitment" class="button-denied">Từ chối</button>
      </div>
      <ul class="responsive-table app-content">
        <li class="table-header">
          <div class="col col-0">STT</div>
          <div class="col col-1">Số CCCD</div>
          <div class="col col-2">Tên</div>
          <div class="col col-3">Ngày</div>
          <div class="col col-4">Bắt đầu</div>
          <div class="col col-5">Kết thúc</div>
          <div class="col col-7">Nội dung</div>
          <div class="col col-6">Trạng thái</div>
        </li>
        <ul class="responsive-table content" v-for="item of listTmp" :key="item.id_requirement">
          <li class="table-row display">
            <div class="col col-0" data-label="STT">{{ item.id }}</div>
            <div class="col col-1" data-label="Số CCCD công dân">
              {{ item.citizen.citizenId }}
            </div>
            <div class="col col-2" data-label="Tên">{{ item.citizen.name }}</div>
            <div class="col col-3" data-label="Ngày">{{ item.appointmentDate }}</div>
            <div class="col col-4" data-label="Ngày">{{ item.startTime }}</div>  
            <div class="col col-5" data-label="Ngày">{{ item.endTime }}</div>      
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
        date: '',
        state:'',
        idStatus: null,
        updateStatus:"",
        listDate:[],
      };
    },
    mounted() {
      this.idPoli = localStorage.getItem('idPolicitian')
      this.fetchData();
      this.getDateOfList(this.listAppointment);
    },
    methods: {
      renderAllAppoitment() {
        this.hideOptionsTohandleStatus();
        this.listTmp.splice(0, this.listTmp.length)
        for (let i = 0; i < this.listAppointment.length; i++)
          this.listTmp.push(this.listAppointment[i]);
        this.listDate.splice(0, this.listDate.length)
        this.getDateOfList(this.listTmp);
      },
      renderWaitingAppoitment() {
        this.renderOptionsTohandleStatus()
        this.listTmp.splice(0, this.listTmp.length)
        for (let i = 0; i < this.listAppointment.length; i++)
          if (this.listAppointment[i].status == "Đang xử lý") {
            this.listTmp.push(this.listAppointment[i]);
          }
        this.listDate.splice(0, this.listDate.length)
        this.getDateOfList(this.listTmp);
      },
      renderExceptAppoitment() {
        this.hideOptionsTohandleStatus();
        this.listTmp.splice(0, this.listTmp.length)
        for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Chấp nhận") {
          if (this.date == "Tất cả")
          this.listTmp.push(this.listAppointment[i]);
        }
        this.listDate.splice(0, this.listDate.length)
        this.getDateOfList(this.listTmp);
      },
      renderDeniedtAppoitment() {
        this.hideOptionsTohandleStatus();
        this.listTmp.splice(0, this.listTmp.length)
        for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Từ chối") {
          this.listTmp.push(this.listAppointment[i]);
        }
        this.listDate.splice(0, this.listDate.length)
        this.getDateOfList(this.listTmp);
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
            .patch(`http://localhost:8080/api/appointment/updateStatus/id=${this.idStatus}`,{
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
            .get(`http://localhost:8080/api/appointment/politician_id=${this.idPoli}`)
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
        this.idStatus = item.id;
        this.updateStatus = "Chấp nhận"
        this.patchStatus();
        this.renderWaitingAppoitment();
      },
      denied(item){
        this.idStatus = item.id;
        this.updateStatus = "Từ chối"
        this.patchStatus();
        this.renderWaitingAppoitment();
      },
      getDateOfList(list){
        for(let i =0; i< list.length;i++){
          
            this.listDate.push(list[i].appointmentDate);
          }
        this.listDate = Array.from(new Set(this.listDate))
        console.log(this.listDate)
      },
      //chua biet truyen cai gi vao
      async getListByDateAndSatus(){
        // try {
        //   await this.$axios.
        // } catch (error) {
        //   console.log(error)
        // }
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
    margin:80px 0 0 280px;
    padding-left: 10px;
    padding-right: 10px;
  }
  
  .app-title{
    font-size: 18px;
    position: absolute;
    top: 100px;
    left: 340px;
    text-align: center;
    margin: 0;

  }
  /* form select date */
  .select-Date{
    position: absolute;
    left:340px;
    top: 140px;
  }
  #form-date{
    margin-left: 10px;
    padding: 3px 10px;
    border: none;
    box-shadow: 3px 3px 10px 2px rgb(226, 224, 226);
    border-radius: 8px;
  }
  .app-content{
    padding: 80px 0 20px 0; 
    box-shadow: 3px 3px 10px rgb(206, 203, 203);
    border-radius: 10px;
    background-color: #fff;
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
    margin-top: 30px;
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
    flex-basis: 10%;
  }
  
  .responsive-table .col-3 {
    flex-basis: 10%;
  }

  .responsive-table .col-4 {
    flex-basis: 10%;
  }

  .responsive-table .col-5 {
    flex-basis: 10%;
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
  
  .app-button{
    position: absolute;
    right: 30px;
    top: 130px;
  }
  .button-all {
      /* position: absolute;
      top: 270px;
      left: 120px; */
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
  }
  
  .button-waiting {
    /* position: absolute;
    top: 270px;
    left: 190px; */
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
  }
  
  .button-except {
    /* position: absolute;
    top: 270px;
    left: 287px; */
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
  }
  
  .button-denied {
    /* position: absolute;
    top: 270px;
    left: 385px; */
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