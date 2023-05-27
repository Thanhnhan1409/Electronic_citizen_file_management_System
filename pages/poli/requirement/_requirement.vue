<template>
  <div class="container">
    <Navbar :userName = "name" />
    <div id="overlay" v-show="isShowForward"></div>
    <select
      class="req-combobox"
      @change="renderReq"
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
    <ListInfor6Colums
      :listTmp="listTmp"
      :object="'poliRequirement'"
      :title="`các yêu cầu của công dân tại ${nameArea}`"
      :updateStatus="updateStatus"
      @denied="denied"
      @accept="accept"
      @openPopup="openPopUp"
    />
    <PopupAddReqAndApp
      :idPoliForward="idPoliForward"
      :obj="object"
      :title="'Chuyển tiếp yêu cầu'"
      @action="openPopUpForwardConfirm"
      @closePopup="closePopupForward()"
      v-show="isShowForward"
    />
    <PopupConfirm
      :title="'chuyển tiếp yêu cầu'"
      @action="forward"
      v-show="isShowPopupForwardConfirm"
      @closePopup="closePopup()"
    >
    </PopupConfirm>
    <Notification
      :status="status"
      :object="object === 'poliForwardRequirement' ? 'yêu cầu' : 'trạng thái'"
      :action="object === 'poliForwardRequirement' ? 'Chuyển tiếp' : 'Cập nhật'"
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
      listAppointment: [],
      listTmp: [],
      idPoli: null,
      idStatus: null,
      updateStatus: "",
      idReq: "",
      nameArea: "",
      isShowForward: false,
      isShowPopupForwardConfirm: false,
      status: "",
      idPoliForward: {},
      showNoti: "",
      updatedStatus: "",
      object: "poliForwardRequirement",
      name:''
    };
  },
  mounted() {
    this.idPoli = localStorage.getItem("idPolicitian");
    this.fetchData();
    this.nameArea = localStorage.getItem("nameArea");
    this.name = localStorage.getItem('name');

  },
  methods: {
    renderAllReq() {
      this.listTmp.splice(0, this.listTmp.length);
      for (let i = 0; i < this.listAppointment.length; i++)
        this.listTmp.push(this.listAppointment[i]);
    },
    renderWaitingReq() {
      this.listTmp.splice(0, this.listTmp.length);
      for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Đang xử lý") {
          this.listTmp.push(this.listAppointment[i]);
        }
    },
    renderAcceptReq() {
      // this.hideOptionsTohandleStatus();
      this.listTmp.splice(0, this.listTmp.length);
      for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Chấp nhận") {
          this.listTmp.push(this.listAppointment[i]);
        }
    },
    renderDeniedReq() {
      // this.hideOptionsTohandleStatus();
      this.listTmp.splice(0, this.listTmp.length);
      for (let i = 0; i < this.listAppointment.length; i++)
        if (this.listAppointment[i].status == "Từ chối") {
          this.listTmp.push(this.listAppointment[i]);
        }
    },
    async patchStatus() {
      try {
        await this.$axios
          .patch(
            `http://localhost:8080/api/requirement/updateStatus/id=${this.idStatus}`,
            {
              string: this.updateStatus,
            }
          )
          .then((res) => {
            this.fetchData();
            this.status = "thành công";
            this.showNoti = "Ok";
            setTimeout(() => {
              this.showNoti = "";
            }, 1500);
            console.log("TEST REQ");
          });
      } catch (error) {
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.log("TEST REQ loi");
        console.log(error);
      }
    },
    async fetchData() {
      try {
        console.log("aaa" + this.nameArea);
        await this.$axios
          .get(
            `http://localhost:8080/api/requirement/politicianId=${this.idPoli}`
          )
          .then((res) => {
            this.listTmp.splice(0, this.listTmp.length);
            this.listAppointment = res.data;
            this.listTmp = this.listAppointment.slice();
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    accept(item) {
      this.idStatus = item.id_requirement;
      this.updateStatus = "Chấp nhận";
      this.patchStatus();
    },
    denied(item) {
      this.idStatus = item.id_requirement;
      this.updateStatus = "Từ chối";
      this.patchStatus();
    },
    changeStatus() {
      this.patchStatus();
      this.renderAllReq();
      this.closePopUpChangeStatus();
    },
    openPopUp(item) {
      console.log("m co hien len noi kh");
      this.isShowForward = true;
      this.idReq = item.id_requirement;
    },
    closePopup() {
      this.isShowPopup = false;
      this.isShowPopupForwardConfirm = false;
      this.isShowForward = true;
    },
    openPopUpForwardConfirm() {
      this.isShowPopupForwardConfirm = true;
      this.isShowForward = false;
    },
    closePopupForward() {
      this.isShowForward = false;
    },
    async forward() {
      try {
        console.log("chuyen");
        console.log(this.idPoliForward);
        await this.$axios
          .put(
            `http://localhost:8080/api/requirement/forwardRequest?idReq=${this.idReq}&idPoli=${this.idPoliForward.id}`
          )
          .then((res) => {
            // alert("Chuyển thành công!");
            this.status = "thành công";
            this.showNoti = "Ok";
            setTimeout(() => {
              this.showNoti = "";
            }, 1500);
            this.isShowPopupForwardConfirm = false;
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
    renderReq() {
      console.log(this.status);
      if (this.status == "Tất cả") this.renderAllReq();
      else if (this.status == "Đang xử lý") this.renderWaitingReq();
      else if (this.status == "Chấp nhận") this.renderAcceptReq();
      else this.renderDeniedReq();
    },
  },
};
</script>
<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.list-requirements {
  margin-top: 60px;
  /* margin-left: 10px; */
  padding: 100px 0 20px 0;
  box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  width: 97%;
}
.title {
  position: absolute !important;
  font-size: 22px;
  margin: 50px 0 60px 0;
  z-index: 2;
  color: #4b4545;
  left: 20px;
  top: 20px;
}
.req-combobox {
  position: absolute;
  top: 65px;
  right: 60px;
  width: 130px;
  border-radius: 8px;
  padding: 5px 10px 5px 5px;
  border: none;
  box-shadow: 2px 2px 10px 2px rgb(206, 203, 203);
  z-index: 2;
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
#popUp-forward {
  width: 300px;
  height: 170px;
  /* border: 1px solid black; */
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px 2px #3e463d;
  text-align: center;
  position: fixed;
  left: 45%;
  top: 39%;
  z-index: 90;
  background-color: #fff;
  animation: popup-visible 0.3s ease forwards;
}
@keyframes popup-visible {
  from {
    transform: scale(0.2);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
#popUp-forward p {
  text-align: center;
  font-weight: 650;
  margin-top: 20px;
}

#popUp-forward input {
  border: none;
  border-bottom: 1px solid black;
  padding: 3px 8px;
  margin: 35px 0 10px 10px;
  width: 100px;
}
.popup--icon-close {
  width: 10px;
  height: auto;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  fill: #818281;
}
.popup--button button {
  margin-top: 15px;
  padding: 5px 10px;
  cursor: pointer;
  width: 135px;
  border: 0.3px solid black;
}
.popup--button {
  display: flex;
  padding: 10px;
  justify-content: space-between;
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
  top: -3px;
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
  color: rgb(196, 152, 20);
  font-weight: 550;
}
.status-action .accept-status:hover {
  color: #127e23;
  font-weight: 550;
}
.status-action .deny-status:hover {
  color: rgb(196, 29, 20);
  font-weight: 550;
}
.icon__status-dot {
  position: absolute;
  right: 0px;
  top: 30px;
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
</style>
