<template>
  <div class="container">
    <BackToList />
    <div class="filter-address">
      <div class="content--item">
        <multiselect
          class="multiselect"
          :options="listLevelPoli"
          v-model="levelManager"
          @input="fetchData"
          placeholder="Chọn cấp vụ"
          v-validate="'required'"
          :class="{
            input: true,
            'is-danger': errors.has('Cấp vụ'),
          }"
          name="Cấp vụ"
        ></multiselect>
        <span v-show="errors.has('Cấp vụ')" class="err">{{
          errors.first("Cấp vụ")
        }}</span>
      </div>

      <div class="content--item" v-show="isShowCity">
        <multiselect
          class="multiselect"
          @input="getDistrict()"
          :options="listCity"
          v-model="listInfor.city"
          placeholder="Chọn tỉnh"
          v-validate="'required'"
          :class="{
            input: true,
            'is-danger': errors.has('Tỉnh'),
          }"
          name="Tỉnh"
        ></multiselect>
        <span v-show="errors.has('Tỉnh')" class="err">{{
          errors.first("Tỉnh")
        }}</span>
      </div>

      <div class="content--item" v-show="isShowDistrict">
        <multiselect
          class="multiselect"
          @input="getWard()"
          :options="listDistrict"
          v-model="listInfor.district"
          placeholder="Chọn huyện/Thành phố"
          v-validate="'required'"
          :class="{
            input: true,
            'is-danger': errors.has('Huyện'),
          }"
          name="Huyện"
        ></multiselect>
        <span v-show="errors.has('Huyện')" class="err">{{
          errors.first("Huyện")
        }}</span>
      </div>

      <div class="content--item" v-show="isShowTown">
        <multiselect
          class="multiselect"
          :options="listWard"
          v-model="listInfor.ward"
          placeholder="Chọn Xã/Thị trấn"
          v-validate="'required'"
          :class="{
            input: true,
            'is-danger': errors.has('Xã/Thị trấn'),
          }"
          name="Xã/Thị trấn"
        ></multiselect>
        <span v-show="errors.has('Xã/thị trấn')" class="err">{{
          errors.first("Xã/thị trấn")
        }}</span>
      </div>

      <div class="content--item">
        <multiselect
          class="multiselect"
          v-model="selectedCitizenId"
          :options="listCitizen"
          placeholder="Chọn công dân"
          label="name"
          @input="updateselectedCitizenId"
        ></multiselect>

        <span v-show="errors.has('idPoli')" class="err">{{
          errors.first("idPoli")
        }}</span>
      </div>
    </div>

    <div class="content">
      <nuxt-link to="/admin/update/updateInforPoli">
        <div class="update--role">
          Cập nhật quyền quản lý
          <svg
            class="update__role--svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L370.7 256 233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L178.7 256 41.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
            />
          </svg>
        </div>
      </nuxt-link>

      <AddAccount
        :listInfor="list"
        :action="'Cập nhật'"
        @openPopup="openPopup()"
      />
      <PopupConfirm
        :title="'cập nhật tài khoản'"
        @action="submit()"
        v-show="isShowPopup"
        @closePopup="closePopup()"
      />
      <Notification
        :status="status"
        :object="'tài khoản'"
        :action="'Cập nhật'"
        :isShowNoti="showNoti"
        v-if="showNoti == 'Ok'"
      />
    </div>
  </div>
</template>

<script>
import { useListCityStore } from "@/store/listCity";

