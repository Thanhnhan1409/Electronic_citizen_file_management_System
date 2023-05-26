<template>
  <div class="container">
    <Search class="search-form" v-model="idSearch" @search="handleSearch" />
    <div class="content">
      <div class="filter-address">
        <div class="poli-level">
          Cấp vụ
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
        <div v-show="isShowCity">
          Tỉnh
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
        <div v-show="isShowDistrict">
          Huyện/Thành phố
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
        <div v-show="isShowTown">
          Xã/Thị trấn:
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
      </div>
      <button @click="isShow = true" class="button-show">
        Hiển thị toàn bộ
      </button>
      <ListInfor6Colums
        :listTmp="isShow === true ? listPolitician : listTmp1"
        :object="'poli'"
        :title="'cán bộ'"
        @pushToDetailInfor="handleClick1"
      />

      <ListInfor6Colums
        :listTmp="isShow === true ? listCitizen : listTmp2"
        :object="'poliListCitizen'"
        :title="'công dân'"
        @pushToDetailInfor="handleClick2"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listCitizen: [],
      listPolitician: [],
      level: "",
      nameArea: "",
      id: "",
      idCitizen: null,
      listCity: [],
      listDistrict: [],
      listWard: [],
      listInfor: {},
      idSearch: "",
      listLevelPoli: ["Cả nước", "Tỉnh", "Huyện/Thành phố", "Xã/Thị trấn"],
      inforSearch: {},
      levelManager: "Cả nước",
      isShowCity: false,
      isShowDistrict: false,
      isShowTown: false,
      isShow: true,
    };
  },
  computed: {
    listTmp1() {
      return this.listPolitician.filter(
        (item) => {
          item.citizen.citizenId.toString() == this.idSearch
          item.citizen.name.toString() == this.idSearch
          item.citizen.address.toString() == this.idSearch
          item.citizen.location.city.toString() == this.idSearch ||
          item.citizen.location.district.toString() == this.idSearch ||
          item.citizen.location.town.toString() == this.idSearch ||
          item.citizen.location.quarter.toString() == this.idSearch 
        }
      );
    },
    listTmp2() {
      return this.listCitizen.filter(
        (item) => item.citizen_id.toString() == this.idSearch
      );
    },
  },
  mounted() {
    this.id = localStorage.getItem("id");
    this.level = localStorage.getItem("level");
    this.nameArea = localStorage.getItem("nameArea");
    this.fetchData();
    this.getCity();
  },
  methods: {
    handleSearch(id) {
      this.idSearch = id;
      this.isShow = false;

    },
    async fetchData() {
      try {
        this.checkLevel();
        const fUrl = "http://localhost:8080/api/citizen/listCitizen/";
        let url = `http://localhost:8080/api/citizen/listCitizen/country`;
        if (this.levelManager === "Cả nước") {
          await this.$axios.get(url).then((res) => {
            this.listCitizen = res.data;

            console.log("lisst citizen" + this.listCitizen);
          });
        } else {
          if (this.levelManager === "Tỉnh"){
          url = `${fUrl}city=${encodeURIComponent(this.inforSearch.add)}`;

          }
          else if (this.levelManager === "Huyện/Thành phố"){
          url = `${fUrl}district=${encodeURIComponent(this.inforSearch.add)}`;

          }
          else if (this.levelManager === "Xã/Thị trấn"){
          url = `${fUrl}town=${encodeURIComponent(this.inforSearch.add)}`;

          }
          if (this.inforSearch.add !== '') {
            await this.$axios.get(url).then((res) => {
              this.listCitizen = res.data;

              console.log("lisst citizen" + this.listCitizen);
            });
          }
        }

        await this.fetchDataPoli();
      } catch (error) {
        console.log("test fectdata");
        console.log(error);
      }
    },
    async fetchDataPoli() {
      try {
        let url = `http://localhost:8080/api/politician/listPolitician/country`;
        if (this.levelManager === "Cả nước") {
          await this.$axios.get(url).then((res) => {
            this.listPolitician = res.data;
            this.listPolitician.forEach((politician) => {
              politician.levelManagerVN = this.checkLevelManager(politician);
            });
          });
        } else {
          url = `http://localhost:8080/api/politician/listPolitician/?levelManageEncode=${
            this.inforSearch.level
          }&areaManageEncode=${encodeURIComponent(this.inforSearch.add)}`;
          if (this.inforSearch.add !== '') {
            await this.$axios.get(url).then((res) => {
              this.listPolitician = res.data;
              this.listPolitician.forEach((politician) => {
                politician.levelManagerVN = this.checkLevelManager(politician);
              });
            });
          }
        }
      } catch (error) {
        console.log("test fetchdataPoli");
        console.log(error);
      }
    },
    handleClick1(citizenId) {
      localStorage.setItem("admin_idCitizen", citizenId);
      this.$router.push("/admin/listInforAll/poliInfor");
    },
    handleClick2(citizenId) {
      localStorage.setItem("admin_idCitizen", citizenId);
      this.$router.push("/admin/listInforAll/citizenInfor");
    },
    checkLevelManager(item) {
      if (item.levelManager === "city") {
        return "Tỉnh";
      }
      if (item.levelManager === "district") {
        return "Huyện/Thành phố";
      }
      if (item.levelManager === "ward") {
        return "Thị trấn/Xã";
      }
      if (item.levelManager === "quarter") {
        return "Khối/Làng";
      }
    },
    async getCity() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/local/province`)
          .then((res) => {
            this.listCity = res.data;
            this.getDistrict();
          });

        // await this.filterPoli();
        await this.fetchData();
      } catch (error) {
        console.log(error);
      }
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
      if (this.levelManager === "Tỉnh") {
        this.inforSearch.level = "city";
        this.inforSearch.add = this.listInfor.city
        this.isShowCity = true;
        this.isShowDistrict = false;
        this.isShowTown = false;
      } else if (this.levelManager === "Huyện/Thành phố") {
        this.inforSearch.level = "district";
        this.inforSearch.add = this.listInfor.district 
        this.isShowCity = true;
        this.isShowDistrict = true;
        this.isShowTown = false;
      } else if (this.levelManager === "Xã/Thị trấn") {
        this.inforSearch.level = "ward";
        this.inforSearch.add = this.listInfor.ward
        this.isShowCity = true;
        this.isShowDistrict = true;
        this.isShowTown = true;
      } else {
        this.isShowCity = false;
        this.isShowDistrict = false;
        this.isShowTown = false;
      }
    },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.content {
  position: relative;
  width: 100%;
}
.search-form {
  position: absolute;
  top: 55px;
  right: 20px;
  z-index: 3;
  margin: 0;
  width: fit-content;
}
.button-show {
  position: absolute;
  border-radius: 10px;
  padding: 7px 10px;
  border: none;
  color: #fff;
  background-color: green;
  cursor: pointer;
  z-index: 7;
  transition: all 0.2s linear;
  width: 120px;
  top: 130px;
  left: 89%;
}
.button-show:hover {
  transform: scale(1.02);
}
.filter-address {
  display: flex;
  gap: 2%;
  position: absolute;
  top: 50px;
  padding-top: 40px;
  z-index: 3;
  width: 80%;
  left: 30px;
}
.multiselect {
  margin-top: 10px;
}
</style>
