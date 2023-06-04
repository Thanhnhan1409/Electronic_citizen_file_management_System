<template>
  <div class="container-popup">
    <div class="overlay" @click.prevent="closePopUp()"></div>
    <div class="popup-AddAppoint">
      <h3>{{ title }}</h3>
      <div class="content">
        <div class="row">
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
        </div>

        <div class="row">
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

        <div class="row">
          <div class="content--item" v-show="obj !== 'opinion'">
            <p>
              {{
                obj === "poliForwardRequirement"
                  ? "ID CBCC chuyển tiếp:"
                  : "ID CBCC:"
              }}
            </p>
            <multiselect
              v-model="selectedPoliId"
              :options="listPoli"
              placeholder="Chọn cán bộ"
              label="name"
              @input="updateSelectedPoliId"
            ></multiselect>

            <span v-show="errors.has('idPoli')" class="err">{{
              errors.first("idPoli")
            }}</span>
          </div>

          <div
            class="content--item"
            v-show="obj === 'appointment' || obj === 'updateAppointment'"
          >
            <p>Ngày</p>
            <input
              :value="
                obj === 'appointment' || obj === 'updateAppointment'
                  ? appointment.appointmentDate
                  : ''
              "
              @input="
                obj === 'appointment' || obj === 'updateAppointment'
                  ? (appointment.appointmentDate = $event.target.value)
                  : ''
              "
              type="date"
              v-validate="'required'"
              :class="{ input: true, 'is-danger': errors.has('Ngày') }"
              name="Chọn ngày"
              id="input-appointmentDate"
              autocomplete="on"
            />
            <span v-show="errors.has('Ngày')" class="err">{{
              errors.first("Ngày")
            }}</span>
          </div>
        </div>

        <div class="row">
          <div
            class="content--item"
            v-show="obj === 'appointment' || obj === 'updateAppointment'"
          >
            <p>Thời gian bắt đầu:</p>
            <input
              :value="
                obj === 'appointment' || obj === 'updateAppointment'
                  ? appointment.startTime
                  : ''
              "
              @input="
                obj === 'appointment' || obj === 'updateAppointment'
                  ? (appointment.startTime = $event.target.value)
                  : ''
              "
              type="time"
              v-validate="'required'"
              :class="{
                input: true,
                'is-danger': errors.has('Thời gian bắt đầu'),
              }"
              name="Thời gian bắt đầu"
              id="input-startTime"
              autocomplete="on"
            />
            <span v-show="errors.has('Thời gian bắt đầu')" class="err">{{
              errors.first("Thời gian bắt đầu")
            }}</span>
          </div>

          <div
            class="content--item"
            v-show="obj === 'appointment' || obj === 'updateAppointment'"
          >
            <p>Thời gian kết thúc:</p>
            <input
              :value="
                obj === 'appointment' || obj === 'updateAppointment'
                  ? appointment.endTime
                  : ''
              "
              @input="
                obj === 'appointment' || obj === 'updateAppointment'
                  ? (appointment.endTime = $event.target.value)
                  : ''
              "
              type="time"
              v-validate="'required'"
              :class="{
                input: true,
                'is-danger': errors.has('Thời gian kết thúc'),
              }"
              name="Thời gian kết thúc"
              id="input-endTime"
              autocomplete="on"
            />
            <span v-show="errors.has('Thời gian kết thúc')" class="err">{{
              errors.first("Thời gian kết thúc")
            }}</span>
          </div>
        </div>

        <div class="content--item" v-show="obj !== 'poliForwardRequirement'">
          <p>Nội dung</p>
          <textarea
            :value="
              obj === 'appointment' || obj === 'updateAppointment'
                ? appointment.description
                : obj === 'requirement'
                ? requirement.description
                : obj === 'poliForwardRequirement'
                ? ''
                : opinion.description
            "
            @input="
              obj === 'appointment'
                ? (appointment.description = $event.target.value)
                : obj === 'requirement'
                ? (requirement.description = $event.target.value)
                : obj === 'poliForwardRequirement'
                ? ''
                : (opinion.description = $event.target.value)
            "
            v-validate="'required'"
            :class="{ input: true, 'is-danger': errors.has('Nhập nội dung') }"
            name="Nhập nội dung"
            id="input-description"
            autocomplete="on"
          ></textarea>
          <span v-show="errors.has('Nhập nội dung')" class="err">{{
            errors.first("Nhập nội dung")
          }}</span>
        </div>
      </div>

      <div class="icon-close">
        <svg
          @click.prevent="closePopUp()"
          class="popup--icon-close"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
          />
        </svg>
      </div>

      <div class="popup--button">
        <button class="cancel" @click.prevent="closePopUp()">Hủy</button>
        <button class="confirm" @click.prevent="action()">Thêm</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useListCityStore} from '@/store/listCity'
