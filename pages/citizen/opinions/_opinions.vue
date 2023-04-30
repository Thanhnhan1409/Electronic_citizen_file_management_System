<template>
  <div class="container">
    <ButtonAdd
    :title="'Thêm ý kiến'"
    @showAddApp="showAddAppf"
    />
    <ListInfor4Colums
      :isNoti="false"
      :listTmp="listOpinion"
      :title="'ý kiến'"
    />
    <PopupAddReqAndApp
      v-show="showAddOpinion == true"
      :opinion="opinion"
      :obj="'opinion'"
      :title="'Thêm ý kiến'"
      @closePopup="closePopup"
      @action="openPopupConfirm"
    />
    <PopupConfirm
      :title="'thêm ý kiến'"
      @action="postData"
      v-show="isShowPopup"
      @closePopup="closePopup"
    >
    </PopupConfirm>
    <Notification
      :status="status"
      :object="'ý kiến'"
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
      listOpinion: [],
      opinion: {},
      showAddOpinion: false,
      isShowPopup: false,
      showNoti: "",
      id: null
    };
  },
  mounted() {
    this.id = localStorage.getItem('id')
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/opinions/get/citizenId=${this.id}`)
          .then((res) => {
            this.listOpinion = res.data;
            console.log(this.listOpinion);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async postData() {
      try {
        this.opinion.author_id = this.id
        await this.$axios
          .post(`http://localhost:8080/opinions/new`, this.opinion)
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
        console.error(error);
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
    showAddAppf(){
      this.showAddOpinion = true;

    }
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
