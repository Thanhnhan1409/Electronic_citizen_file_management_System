<template>
  <div class="container-filter">
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
        <div v-show="isShowLevel.isShowCity">
          Tỉnh
          <multiselect
            class="multiselect"
            @input="getDistrict()"
            :options="listCity"
            v-model="inforSearch.add"
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
        <div v-show="isShowLevel.isShowDistrict">
          Huyện/Thành phố
          <multiselect
            class="multiselect"
            @input="getWard()"
            :options="listDistrict"
            v-model="inforSearch.add"
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
        <div v-show="isShowLevel.isShowTown">
          Xã/Thị trấn:
          <multiselect
            class="multiselect"
            :options="listWard"
            v-model="inforSearch.add"
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
  </div>
</template>

<script>
export default {
  props:["listCity","listDistrict","listWard","inforSearch","levelManager","isShowLevel",],
  data(){
    return {
      listLevelPoli: ["Cả nước", "Tỉnh", "Huyện/Thành phố", "Xã/Thị trấn"],

    }
  },
  methods:{
    async fetchData(){
      this.$emit("ferchData")
    },
    getDistrict(){
      this.$emit("getDistrict")
    },
    getWard(){
      this.$emit("getWard")
    },
  }
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>
.container-filter{
    /* position: relative; */
}

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
  margin-top: 10px;
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