export default {
  props: [
    "appointment",
    "requirement",
    "opinion",
    "obj",
    "title",
    "idPoliForward",
  ],
  data() {
    return {
      idPolicitian: "",
      listPoli: [],
      listCity: [],
      listDistrict: [],
      listWard: [],
      selectedPoliId: "",
      listLevelPoli: ["Cả nước", "Tỉnh", "Huyện/Thành phố", "Xã/Thị trấn"],
      inforSearch: {},
      levelManager: "Cả nước",
      isShowCity: false,
      isShowDistrict: false,
      isShowTown: false,
      isShow: true,
      idPolitician: null,
    };
  },
  mounted() {
    this.getCity();
  },
  methods: {
    closePopUp() {
      this.$emit("closePopup");
    },
    action() {
      this.$emit("action");
    },
    async updateSelectedPoliId(value) {
      if (this.selectedPoliId !== null) {
        this.selectedPoliId = this.selectedPoliId.citizenId;
        try {
          await this.$axios
            .get(
              `http://localhost:8080/api/politician/citizenId=${this.selectedPoliId}`
            )
            .then((res) => {
              this.idPolitician = res.data.politician_id;
              if (this.obj === "poliForwardRequirement") {
                this.idPoliForward.id = this.idPolitician;
              } else if (this.obj === "requirement") {
                this.requirement.idPoli = this.idPolitician;
              } else if (this.obj === "updateAppointment") {
                this.appointment.politician.politician_id = this.idPolitician;
              } else if (this.obj === "appointment") {
                this.appointment.politician_id = this.idPolitician;
              }
            });
            this.selectedPoliId = value;
        } catch (error) {
          console.log(error);
        }
      }
    },
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
          this.listPoli = res.data.map((poli) => poli.citizen);
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
  },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background-color: rgb(239, 238, 238);
  opacity: 0.8;
}
.popup-AddAppoint {
  border: 1px solid black;
  background-color: #fff;
  position: absolute;
  left: 21%;
  top: 8%;
  padding: 40px 60px 20px;
  z-index: 99;
  width: 520px;
  border-radius: 5px;
  border: none;
  box-shadow: 3px 3px 10px 3px rgb(129, 129, 129);
  animation: popup-visible 0.3s ease forwards;
}
@keyframes popup-visible {
  from {
    transform: scale(0.2);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.popup-AddAppoint h3 {
  padding-bottom: 30px;
  text-align: center;
}
.content--item {
  /* display: flex; */
  padding-bottom: 7px;
  /* justify-content: space-between; */
}
.content--item input {
  padding: 4px 8px;
  width: 220px;
  border: 1px solid;
  align-items: center;
  border-radius: 6px;
  border: solid 0.5px #dfe0eb;
  background: #fff;
  font-size: 14px;
  height: 30px;
  margin-top: 10px;
}
.content--item textarea {
  min-width: 505px;
  min-height: 70px;
  padding: 4px 8px;
  padding: 4px 8px;
  width: 220px;
  border: 1px solid;
  align-items: center;
  border-radius: 6px;
  border: solid 0.5px #dfe0eb;
  background: #fff;
  font-size: 14px;
  height: 30px;
  margin-top: 10px;
}
.icon-close {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
  border-radius: 50%;
  transition: all 0.5s ease;
}
.icon-close:hover {
  background-color: #d8d9d8;
}
.popup--icon-close {
  width: 10px;
  height: auto;
  cursor: pointer;
  fill: #818281;
  padding: 2px 0 0 5px;
}
.popup--button button {
  margin-top: 10px;
  padding: 7px 10px;
  cursor: pointer;
  width: 275px;
  border: 0.3px solid black;
  border-radius: 7px;
  transition: all 0.2s ease;
  font-weight: 600;
}
.popup--button {
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
}
.cancel {
  background-color: #fff;
  border: 0.3px solid black;
  color: green;
}
.confirm {
  background-color: green;
  color: #fff;
  border: 1.3px solid #fff;
  margin-left: 5px;
}
.popup--button button:hover {
  opacity: 0.8;
  box-shadow: 2px 2px 10px 2px rgb(212, 213, 212);
}
.multiselect {
  width: 238px;
  height: 40px;
  padding-top: 10px;
  /* margin-left: 20px; */
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 10px;
}
</style>
