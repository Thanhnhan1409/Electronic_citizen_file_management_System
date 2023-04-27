<template>
  <div class="container">
    <div class="container-listInfor">
      <h2 class="title">Danh sách lịch hẹn</h2>
      <PopupAddReqAndApp
        v-if="showAddApp === true"
        :appointment="appointment"
        :obj="'appointment'"
        :title="'Thêm lịch hẹn'"
        @closePopup="closePopup"
        @action="openPopupConfirm"
      />
      <ButtonAdd
      :title="'Thêm lịch hẹn'"
      @showAddApp="showAddAppf"
      />
      <div class="list-appointment">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-0">STT</div>
            <div class="col col-1">ID CBCC</div>
            <div class="col col-2">Tên</div>
            <div class="col col-3">Ngày</div>
            <div class="col col-4">Bắt đầu</div>
            <div class="col col-5">Kết thúc</div>
            <div class="col col-6">Nội dung</div>
            <div class="col col-7">Trạng thái</div>
          </li>
          <ul
            class="responsive-table content"
            v-for="(item, index) in listApp"
            :key="index"
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
              <div class="col col-6" data-label="Nội dung">
                {{ item.description }}
              </div>
              <div class="col col-7" data-label="Trạng thái">
                {{ item.status }}
              </div>
            </li>
          </ul>
        </ul>
      </div>
      <PopupConfirm
        :title="'thêm lịch hẹn'"
        @action="addApp"
        v-show="isShowPopup"
        @closePopup="closePopup"
      >
      </PopupConfirm>
      <Notification
        :status="status"
        :object="'lịch hẹn'"
        :action="'Thêm'"
        :isShowNoti="showNoti"
        v-if="showNoti == 'Ok'"
      >
      </Notification>
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            id: null,
            listApp: {},
            appointment: {},
            showAddApp: false,
            isShowPopup: false,
            showNoti: "",
            status: "",
        };
    },
    watch: {
        listApp() {
            // khi listApp thay đổi, cập nhật lại
            this.$nextTick(() => {
                console.log("listApp changed");
            });
        },
    },
    mounted() {
        this.id = localStorage.getItem("id");
        this.fetchListApp();
    },
    methods: {
        async fetchListApp() {
            try {
                await this.$axios
                    .get(`http://localhost:8080/api/appointment/citizen_id=${this.id}`)
                    .then((res) => {
                    this.listApp = res.data;
                });
            }
            catch (error) {
                console.log(error);
            }
        },
        async addApp() {
            try {
                this.showAddApp = false;
                this.appointment.citizen_id = this.id;
                console.log(this.appointment);
                await this.$axios
                    .post(`http://localhost:8080/api/appointment/new`, this.appointment)
                    .then((res) => {
                    this.status = "thành công";
                    this.showNoti = "Ok";
                    this.isShowPopup = false;
                    setTimeout(() => {
                        this.showNoti = "";
                    }, 1500);
                });
            }
            catch (error) {
                this.isShowPopup = false;
                this.status = "thất bại";
                this.showNoti = "Ok";
                setTimeout(() => {
                    this.showNoti = "";
                }, 1500);
                console.log(error);
            }
        },
        async addApp() {
            try {
                this.showAddApp = false;
                this.appointment.citizen_id = this.id;
                console.log(this.appointment);
                await this.$axios
                    .post(`http://localhost:8080/api/appointment/new`, this.appointment)
                    .then((res) => {
                    this.status = "thành công";
                    this.showNoti = "Ok";
                    this.isShowPopup = false;
                    setTimeout(() => {
                        this.showNoti = "";
                    }, 1500);
                });
            }
            catch (error) {
                this.isShowPopup = false;
                this.status = "thất bại";
                this.showNoti = "Ok";
                setTimeout(() => {
                    this.showNoti = "";
                }, 1500);
                console.log(error);
            }
        },
        closePopup() {
            this.showAddApp = false;
            this.isShowPopup = false;
        },
        openPopupConfirm() {
            this.showAddApp = false;
            this.isShowPopup = true;
        },
        showAddAppf(){
          this.showAddApp = true;
        }
    },
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.title {
  position: absolute !important;
  font-size: 22px;
  margin: 50px 0 60px 0;
  z-index: 2;
  color: #4b4545;
  left: 20px;
  top: 20px;
}
.responsive-table .col-0 {
  flex-basis: 10%;
}

.responsive-table .col-1 {
  flex-basis: 15%;
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
  flex-basis: 20%;
}

.responsive-table .col-7 {
  flex-basis: 10%;
}
.list-appointment {
  margin-top: 60px;
  /* margin-left: 10px; */
  padding: 100px 0 20px 0;
  box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  width: 97%;
}

</style>
