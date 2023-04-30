<template>
  <div class="container">
    <div class="content">
      <!-- <h2>Cập nhật thông tin cá nhân công dân</h2> -->
      <Search
        id="search-form"
        v-model="idSearch"
        @search="handleSearch"
      ></Search>
      <AddAccount
        :list-infor="list"
        :action="'Cập nhật'"
        @openPopup="openPopup"
      >
      </AddAccount>
      <!-- <button @click.prevent="isShowPopup = true" class="submit">Cập nhật</button> -->
    </div>
    <PopupConfirm
      :title="'cập nhật thông tin'"
      @action="submit"
      v-show="isShowPopup"
      @closePopup="closePopup"
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
      list: {},
      idSearch: "",
      isShowPopup: false,
      status: "",
      showNoti: "",
    };
  },
  // middleware: 'nhan',
  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(
            `http://localhost:8080/api/citizen/listCitizen/id=${this.idSearch}`
          )
          .then((res) => {
            this.list = res.data;
            this.list.quarter = res.data.location.quarter;
            this.list.town = res.data.location.town;
            this.list.district = res.data.location.district;
            this.list.city = res.data.location.city;
            this.list.idFamily = res.data.family.id_Family;
          });
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      try {
        this.list.idFamily=this.list.family
        await this.$axios
          .put(`http://localhost:8080/api/citizen/update`, this.list)
          .then((res) => {
            this.status = "thành công";
            this.showNoti = "Ok";
            setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/poli/seeInforCitizen")
            }, 1500);
            this.list = res.data;
            this.isShowPopup = false;
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
    handleSearch(id) {
      this.idSearch = id;
      this.fetchData();
    },
    closePopup() {
      this.isShowPopup = false;
    },
    openPopup() {
      this.isShowPopup = true;
    },
  },
};
</script>
<style src="../../../static/asset/styles.css"></style>
<style scoped>


img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

input {
  padding: 5px;
  width: 200px;
  margin-left: 10px;
  border-radius: 8px;
  border: 0.8px solid black;
}


#search-form {
  /* padding: 80px; */
  position: absolute;
  top: 0px;
  right: 40px;
  width: fit-content;
  z-index: 3;
  margin: 0;
}

.content{
  position: relative;
  top: 65px;
}
</style>
