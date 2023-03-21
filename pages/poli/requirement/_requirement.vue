<template>
  <div class="container">
    <div id="overlay" class=" display-hide "></div>
    <h2> Danh sách các yêu cầu</h2>
    <div class="button-display">
      <button @click="renderAllAppoitment" class="button-all">Tất cả</button>
      <button @click="renderWaitingAppoitment" class="button-waiting">Đang xử lý</button>
      <button @click="renderExceptAppoitment" class="button-except">Chấp nhận</button>
      <button @click="renderDeniedtAppoitment" class="button-denied">Từ chối</button>
    </div>
    <ul class="responsive-table req-content">
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
          <div class="col col-6" data-label="Trạng thái"> <span class="status-waiting">{{ item.status }}</span>
            <div class="handle-status">
              <button class="button-handle" @click.prevent="except(item)">Chấp nhận</button>
              <button class="button-handle" @click.prevent="denied(item)">Từ chối</button>
              <span>
                <svg class="handle-status-icon" @click.prevent="openPopUp(item)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z" />
                </svg>
              </span>
            </div>
          </div>
        </li>

      </ul>
    </ul>
    <form id="popUp-forward" class=" display-hide ">
      <svg @click.prevent="closePopUp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path
          d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
      </svg>
      <p>Chuyển tiếp yêu cầu</p>
      <span>ID Người Nhận:</span>
      <input v-model="idPoliForward" type="text" name="" id="">
      <button @click.prevent="forward">Xác nhận</button>
    </form>

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
      updateStatus: "",
      idPoliForward:'',
      idReq:'',
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
    hideOptionsTohandleStatus() {
      let waitStatus = document.querySelectorAll('.status-waiting');
      for (let j = 0; j < waitStatus.length; j++)
        waitStatus[j].classList.remove("display-hide")
      let handleStatus = document.querySelectorAll('.handle-status');
      for (let i = 0; i < handleStatus.length; i++)
        handleStatus[i].classList.remove("display-flex");
    },
    renderOptionsTohandleStatus() {
      let waitStatus = document.querySelectorAll('.status-waiting');
      for (let j = 0; j < waitStatus.length; j++)
        waitStatus[j].classList.add("display-hide")
      let handleStatus = document.querySelectorAll('.handle-status');
      for (let i = 0; i < handleStatus.length; i++)
        handleStatus[i].classList.add("display-flex");

    },
    async patchStatus() {
      try {
        await this.$axios
          .patch(`http://localhost:8080/api/requirement/updateStatus/id=${this.idStatus}`, {
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
            this.listTmp.splice(0, this.listTmp.length)
            this.listAppointment = res.data;
            this.listTmp = this.listAppointment.slice();
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    except(item) {
      this.idStatus = item.id_requirement;
      this.updateStatus = "Chấp nhận"
      this.patchStatus();
      this.renderWaitingAppoitment();
    },
    denied(item) {
      this.idStatus = item.id_requirement;
      this.updateStatus = "Từ chối"
      this.patchStatus();
      this.renderWaitingAppoitment();
    },
    openPopUp(item) {
      document.querySelector('#overlay').classList.remove('display-hide');
      document.querySelector('#popUp-forward').classList.remove('display-hide');
      document.querySelector('#popUp-forward').classList.add('display-block');
      document.querySelector('#popUp-forward').classList.add('display-block');
      this.idReq = item.id_requirement ;
    },
    closePopUp() {
      document.querySelector('#overlay').classList.add('display-hide');
      document.querySelector('#popUp-forward').classList.add('display-hide');
      document.querySelector('#popUp-forward').classList.remove('display-block');
      document.querySelector('#popUp-forward').classList.remove('display-block');

    },
    async forward(){
      try {
        console.log("chuyen");
        await this.$axios.put(`http://localhost:8080/api/requirement/forwardRequest?idReq=${this.idReq}&idPoli=${this.idPoliForward}`)
        .then((res)=>
        {
          alert("Chuyển thành công!");
          this.closePopUp();
        })
      } catch (error) {
        console.log(error)
      }
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
  margin:80px 20px 0 280px;
  padding-left: 10px;
  padding-right: 10px;
}

h2 {
  font-size: 18px;
  position: absolute;
  left: 300px;
  top: 100px;
  /* margin: 50px 0 80px 0; */
  text-align: center;
}

h2 small {
  font-size: 0.5em;
}
.req-content{
  padding: 100px 0 20px 0; 
  box-shadow: 3px 3px 10px rgb(206, 203, 203);
  border-radius: 10px;
  background-color: #fff;
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
  flex-basis: 18%;
}

.responsive-table .col-7 {
  flex-basis: 20%;
}

.responsive-table div {
  text-align: center;
  cursor: pointer;
}

.button-display{
  position: absolute;
  right: 40px;
  top: 110px;
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
  width: 70px;
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
  width: 120px;

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
  width: 100px;

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
  width: 90px;

}

.button-handle {
  border-radius: 15px;
  padding: 5px 7px;
  border: none;
  background-color: green;
  color: #fff;
  cursor: pointer;
  margin-left: 5px;
}

.handle-status {
  display: none;
}

.handle-status-icon{
  width: 25px;
  height: auto;
  fill: green;
  margin-left: 5px;
}

.display-block {
  display: block !important;
}

.display-flex {
  display: flex !important;
  justify-content: space-evenly;  
}

.display-hide {
  display: none !important;
}

#popUp-forward {
  width: 280px;
  height: 120px;
  /* border: 1px solid black; */
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: fixed;
  left: 40%;
  top: 45%;
  z-index: 9;
  background-color: #f4f3f3;
}

#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -100%;
  opacity: 0.6;
  background-color: rgb(139, 142, 144);
  animation: overlay 0.5s ease forwards;
  z-index: 1;
}

@keyframes ovelay {
  from {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-100%);
  }

  to {
    opacity: 1;
    visibility: visible;
    transform: translateX(0%);

  }

}

#popUp-forward p {
  text-align: center;
  font-weight: 600;
}

#popUp-forward input {
  border: none;
  border-bottom: 1px solid black;
  padding: 3px 8px;
  border-radius: 5px;
  margin-left: 5px;
}

#popUp-forward button {
  margin-top: 15px;
  padding: 5px 10px;
  border: none;
  background-color: green;
  color: #fff;
  border-radius: 7px;
  cursor: pointer;
}

#popUp-forward svg {
  width: 10px;
  height: auto;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
}</style>