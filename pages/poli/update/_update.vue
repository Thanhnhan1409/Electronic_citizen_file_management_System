<template>
  <div class="container">
    <Navbar :userName="name" />
    <div class="content">
      <div class="content--item">
        <p>Chọn công dân:</p>
        <multiselect
          class="multiselect"
          v-model="selectedCitizenId"
          :options="listCitizen"
          placeholder="Chọn công dân"
          label="name"
          @input="updateselectedCitizenId()"
        ></multiselect>

        <span v-show="errors.has('idPoli')" class="err">{{
          errors.first("idPoli")
        }}</span>
      </div>

      <AddAccount
        :list-infor="list"
        :action="'Cập nhật'"
        @openPopup="openPopup"
      >
      </AddAccount>
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
import { useListCitizenStore } from "@/store/listCitizen";
export default {
  data() {
    return {
      list: {},
      isShowPopup: false,
      status: "",
      showNoti: "",
      name: "",
      listCitizen: [],
      selectedCitizenId: "",
      idCitizen: "",
    };
  },
  mounted() {
    this.name = localStorage.getItem("name");
    this.getListCitizen();
  },
  // middleware: 'nhan',
  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(
            `http://localhost:8080/api/citizen/listCitizen/id=${this.idCitizen}`
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
        this.list.idFamily = this.list.family;
        await this.$axios
          .put(`http://localhost:8080/api/citizen/update`, this.list)
          .then((res) => {
            this.status = "thành công";
            this.showNoti = "Ok";
            setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/poli/viewInforCitizen");
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
    closePopup() {
      this.isShowPopup = false;
    },
    openPopup() {
      this.isShowPopup = true;
    },
    getListCitizen() {
      const listCitizenStore = useListCitizenStore();
      const storedData = localStorage.getItem("listCitizenData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        listCitizenStore.setListCitizen(parsedData);
      }
      this.listCitizen = listCitizenStore.getListCitizen;
    },
    async updateselectedCitizenId(value) {
      if (this.selectedCitizenId !== null) {
        this.idCitizen = this.selectedCitizenId.citizenId;
        this.selectedCitizenId = value;
        this.fetchData();
      }
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
.err {
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  color: #ff4433;
}
.content--item {
  padding-bottom: 7px;
  position: absolute;
  top: 0px;
  right: 40px;
  width: fit-content;
  z-index: 3;
  margin: 0;
  display: flex;
    align-items: center;
}
.multiselect {
  width: 238px;
  height: 40px;
  margin-left: 10px;
}
.content {
  position: relative;
  top: 65px;
}
</style>
