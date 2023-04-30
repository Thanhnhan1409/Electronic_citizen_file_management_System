<template>
  <div class="container--updatePoli">
    <h2 class="title">{{ action }} thông tin cán bộ</h2>
    <div class="poli--content">
    <button @click.prevent="openPopUp()" class="submit">{{ action }}</button>
      <h2>Thông tin cán bộ:</h2>
      <ul class="poli__content--items">
        <li class="content--item div-center">
          Số CCCD:
          <input 
          type="text"  
          v-model="listPoli.citizen_id"
          v-validate="'required|min:1|max:255'"
            :class="{
              input: true,
              'is-danger': errors.has('Số CCCD'),
            }"
            name="Số CCCD"
          />
          <span v-show="errors.has('Số CCCD')" class="err">{{
            errors.first("Số CCCD")
        }}</span>
        </li>
        <li class="content--item div-center">
          Cấp vụ:
          <multiselect
              class="multiselect-level"
              :options="listLevelManage"
              @input="checkLevel()"
              v-model="listTmp.levelManager"
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
        </li>
        <li class="content--item div-center local">
          <p> Khu vực</p>
          
          <div class="local-detail" >
            <div class="text-left" >
              Quốc gia: Việt Nam
            </div>
            <div class="text-left" v-show="hasCity">
            Tỉnh <small style="color: #c7422e">*</small>:
            <multiselect
              class="multiselect"
              @input="getDistrict()"
              :options="listCity"
              v-model="listTmp.city"
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
          <div v-show="hasDistrict" class="text-left">
            Huyện/Thành phố <small style="color: #c7422e">*</small>:
            <multiselect
              class="multiselect"
              @input="getWard()"
              :options="listDistrict"
              v-model="listTmp.district"
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
          <div v-show="hasTown" class="text-left">
            Xã/Thị trấn <small style="color: #c7422e">*</small>:
            <multiselect
              class="multiselect"
              :options="listWard"
              v-model="listTmp.town"
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
          <div v-show="hasQuarter">
            Khối/Thôn:
            <input 
            type="text" 
            v-model="listTmp.quarter" 
            v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Khối/Thôn'),
              }"
              name="Khối/Thôn"
            />
            <span v-show="errors.has('Khối/Thôn')" class="err">{{
              errors.first("Khối/Thôn")
            }}</span>
          </div>
          </div>
          
        </li>
        
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
export default {
  props: ["listPoli", "action"],
  data(){
    return {
      listLevelManage: [
        'Quốc gia',
        'Tỉnh',
        'Huyện/Thành phố',
        'Xã/Thị trấn',
        'Khối/Thôn'
    ],
    listAreaManage:[],
    hasCity:false,
    hasDistrict: false,
    hasQuarter: false,
    hasTown: false,
    listTmp:{},
    listCity:[],
    listDistrict:[],
    listWard:[]
    }
  },
  mounted(){
    this.getCity();
  },
  methods:{
    async openPopUp(){
        console.log("hehhehheheh");
        const result = await this.$validator.validateAll();
        this.checkLevel();
      this.$emit("openPopup");
    },
    async getCity() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/local/province`)
          .then((res) => {
            this.listCity = res.data;
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
            `http://localhost:8080/api/local/district/province=${encodeURIComponent(this.listTmp.city)}`
          )
          .then((res) => {
            this.listDistrict = res.data;
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
              `http://localhost:8080/api/local/ward/?proCode=${encodeURIComponent(this.listTmp.city)}&disCode=${encodeURIComponent(this.listTmp.district)}`
            )
            .then((res) => {
              this.listWard = res.data;
            });
        } catch (error) {
          console.log(error);
        }
    },
    checkLevel(){
      console.log("a");
      
      if(this.listTmp.levelManager == 'Quốc gia')
        {
          console.log("tinh");
          this.listPoli.areaManage = 'Việt Nam';
          this.listPoli.levelManager = 'country';
          this.hasCity = false;
          this.hasDistrict= false;
          this.hasQuarter = false;
          this.hasTown = false;
        }
      else if(this.listTmp.levelManager == 'Tỉnh')
        {
          console.log("tinh");
          this.listPoli.levelManager = 'city'
          this.listPoli.areaManage = this.listTmp.city;
          this.hasCity = true;
          this.hasDistrict= false;
          this.hasQuarter = false;
          this.hasTown = false;
        }
      else if(this.listTmp.levelManager == 'Huyện/Thành phố')
        {
      console.log("b");

          this.listPoli.areaManage = this.listTmp.District;
          this.listPoli.levelManager = 'district'
          this.hasCity = true;
          this.hasDistrict= true;
          this.hasQuarter = false;
          this.hasTown = false;
        }
        else if(this.listTmp.levelManager == 'Xã/Thị trấn')
        {
          this.listPoli.areaManage = this.listTmp.town;
          this.listPoli.levelManager = 'town'
          this.hasCity = true;
          this.hasDistrict= true;
          this.hasTown = true;
          this.hasQuarter = false;
        }
        else if(this.listTmp.levelManager == 'Khối/Thôn')
        {
      console.log("d");

          this.listPoli.areaManage = this.listTmp.quarter;
          this.listPoli.levelManager = 'quarter'
          this.hasCity = true;
          this.hasDistrict= true;
          this.hasQuarter = true;
          this.hasTown = true;
        }
        else
        {
          this.hasDistrict= false;
          this.hasQuarter = false;
          this.hasTown = false;
        }
    }
  }
};
</script>

<style scoped src="~/static/asset/styles.css"></style>
<style scoped>

.container--updatePoli{
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
.multiselect{
  width: 350px;
  height: 40px;
  padding:10px 0 20px 20px;
}
.local{
  display: block;
    text-align: left
}
.text-left{
  text-align: left;
  padding-top: 10px;
}
.local-detail{
  padding: 20px 0 20px 50px;
}
.local-detail div{
  padding-bottom: 10px;
}
.multiselect-level{
  /* padding-bottom: 10px; */
  margin-bottom: 10px;
}
</style>
