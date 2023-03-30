<template>
  <div class="container">
    <div id="overlay" class=" display-hide "></div>
    <h2 class="app-title"> Danh sách lịch hẹn</h2>
    <div class="select-Date">
      <span>Ngày: </span>
      <input type="date" name="" v-model="date" id="form-date">
      <button class="date-button" @click.prevent="fetchDataByDate">Hiển thị</button>
    </div>

    <div class="app-button">
      <button @click="renderAllAppoitment" class="button-all">Tất cả</button>
      <button @click="renderWaitingAppoitment" class="button-waiting">Đang xử lý</button>
      <button @click="renderAcceptAppoitment" class="button-except">Chấp nhận</button>
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
      <ul class="responsive-table content" v-for="(item, index) in listTmp" :key="item.id_requirement">
        <li class="table-row display">
          <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
          <div class="col col-1" data-label="Số CCCD công dân">
            {{ item.citizen.citizenId }}
          </div>
          <div class="col col-2" data-label="Tên">{{ item.citizen.name }}</div>
          <div class="col col-3" data-label="Ngày">{{ item.appointmentDate }}</div>
          <div class="col col-4" data-label="Bắt đầu">{{ item.startTime }}</div>
          <div class="col col-5" data-label="Kết thúc">{{ item.endTime }}</div>
          <div class="col col-7" data-label="Nội dung">{{ item.description }}</div>
          <div class="col col-6" data-label="Trạng thái">
            <span class="status-waiting">{{ item.status }}</span>
          </div>
          <div class="status col col-8">
            <svg class="icon__status-dot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M56 472a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0-160a56 56 0 1 1 0-112 56 56 0 1 1 0 112zM0 96a56 56 0 1 1 112 0A56 56 0 1 1 0 96z"/></svg>
            <ul class="status-action">
              <li @click.prevent="except(item)" >Chấp nhận</li>
              <li @click.prevent="denied(item)">Từ chối</li>
            </ul>
          </div>
        </li>
      </ul>
    </ul>
    <PopupConfirm @action="changeStatus" />
  </div>
</template>
<script>
import PopupConfirm from '@/components/PopupConfirm.vue';
export default {
  components: {
    PopupConfirm
  },
  data() {
    return {
      status: "",
      listAppointment: [],
      listTmp: [],
      idPoli: null,
      date: '',
      state: '',
      idStatus: null,
      updateStatus: "",
      listDate: []
    };
  },
  mounted() {
    this.idPoli = localStorage.getItem('idPolicitian')
    this.fetchData();
  },
  methods: {
    renderAllAppoitment() {
      // this.hideOptionsTohandleStatus();
      this.listTmp.splice(0, this.listTmp.length)
      for (let i = 0; i < this.listAppointment.length; i++)
        this.listTmp.push(this.listAppointment[i]);
      console.log("all" + this.listTmp)
    },
    renderWaitingAppoitment() {
      // this.renderOptionsTohandleStatus()
      this.listTmp.splice(0, this.listTmp.length)
      for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Đang xử lý") {
          this.listTmp.push(this.listAppointment[i]);
        }
      console.log("wait" + this.listTmp)

    },
    renderAcceptAppoitment() {
      // this.hideOptionsTohandleStatus();
      this.listTmp.splice(0, this.listTmp.length)
      for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Chấp nhận")
          this.listTmp.push(this.listAppointment[i]);
      console.log("accept" + this.listTmp)

    },
    renderDeniedtAppoitment() {
      // this.hideOptionsTohandleStatus();
      this.listTmp.splice(0, this.listTmp.length)
      for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Từ chối") {
          this.listTmp.push(this.listAppointment[i]);
        }
      console.log("denied" + this.listTmp)
    },
    async patchStatus() {
      try {
        await this.$axios
          .patch(`http://localhost:8080/api/appointment/updateStatus/id=${this.idStatus}`, {
            string: this.updateStatus
          })
          .then((res) => {
            this.listAppointment = res['data'];
            this.listTmp = this.listAppointment.slice();
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/appointment/politician_id=${this.idPoli}`)
          .then((res) => {
            this.listTmp.splice(0, this.listTmp.length)
            this.listAppointment = res['data'];
            this.listTmp = this.listAppointment.slice();
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataByDate() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/appointment/listAppointment/?poliId=${this.idPoli}&dateString=${this.date}`)
          .then((res) => {
            this.listTmp.splice(0, this.listTmp.length)
            this.listTmp = res['data'];
            console.log("date" + this.listTmp)
            console.log('aaaa')
          });
      } catch (error) {
        console.log(error);
      }
    },
    openPopUpChangeStatus(item) {
      document.querySelector('#overlay').classList.remove('display-hide');
      document.querySelector('#popup--confirm-change').classList.remove('display-hide');
      document.querySelector('#popup--confirm-change').classList.add('display-block');
      document.querySelector('#popup--confirm-change').classList.add('display-block');
      this.idReq = item.id_requirement;
    },
    except(item) {
      this.idStatus = item.id;
      this.updateStatus = "Chấp nhận";
      this.openPopUpChangeStatus(item)
    },
    denied(item) {
      this.idStatus = item.id;
      this.updateStatus = "Từ chối";
      this.openPopUpChangeStatus(item)
    },
    changeStatus() {
      this.patchStatus();
      this.renderAllAppoitment();
    },
    
  },
};
</script>
<style src="../../../static/asset/styles.css"></style>
<style scoped>
.container {
  max-width: 1250px;
  margin: 80px 0 0 280px;
  padding-left: 10px;
  padding-right: 10px;
}

