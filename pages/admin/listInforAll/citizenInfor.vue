<template>
  <div class="container-inforCitizen">
    <BackToList></BackToList>
    <button @click.prevent="isShowPopup=true" id="admin-delInfo">Xóa tài khoản</button>
    <InforCitizen class="infor-citizen" :list-infor="listInfor"></InforCitizen>
    <Criminalrecord :Criminalrecord="listInfor.Criminalrecord"></Criminalrecord>
    <PopupConfirm
      :title="'xóa tài khoản'"
      @action="deleteCitizen()"
      v-show="isShowPopup"
      @closePopup="closePopup()"
    >
    </PopupConfirm>
    <Notification
      :status="status"
      :object="'tài khoản'"
      :action="'Xóa'"
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
      listInfor: {
        nationality:'Việt Nam'
      },
      id: null,
      isShowPopup: false,
      status: "",
      showNoti: "",
    };
  },
  mounted() {
    this.id = localStorage.getItem("admin_idCitizen");
    this.fetchDataCitizen();
  },
  methods: {
    async fetchDataCitizen() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
          .then((res) => {
            this.listInfor = res["data"];
            console.log(this.listInfor);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCitizen() {
      try {
        this.isShowPopup = false
        await this.$axios.delete(
          `http://localhost:8080/api/citizen/delete/id=${this.id}`
        ).then(() => {
          this.status = "thành công";
          this.showNoti = "Ok";
          setTimeout(() => {
            this.showNoti = "";
            this.$router.push("/admin/listInforAll/_listInforAll");
          }, 1500);
        })
        console.log(this.list)
      } catch (error) {
        this.status = "thất bại";
        this.showNoti = "Ok";
        setTimeout(() => {
          this.showNoti = "";
        }, 1500);
        console.log(error);
      }
    },
    closePopup() {
      this.isShowPopup = false;
    },
  },
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.container-inforCitizen{
  position: relative;
}

ul {
  list-style: none;
}

img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

#admin-delInfo {
  border: none;
  border-radius: 10px;
  padding: 8px 20px;
  background-color: green;
  color: #fff;
  font-weight: 550;
  position: absolute !important;
  right: 90px;
  top: 330px;
  font-size: 18px;
  cursor: pointer;
  z-index: 3;
}

.infor-citizen {
  margin-bottom: 60px;
}
.back-to-list{
  position: relative;
  left: 300px;
  top: 80px;
  /* box-shadow: 3px 3px 10px 3px rgb(217, 217, 217);
  background-color: #fff; */
  width: 100px;
  padding: 5px 10px;
  border-radius: 5px;
}
.back-to-list svg{
  width: 14px;
  height: auto;
}
.back-to-list span {
  color: black;
  text-decoration: none;
}

</style>