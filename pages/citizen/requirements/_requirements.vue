<template>
  <div class="container">
    <ListInfor6Colums
      :listTmp="listRequirement"
      :object="'requirement'"
      :isShowPopupDelete="isShowPopupDelete"
    />
    <ButtonAdd :title="'Thêm ý kiến'" @showAddReq="showAddReqf" />
    <PopupAddReqAndApp
      v-show="showAddReq == true"
      :requirement="requirement"
      :obj="'requirement'"
      :title="'Thêm yêu cầu'"
      @closePopup="closePopup"
      @action="openPopupConfirm"
    />
    <PopupConfirm
      :title="'thêm yêu cầu'"
      @action="addRequirement"
      v-show="isShowPopup"
      @closePopup="closePopup"
    >
    </PopupConfirm>
    <Notification
      :status="status"
      :object="'yêu cầu'"
      :action="'Thêm'"
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
      listRequirement: {},
      id: null,
      requirement: {},
      showAddReq: false,
      isShowPopup: false,
      showNoti: "",
      isShowPopupDelete: false,
      idReq: null
    };
  },
  mounted() {
    this.id = localStorage.getItem("id");
    this.getListRequirement();
  },
  methods: {
    async getListRequirement() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/requirement/citizenId=${this.id}`)
          .then((res) => {
            console.log(res.data);
            this.listRequirement = res.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    async addRequirement() {
      try {
        this.requirement.author_id = this.id;
        await this.$axios
          .post(`http://localhost:8080/api/requirement/new`, this.requirement)
          .then((res) => {
            this.listOpinion = res.data;
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
      this.showAddOpinion = false;
      this.isShowPopup = false;
    },
    openPopupConfirm() {
      this.showAddOpinion = false;
      this.isShowPopup = true;
    },
    showAddReqf() {
      this.showAddOpinion = true;
    },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
