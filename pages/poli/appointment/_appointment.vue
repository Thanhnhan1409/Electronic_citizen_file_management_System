<template>
  <div class="container">
    <h2 class="app-title">Danh sách lịch hẹn</h2>
    <div class="select-Date">
      <span>Ngày: </span>
      <input
        type="date"
        name=""
        v-model="date"
        id="form-date"
        @change="fetchDataByDate"
      />
    </div>
    <select
      class="App-combobox"
      @change="renderAppointment"
      name=""
      id=""
      value="Tất cả"
      v-model="status"
    >
      <option value="Tất cả">Tất cả</option>
      <option value="Đang xử lý">Đang xử lý</option>
      <option value="Chấp nhận">Chấp nhận</option>
      <option value="Từ chối">Từ chối</option>
    </select>
    <div class="list-appointment">
      <ul class="responsive-table">
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
        <ul
          class="responsive-table content"
          v-for="(item, index) in listTmp"
          :key="item.id_requirement"
        >
          <li class="table-row display">
            <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
            <div class="col col-1" data-label="Số CCCD công dân">
              {{ item.citizen.citizenId }}
            </div>
            <div class="col col-2" data-label="Tên">
              {{ item.citizen.name }}
            </div>
            <div class="col col-3" data-label="Ngày">
              {{ item.appointmentDate }}
            </div>
            <div class="col col-4" data-label="Bắt đầu">
              {{ item.startTime }}
            </div>
            <div class="col col-5" data-label="Kết thúc">
              {{ item.endTime }}
            </div>
            <div class="col col-7" data-label="Nội dung">
              {{ item.description }}
            </div>
            <div class="col col-6" data-label="Trạng thái">
              <span class="status-waiting">{{ item.status }}</span>
            </div>
            <div class="status col col-8">
              <svg
                class="icon__status-dot"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 512"
              >
                <path
                  d="M56 472a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0-160a56 56 0 1 1 0-112 56 56 0 1 1 0 112zM0 96a56 56 0 1 1 112 0A56 56 0 1 1 0 96z"
                />
              </svg>
              <ul class="status-action">
                <li @click.prevent="isShowPopup = 'popupAccept'">Chấp nhận</li>
                <li @click.prevent="isShowPopup = 'popupDenied'">Từ chối</li>
                <PopupConfirm
                  :title="'đổi trạng thái sang chấp nhận'"
                  @action="Accept(item)"
                  v-show="isShowPopup == 'popupAccept'"
                  @closePopup="closePopup"
                >
                </PopupConfirm>
                <PopupConfirm
                  :title="'đổi trạng thái sang từ chối'"
                  @action="denied(item)"
                  v-show="isShowPopup == 'popupDenied'"
                  @closePopup="closePopup"
                >
                </PopupConfirm>
              </ul>
            </div>
          </li>
        </ul>
      </ul>
    </div>
    <Notification
      :status="status"
      :object="'trạng thái'"
      :action="'Cập nhật'"
      :isShowNoti="showNoti"
      v-if="showNoti == 'Ok'"
    >
    </Notification>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: "Tất cả",
      listAppointment: [],
      listTmp: [],
      idPoli: null,
      date: "",
      state: "",
      idStatus: null,
      updateStatus: "",
      listDate: [],
      isShowPopup: "",
      status: "",
      showNoti: "",
    };
  },
  mounted() {
    this.idPoli = localStorage.getItem("idPolicitian");
    this.fetchData();
  },
  methods: {
    renderAllAppointment() {
      // this.hideOptionsTohandleStatus();
      this.listTmp.splice(0, this.listTmp.length);
      for (let i = 0; i < this.listAppointment.length; i++)
        this.listTmp.push(this.listAppointment[i]);
      console.log("all" + this.listTmp);
    },
    renderWaitingAppointment() {
      // this.renderOptionsTohandleStatus()
      this.listTmp.splice(0, this.listTmp.length);
      for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Đang xử lý") {
          this.listTmp.push(this.listAppointment[i]);
        }
      console.log("wait" + this.listTmp);
    },
    renderAcceptAppointment() {
      // this.hideOptionsTohandleStatus();
      this.listTmp.splice(0, this.listTmp.length);
      for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Chấp nhận")
          this.listTmp.push(this.listAppointment[i]);
      console.log("accept" + this.listTmp);
    },
    renderDeniedAppointment() {
      // this.hideOptionsTohandleStatus();
      this.listTmp.splice(0, this.listTmp.length);
      for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Từ chối") {
          this.listTmp.push(this.listAppointment[i]);
        }
      console.log("denied" + this.listTmp);
    },
    renderAppointment() {
      console.log(this.status);
      if (this.status == "Tất cả") this.renderAllAppointment();
      else if (this.status == "Đang xử lý") this.renderWaitingAppointment();
      else if (this.status == "Chấp nhận") this.renderAcceptAppointment();
      else this.renderDeniedAppointment();
    },
    async patchStatus() {
      try {
        console.log("Typeof" + typeof this.listAppointment);
        await this.$axios
          .patch(
            `http://localhost:8080/api/appointment/updateStatus/id=${this.idStatus}`,
            {
              string: this.updateStatus,
            }
          )
          .then((res) => {
            this.status = "thành công";
            this.showNoti = "Ok";
            setTimeout(() => {
              this.showNoti = "";
            }, 1500);
            this.listAppointment = res.data;
          });
      } catch (error) {
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.log(error);
      }
    },
    async fetchData() {
      try {
        await this.$axios
          .get(
            `http://localhost:8080/api/appointment/politician_id=${this.idPoli}`
          )
          .then((res) => {
            this.listTmp.splice(0, this.listTmp.length);
            this.listAppointment = res["data"];
            this.listTmp = this.listAppointment.slice();
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataByDate() {
      try {
        console.log(this.date);
        await this.$axios
          .get(
            `http://localhost:8080/api/appointment/listAppointment/?poliId=${this.idPoli}&dateString=${this.date}`
          )
          .then((res) => {
            this.listTmp.splice(0, this.listTmp.length);
            this.listTmp = res["data"];
            console.log("date" + this.listTmp);
            console.log("aaaa");
          });
      } catch (error) {
        console.log(error);
      }
    },
    Accept(item) {
      this.idStatus = item.id;
      this.updateStatus = "Chấp nhận";
    },
    denied(item) {
      this.idStatus = item.id;
      this.updateStatus = "Từ chối";
    },
    changeStatus() {
      this.patchStatus();
      this.listTmp = this.listAppointment.slice();
      this.renderAllAppoitment();
    },
    closePopup() {
      this.isShowPopup = "";
    },
  },
};
</script>
<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.list-appointment {
  margin-top: 60px;
  /* margin-left: 10px; */
  padding: 100px 0 20px 0;
  box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  width: 98%;
}
.app-title {
  font-size: 22px;
  position: absolute !important;
  top: 20px;
  left: 20px;
  z-index: 2;
  text-align: center;
  margin: 0;
  color: #4b4545;
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

.icon__status-dot:hover + .status-action {
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
.App-combobox {
  position: absolute;
  top: 40px;
  right: 60px;
  width: 130px;
  border-radius: 8px;
  padding: 5px 10px 5px 5px;
  border: none;
  box-shadow: 2px 2px 10px 2px rgb(206, 203, 203);
  z-index: 2;
}
.App-combobox option {
  padding-bottom: 10px;
}
</style>