export default {
  data() {
    return {
      list: {
        nationality: "Việt Nam",
      },
      idSearch: "",
      isShowPopup: false,
      status: "",
      showNoti: "",
      levelManager: "Cả nước",
      isShowCity: false,
      isShowDistrict: false,
      isShowTown: false,
      isShow: true,
      listLevelPoli: ["Cả nước", "Tỉnh/Thành phố", "Quận/Huyện", "Xã/Phường"],
      listInfor: {},
      listCity: [],
      listDistrict: [],
      listWard: [],
      levelManager: "Cả nước",
      inforSearch: {},
      selectedCitizenId: "",
      idCitizen: "",
      listCitizen: [],
    };
  },
  mounted() {
    this.fetchData();
    this.getCity();
  },
  middleware: "auth",
  methods: {
    async fetchDataSingle() {
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
            this.list.idFamily = res.data.family;
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchData() {
      try {
        this.checkLevel();
        const fUrl = "http://localhost:8080/api/citizen/listCitizen/";
        let url = `http://localhost:8080/api/citizen/listCitizen/country`;
        if (this.levelManager === "Cả nước") {
          await this.$axios.get(url).then((res) => {
            this.listCitizen = res.data;
          });
        } else {
          if (this.levelManager === "Tỉnh") {
            url = `${fUrl}city=${encodeURIComponent(this.inforSearch.add)}`;
          } else if (this.levelManager === "Huyện/Thành phố") {
            url = `${fUrl}district=${encodeURIComponent(this.inforSearch.add)}`;
          } else if (this.levelManager === "Xã/Thị trấn") {
            url = `${fUrl}town=${encodeURIComponent(this.inforSearch.add)}`;
          }
          if (this.inforSearch.add !== "") {
            await this.$axios.get(url).then((res) => {
              this.listCitizen = res.data;
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      try {
        console.log("idFamily" + this.list.idFamily);
        this.isShowPopup = false;
        console.log("list in" + this.list);
        await this.$axios
          .put(`http://localhost:8080/api/citizen/update`, this.list)
          .then((res) => {
            this.list = res.data;
            console.log("after test" + this.list);

            this.status = "thành công";
            this.showNoti = "Ok";
            setTimeout(() => {
              this.showNoti = "";
              this.$router.push("/admin/listInforAll/_listInforAll");
            }, 1500);
          });
        console.log("test" + this.list);
      } catch (error) {
        console.log("test err" + this.list);
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
    async getCity() {
      const listCityStore = useListCityStore();
      const storedData = localStorage.getItem("listCity");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        listCityStore.setListCity(parsedData);
      }
      this.listCity = listCityStore.getListCity;
      console.log(this.listCity);
    },
    async getDistrict() {
      try {
        console.log("district");
        await this.$axios
          .get(
            `http://localhost:8080/api/local/district/province=${encodeURIComponent(
              this.listInfor.city
            )}`
          )
          .then((res) => {
            this.listDistrict = res.data;
            this.getWard();
          });
        this.fetchData();
      } catch (error) {
        console.log(error);
      }
    },
    async getWard() {
      try {
        console.log("ward");
        await this.$axios
          .get(
            `http://localhost:8080/api/local/ward/?proCode=${encodeURIComponent(
              this.listInfor.city
            )}&disCode=${encodeURIComponent(this.listInfor.district)}`
          )
          .then((res) => {
            this.listWard = res.data;
          });
        this.fetchData();
      } catch (error) {
        console.log(error);
      }
    },
    async checkLevel() {
      if (this.levelManager === "Tỉnh/Thành phố") {
        this.inforSearch.level = "city";
        this.inforSearch.add = this.inforSearch.city;
        this.isShowCity = true;
        this.isShowDistrict = false;
        this.isShowTown = false;
      } else if (this.levelManager === "Quận/Huyện") {
        this.inforSearch.level = "district";
        this.inforSearch.add = this.inforSearch.district;
        this.isShowCity = true;
        this.isShowDistrict = true;
        this.isShowTown = false;
      } else if (this.levelManager === "Xã/Phường") {
        this.inforSearch.level = "ward";
        this.inforSearch.add = this.inforSearch.town;
        this.isShowCity = true;
        this.isShowDistrict = true;
        this.isShowTown = true;
      } else {
        this.isShowCity = false;
        this.isShowDistrict = false;
        this.isShowTown = false;
      }
    },
    async updateselectedCitizenId(value) {
      if (this.selectedCitizenId !== null) {
        this.idCitizen = this.selectedCitizenId.citizenId;
        this.selectedCitizenId = value;
        this.fetchDataSingle();
      }
    },
  },
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
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

@keyframes icon-nextPage {
  from {
    transform: translateX(0px);
  }

  to {
    transform: translateX(10px);
  }
}
.update--role {
  background-color: #ffffff;
  box-shadow: 3px 3px 10px rgb(202, 200, 200);
  position: absolute;
  color: black;
  font-weight: 600;
  top: 30px;
  right: 40px;
  z-index: 4;
  padding: 7px 15px;
  border-radius: 5px;
  display: flex;
  transition: all 0.3s linear;
}
.update__role--svg {
  width: 15px;
  height: auto;
  fill: green;
  margin-left: 10px;
  transition: all 0.3s linear;
}
.update--role:hover {
  transform: scale(1.05);
}
.update--role:hover .update__role--svg {
  transform: translateX(10px);
}
.content {
  margin-top: 140px;
}
.filter-address {
  display: flex;
  gap: 2%;
  position: absolute;
  top: -20px;
  padding-top: 40px;
  z-index: 3;
  width: 80%;
  left: 90px;
}
.multiselect {
  margin-top: 10px;
}
.content--item {
  padding-bottom: 7px;
  position: relative;
  top: 0px;
  right: 40px;
  width: fit-content;
  z-index: 3;
  margin: 0;
}
</style>
