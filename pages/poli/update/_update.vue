<template>
  <div class="container">
    <div id="overlay" class="display-hide"></div>
    <div class="content">
      <h2>Cập nhật thông tin cá nhân công dân</h2>
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
        await this.$axios
          .put(`http://localhost:8080/api/citizen/update`, this.list)
          .then((res) => {
            this.status = "thành công";
            this.showNoti = "Ok";
            setTimeout(() => {
              this.showNoti = "";
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
.container {
  position: relative;
}
.container h2 {
  position: relative;
  top: 70px;
  left: 330px;
  width: fit-content;
}

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

.submit {
  padding: 7px 10px;
  background-color: green;
  color: #fff;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  margin-bottom: 40px;
  position: absolute;
  right: 80px;
  cursor: pointer;
  top: 190px;
  transition: all 0.2s ease;
}
.submit:hover {
  /* transform: scale(1.03); */
  /* box-shadow: 3px 3px 10px 3px rgba(188, 173, 133, 0.25); */
  background-color: rgb(40, 136, 40);
  box-shadow: 3px 3px 10px 3px rgb(209, 208, 208);
}

#search-form {
  /* padding: 80px; */
  position: absolute;
  top: 120px;
  right: 40px;
  width: fit-content;
  z-index: 3;
  margin: 0;
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -100%;
  opacity: 0.6;
  background-color: rgb(139, 142, 144);
  animation: overlay 0.5s ease forwards;
  z-index: 10;
}
.display-hide {
  display: none !important;
}
</style>
