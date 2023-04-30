<template>
  <div class="container">
    <div id="overlay" v-show="isShowForward"></div>
    <h2 class="title">Danh sách các yêu cầu của công dân tại {{ nameArea }}</h2>
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
    <div class="list-requirements">
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-0">STT</div>
          <div class="col col-1">Số CCCD</div>
          <div class="col col-2">Tên</div>
          <div class="col col-3">Ngày</div>
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
              {{ item.author.citizenId }}
            </div>
            <div class="col col-2" data-label="Tên">{{ item.author.name }}</div>
            <div class="col col-3" data-label="Ngày">{{ item.date }}</div>
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
                <li @click.prevent="handleAccept" class="accept-status">Chấp nhận</li>
                <li @click.prevent="handleDenied = 'popupDenied'" class="deny-status">Từ chối</li>
                <li @click.prevent="openPopUp(item)" >Chuyển tiếp</li>
                <!-- <PopupConfirm
                  :title="'đổi trạng thái sang chấp nhận'"
                  @action="Accept(item)"
                  v-show="isShowPopup == 'popupAccept'"
                  @closePopup="closePopup"
                >
                </PopupConfirm> -->
                <PopupConfirm
                  :title="updatedStatus ==='denied'?  'đổi trạng thái sang từ chối': 'đổi trạng thái sang chấp nhận'"
                  @action="updatedStatus ==='denied'? denied(item):Accept(item) "
                  v-show="isShowPopup === true"
                  @closePopup="closePopup"
                >
                </PopupConfirm>
              </ul>
            </div>
          </li>
        </ul>
      </ul>
    </div>
    <!-- <form id="popUp-forward" v-show="isShowForward">
      <svg
        @click.prevent="isShowForward = false"
        class="popup--icon-close"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
        />
      </svg>
      <p>Chuyển tiếp yêu cầu</p>
      <span>ID CBCD người nhận:</span>
      <input v-model="idPoliForward" type="text" name="" id="" />
      <div class="popup--button">
        <button @click.prevent="isShowForward = false" class="cancel">
          Hủy
        </button>
        <button @click.prevent="openPopUpForwardConfirm()" class="confirm">
          Xác nhận
        </button>
      </div>
    </form> -->
    <PopupAddReqAndApp
      :idPoliForward="idPoliForward"
      :obj="'forwardRequirement'"
      :title="'Chuyển tiếp yêu cầu'"
      @action="openPopUpForwardConfirm"
      @closePopUp="closePopupForward()"
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
      :object="'tài khoản'"
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
      listAppointment: [],
      listTmp: [],
      idPoli: null,
      idStatus: null,
      updateStatus: "",
      idPoliForward: "",
      idReq: "",
      nameArea: "",
      isShowPopup: "",
      isShowForward: false,
      isShowPopupForwardConfirm: false,
      status: "",
      showNoti: "",
      updatedStatus:''
    };
  },
  mounted() {
    this.idPoli = localStorage.getItem("idPolicitian");
    this.fetchData();
    this.nameArea = localStorage.getItem("nameArea");
  },
  methods: {
    renderAllReq() {
      // this.hideOptionsTohandleStatus();
      this.listTmp.splice(0, this.listTmp.length);
      for (let i = 0; i < this.listAppointment.length; i++)
        this.listTmp.push(this.listAppointment[i]);
    },
    renderWaitingReq() {
      // this.renderOptionsTohandleStatus()
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
            this.isShowPopup = false;
            this.listAppointment = res.data;
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
    Accept(item) {
      this.idStatus = item.id_requirement;
      this.updateStatus = "Chấp nhận";
      this.patchStatus();
      this.listTmp = this.listAppointment.slice();
      // this.renderAllReq();
    },
    denied(item) {
      this.idStatus = item.id_requirement;
      this.updateStatus = "Từ chối";
      this.patchStatus();
      this.listTmp = this.listAppointment.slice();
    },
    changeStatus() {
      this.patchStatus();
      this.listTmp = this.listAppointment.slice();
      this.renderAllReq();
      this.closePopUpChangeStatus();
    },
    openPopUp(item) {
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
    closePopupForward(){
      this.isShowForward = false
    },
    async forward() {
      try {
        console.log("chuyen");
        await this.$axios
          .put(
            `http://localhost:8080/api/requirement/forwardRequest?idReq=${this.idReq}&idPoli=${this.idPoliForward}`
          )
          .then((res) => {
            // alert("Chuyển thành công!");
            this.isShowPopupForwardConfirm = false;
          });
      } catch (error) {
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
    handleAccept(){
      this.isShowPopup = true ;
      this.updatedStatus = 'accept';

    },
    handleAccept(){
      this.isShowPopup = true ;
      this.updatedStatus = 'denied';

    }
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
  color: #127E23;
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
