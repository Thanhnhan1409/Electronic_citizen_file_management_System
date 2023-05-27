<template>
  <div class="container">
    <Navbar :userName = "name" />

    <ListInfor6Colums
      :listTmp="listRequirement"
      :object="'requirement'"
      :isShowPopupDelete="isShowPopupDelete"
      :title="'các yêu cầu đã gửi'"
      @deleteRequirement="deleteRequirement"
    />
    <ButtonAdd 
    :title="'Thêm yêu cầu'" 
    @showAddApp="showAddReqf" 
    />
    <PopupAddReqAndApp
      v-show="showAddReq"
      :requirement="requirement"
      :obj="'requirement'"
      :title="'Thêm yêu cầu'"
      @closePopup="closePopup"
      @action="openPopupConfirm()"
    />
    <PopupConfirm
      :title="'thêm yêu cầu' "
      @action="addRequirement() "
      v-show="isShowPopup"
      @closePopup="closePopup"
    >
    </PopupConfirm>
    <Notification
      :status="status"
      :object="'yêu cầu'"
      :action="activity === 'delete'? 'Xoá' : 'Thêm'"
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
      requirement: {
        recipient_id:[]
      },
      showAddReq: false,
      isShowPopup: false,
      showNoti: "",
      isShowPopupDelete: false,
      idReq: null,
      activity:'',
      name:''
    };
  },
  mounted() {
    this.id = localStorage.getItem("id");
    this.getListRequirement();
    this.name = localStorage.getItem('name')
  },
  methods: {
    async getListRequirement() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/requirement/citizenId=${this.id}`)
          .then((res) => {
            // console.log(res.data);
            this.listRequirement = res.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    async addRequirement() {
      try {
        this.isShowPopup = false;
        this.requirement.author_id = this.id;
        this.requirement.date =  Date.now();
        this.requirement.recipient_id.splice();
        this.requirement.recipient_id.push(this.requirement.idPoli)
        console.log(this.requirement);
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
        await this.getListRequirement()
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
    async deleteRequirement(id_requirement) {
      try {
        this.isShowPopupDelete = false;
        this.isShowPopup = false;
        await this.$axios
          .delete(`http://localhost:8080/api/requirement/${id_requirement}`)
          .then((res) => {
            this.status = "thành công";
            this.activity ='delete'
            this.showNoti = "Ok";
            this.isShowPopup = false;
            setTimeout(() => {
              this.getListRequirement();
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
      this.showAddReq = false;
      this.isShowPopup = false;
    },
    openPopupConfirm() {
      this.showAddReq = false;
      this.isShowPopup = true;
    },
    showAddReqf() {
      this.showAddReq = true;
    },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
