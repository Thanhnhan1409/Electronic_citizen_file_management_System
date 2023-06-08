<template>
  <div class="container--updatePoli">
    <h2 class="title">{{ action }} thông tin cán bộ</h2>

    <div class="poli--content">
      <button @click.prevent="openPopUp()" class="submit">{{ action }}</button>
      <h2>Thông tin cán bộ:</h2>
      <ul class="poli__content--items">
        <div class="filter-address">
          <div class="row content--item">
            <div class="left">
              <p>Cấp vụ:</p>
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

            <div>
              <p v-show="action !== 'Cập nhật'">Công dân:</p>
              <multiselect
                class="multiselect"
                v-model="selectedCitizenId"
                :options="listCitizen"
                placeholder="Chọn công dân"
                label="name"
                @input="updateselectedCitizenId()"
                v-if="action !== 'Cập nhật'"
              ></multiselect>
              <div class="row">
                <p class="margin-right" v-show="action === 'Cập nhật'">
                  ID CBCC:
                </p>
                <p>{{ listPoli.politicianId }}</p>
                <span v-show="errors.has('idPoli')" class="err">{{
                  errors.first("idPoli")
                }}</span>
              </div>
            </div>
          </div>

          <div class="row content--item" v-show="start">
            <div class="left row">
              <p class="margin-right" v-show="action === 'Cập nhật'">Cấp vụ:</p>
              <p>{{ listPoli.levelManagerVN }}</p>
              <span v-show="errors.has('idPoli')" class="err">{{
                errors.first("idPoli")
              }}</span>
            </div>

            <div class="row">
              <p class="margin-right" style="margin-left: 170px ;" v-show="action === 'Cập nhật'">Khu vực:</p>
              <p>{{ listPoli.areaManage }}</p>
              <span v-show="errors.has('idPoli')" class="err">{{
                errors.first("idPoli")
              }}</span>
            </div>
          </div>

          <div class="row content--item">
            <div class="left" v-show="isShowCity">
              <p>Tỉnh/Thành phố:</p>
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
              <p>Quận/Huyện:</p>
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
          </div>

          <div class="content--item" v-show="isShowTown">
            <p>Xã/phường:</p>
            <multiselect
              class="multiselect"
              :options="listWard"
              v-model="listInfor.areaManage"
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

        <li class="content--item div-center">
          Chức danh:
          <input
            type="text"
            v-model="listPoli.position"
            v-validate="'required|min:1|max:255'"
            :class="{
              input: true,
              'is-danger': errors.has('Chức danh'),
            }"
            name="Chức danh"
          />
          <!-- <span style="color: #c7422e;" v-show="isShowError[13]">Email không được bỏ trống chỉ bao gồm số và phải chứa kí tự '@' </span> -->
          <span v-show="errors.has('Chức danh')" class="err">{{
            errors.first("Chức danh")
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { useListCityStore } from "@/store/listCity";

export default {
  props: ["listPoli", "action"],
  data() {
    return {
      levelManager: "Cả nước",
      isShowCity: false,
      isShowDistrict: false,
      isShowTown: false,
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
      start: true,
    };
  },
  mounted() {
    this.getCity();
  },
  methods: {
    async fetchData() {
      try {
        this.checkLevel();
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/country`)
          .then((res) => {
            this.listCitizen = res.data;
          });
      } catch (error) {
        console.log("test fectdata");
        console.log(error);
      }
    },
    async openPopUp() {
      console.log("hehhehheheh");
      const result = await this.$validator.validateAll();
      this.checkLevel();
      this.$emit("openPopup");
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
      this.start = false
      if (this.levelManager === "Tỉnh/Thành phố") {
        this.listPoli.levelManager = this.inforSearch.level = "city";
        this.inforSearch.add = this.inforSearch.city;
        this.listPoli.areaManage = this.listInfor.city;
        this.isShowCity = true;
        this.isShowDistrict = false;
        this.isShowTown = false;
      } else if (this.levelManager === "Quận/Huyện") {
        this.listPoli.levelManager = this.inforSearch.level = "district";
        this.inforSearch.add = this.inforSearch.district;
        this.listPoli.areaManage = this.listInfor.district;
        this.isShowCity = true;
        this.isShowDistrict = true;
        this.isShowTown = false;
      } else if (this.levelManager === "Xã/Phường") {
        this.inforSearch.level = "ward";
        this.listPoli.levelManager = "town";
        this.inforSearch.add = this.inforSearch.town;
        this.listPoli.areaManage = this.listInfor.ward;
        this.isShowCity = true;
        this.isShowDistrict = true;
        this.isShowTown = true;
      } else {
        this.listPoli.areaManage = "Việt Nam";
        this.listPoli.levelManager = "country";
        this.isShowCity = false;
        this.isShowDistrict = false;
        this.isShowTown = false;
      }
    },
    updateselectedCitizenId(value) {
      if (this.selectedCitizenId !== null) {
        this.listPoli.citizen_id = this.selectedCitizenId.citizenId;
        this.selectedCitizenId = value;
      }
    },
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.container--updatePoli {
  margin-top: 10px;
}
.poli--content {
  margin: 10px 30px 100px;
  padding: 30px;
  background-color: #fff;
  border-radius: 13px;
  box-shadow: 3px 2px 10px rgb(217, 213, 213);
}
.poli--content h2 {
  margin: 20px 0;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;

  color: #4b4545;
}
.poli__content--items {
  padding: 0px 40px 30px 40px;
}
.content--item {
  padding: 10px 5px;
  border-bottom: 1.2px solid #cdcdcd;
}
.content--item input {
  line-height: 21px;
  border: none;
  border-bottom: 1px solid #4b4545;
  margin-left: 10px;
  width: 300px;
  padding: 4px 10px;
}
.submit {
  padding: 8px 20px;
  background-color: green;
  color: #fff;
  font-weight: 550;
  border: none;
  border-radius: 10px;
  margin-bottom: 40px;
  position: absolute;
  right: 60px;
  cursor: pointer;
  top: 120px;
  z-index: 2;
  transition: all 0.2s ease;
}
.submit:hover {
  background-color: rgb(40, 136, 40);
  box-shadow: 3px 3px 10px 3px rgb(209, 208, 208);
}
.err {
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  color: #ff4433;
  margin-left: 10px;
}
.multiselect {
  width: 350px;
  height: 40px;
  padding: 10px 0 20px 20px;
}
.local {
  display: block;
  text-align: left;
}
.row {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
}
.left {
  width: 50%;
}
.margin-right{
  margin-right: 10px;
}
</style>