.app-title {
  font-size: 20px;
  position: absolute;
  top: 100px;
  left: 300px;
  text-align: center;
  margin: 0;

}
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: -100%;
  opacity: 0.6;
  background-color: rgb(139, 142, 144);
  animation: overlay 0.5s ease forwards;
  z-index: 10;
}
/* form select date */
.select-Date {
  position: absolute;
  left: 300px;
  top: 140px;
}

#form-date {
  margin-left: 10px;
  padding: 3px 10px;
  border: none;
  box-shadow: 3px 3px 10px 2px rgb(226, 224, 226);
  border-radius: 8px;
}

.app-content {
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
  position: relative;
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

.app-button {
  position: absolute;
  right: 30px;
  top: 130px;
}

.button-all {
  border-radius: 10px;
  padding: 7px 15px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
}

.button-waiting {
  border-radius: 10px;
  padding: 7px 15px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
}

.button-except {
  border-radius: 10px;
  padding: 7px 15px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
}

.button-denied {
  border-radius: 10px;
  padding: 7px 15px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
}

.button-handle {
  border-radius: 15px;
  padding: 5px 7px;
  border: none;
  background-color: green;
  color: #fff;
  cursor: pointer;
}

.handle-status {
  display: none;
}

.display-block {
  display: block !important;
}

.display-hide {
  display: none !important;
}

.date-button {
  padding: 4px 8px;
  border: none;
  background-color: green;
  color: #ffff;
  box-shadow: 3px 3px 10px 3px rgb(232, 231, 231);
  border-radius: 6px;
  margin-left: 10px;
}

.cancel {
  background-color: #fff;
  border: 0.3px solid black;
  color: green;

}

.confirm {
  background-color: green;
  color: #fff;
  border: 1.3px solid #fff;
  margin-left: 5px;
}

.status {
  position: absolute;
  right: 55px;
  top: 5px;
}

.status-action {
  padding: 10px 15px;
  box-shadow: 3px 3px 10px #cccccc;
  background-color: #fff;
  border-radius: 5px;
  width: 100px;
  font-size: 15px;
  z-index: 3;
  transition: all 0.2s linear;
  opacity: 0;
  visibility: hidden;
}

.status-action li {
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.status-action li:hover {
  color: green;
  font-weight: 550;
}

.icon__status-dot {
  position: absolute;
  right: 0px;
  top: 25px;
  width: 3px;
  height: auto;
  cursor: pointer;
  /* z-index: 4; */
}

.icon__status-dot:hover {
  fill: green;
}

.icon__status-dot:hover+.status-action {
  opacity: 1;
  visibility: visible;
  display: block;
}

.status-action:hover {
  opacity: 1;
  visibility: visible;
  display: block;
}

#popup--confirm-change {
  width: 280px;
  height: auto;
  background-color: #fff;
  padding: 10px 25px;
  border-radius: 5px;
  position: fixed;
  z-index: 90;
  top: 40%;
  left: 45%;

}

#popup--confirm-change span {
  font-weight: 600;
  text-align: center;
}
</style>