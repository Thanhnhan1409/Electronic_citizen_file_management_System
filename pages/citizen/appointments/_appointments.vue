<template>
  <div class="container">
    <div class="container-listInfor">
      <PopupAddReqAndApp
        v-if="showAddApp === true"
        :appointment="appointment"
        :title="'Thêm lịch hẹn'"
        :obj="'appointment'"
        @closePopup="closePopup"
        @action="openPopupConfirm"
      />
      <ButtonAdd :title="'Thêm lịch hẹn'" @showAddApp="showAddAppf" />
      <ListAppointment
      :list-appointment="listApp"
      :listTmp="listTmp"
      @fetchData="fetchListApp"
      :object="'citizen'"
      @update="update(item)"
      />
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
      listTmp:[]
    };
  },
  mounted() {
    this.id = localStorage.getItem("id");
    this.fetchListApp();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.isPopupVisible = true;
      }
    });
  },
  methods: {
    async fetchListApp() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/appointment/citizen_id=${this.id}`)
          .then((res) => {
            this.listTmp.splice(0, this.listTmp.length);
            this.listApp = res["data"];
            this.listTmp = this.listApp.slice();
          });
      } catch (error) {
        console.log(error);
      }
    },
    async addApp() {
      try {
        this.showAddApp = false;
        this.isShowPopup = true;
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
      } catch (error) {
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
    showAddAppf() {
      this.showAddApp = true;
    },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>

