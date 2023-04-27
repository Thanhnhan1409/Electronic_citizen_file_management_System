<template>
  <div class="container">
    <Tableft />
    <Navbar />
    <div class="poli_inf">
      <div class="filter-address">
        <div>
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
        <div>
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
        <div>
          Xã/Thị trấn:
          <multiselect
            class="multiselect"
            :options="listWard"
            v-model="listInfor.town"
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
        :listTmp="listPoli" 
        :object="'requirement'" 
         :title="'cán bộ công chức trên cả nước'"

      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listPoli: [],
      listCity: [],
      listDistrict: [],
      listWard: [],
      listInfor: {},
    };
  },
  mounted() {
    this.fetchData();
    this.getCity();
  },
  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/politician/listPolitician/country`)
          .then((res) => {
            this.listPoli = response.data;
            console.log("items" + this.listPoli);
          });
      } catch (error) {
        console.log(error);
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
      } catch (error) {
        console.log(error);
      }
    },
    handleSearch(id) {
      this.idSearch = id;
      this.isShow = false;
    },
  },
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.poli_inf {
  padding: 50px 20px;
  box-shadow: 3px 3px 10px rgb(206, 203, 203);
  border-radius: 10px;
  background-color: #fff;
}

.poli_inf h2 {
  top: -30px;
  left: 0px;
  margin: 0;
}

.table {
  margin-top: 3%;
}

.responsive-table .col-0 {
  flex-basis: 10%;
}

.responsive-table .col-1 {
  flex-basis: 10%;
}

.responsive-table .col-2 {
  flex-basis: 15%;
}

.responsive-table .col-3 {
  flex-basis: 10%;
}

.responsive-table .col-4 {
  flex-basis: 10%;
}

.responsive-table .col-6 {
  flex-basis: 10%;
}

.responsive-table .col-5 {
  flex-basis: 25%;
}

.table-row:hover {
  color: green;
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
  padding-top: 40px;
}
.multiselect {
  margin-top: 10px;
}
.seeInfor--form {
  position: absolute;
  right: 20px;
  top: 110px;
  margin: 0;
  width: fit-content;
}
</style>
