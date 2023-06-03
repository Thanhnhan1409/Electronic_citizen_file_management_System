<template>
  <div class="container">
    <Navbar :userName = "name" />
    <div class="poli_inf">
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
            v-model="inforSearch.city"
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
            v-model="inforSearch.district"
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
            v-model="inforSearch.town"
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
      <Search
        v-model="idSearch"
        @search="handleSearch"
        class="seeInfor--form"
      />
      <ListInfor6Colums
        :listTmp="isShow === true ? listPoli : listTmp1"
        :object="'poli'"
        :title="'cán bộ công chức trên cả nước'"
        @pushToDetailInfor="pushToDetailInfor"
      />
    </div>
  </div>
</template>

<script>
import { useListCityStore } from "@/store/listCity";

export default {
  data() {
    return {
      listPoli: [],
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
      name:''
    };
  },
  computed: {
    listTmp1() {
      return this.listPoli.filter(
        (item) => item.citizen.citizenId.toString() == this.idSearch || 
        item.citizen.name.toString().toLowerCase().includes(this.idSearch.toLowerCase()) ||
        item.areaManage.toString().toLowerCase().includes(this.idSearch.toLowerCase())
      );
    },
  },
  mounted() {
    this.getCity();
    this.name = localStorage.getItem('name')
  },
  methods: {
    async fetchData() {
      try {
        this.checkLevel();
        this.isShow = true;
        let url = `http://localhost:8080/api/politician/listPolitician/country`;
        if (this.levelManager !== "Cả nước") {
          
          url = `http://localhost:8080/api/politician/listPolitician/?levelManageEncode=${
            this.inforSearch.level
          }&areaManageEncode=${encodeURIComponent(this.inforSearch.add)}`;
        }
        await this.$axios.get(url).then((res) => {
          this.listPoli = res.data;
          this.listPoli.forEach((politician) => {
            politician.levelManagerVN = this.checkLevelManager(politician);
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getCity() {
      const listCityStore = useListCityStore();
      
      // Khôi phục dữ liệu từ localStorage
      const storedData = localStorage.getItem('listCity');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        listCityStore.setListCity(parsedData);
      }
      this.listCity = listCityStore.getListCity
    },
    async getDistrict() {
      try {
        console.log("district");
        await this.$axios
          .get(
            `http://localhost:8080/api/local/district/province=${encodeURIComponent(
              this.inforSearch.city
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
              this.inforSearch.city
            )}&disCode=${encodeURIComponent(this.inforSearch.district)}`
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
        this.inforSearch.add = this.inforSearch.city;
        this.isShowCity = true;
        this.isShowDistrict = false;
        this.isShowTown = false;
      } else if (this.levelManager === "Huyện/Thành phố") {
        this.inforSearch.level = "district";
        this.inforSearch.add = this.inforSearch.district;
        this.isShowCity = true;
        this.isShowDistrict = true;
        this.isShowTown = false;
      } else if (this.levelManager === "Xã/Thị trấn") {
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
    checkLevelManager(item) {
      switch (item.levelManager) {
        case "city": {
          return "Tỉnh";
        }
        case "district": {
          return "Huyện/Thành phố";
        }
        case "ward": {
          return "Thị trấn/Xã";
        }
        case "quarter": {
          return "Khối/Làng";
        }
        default:
          break;
      }
    },
    handleSearch(id) {
      this.idSearch = id;
      this.isShow = false;
    },
    pushToDetailInfor(id) {
      localStorage.setItem("idPolicitian", id);
      this.$router.push("/citizen/listInforPoli/inforPoli");
    },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.list-appointment[data-v-05331f66] {
  padding-top: 100px;
}
.err {
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  color: #ff4433;
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
  width: 238px;
  height: 40px;
  padding-top: 10px;
  /* margin-left: 20px; */
}
.seeInfor--form {
  position: absolute;
  right: 30px;
  top: 40px;
  margin: 0;
  width: fit-content;
  z-index: 3;
}
</style>
