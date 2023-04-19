<template>
  <div class="container">
    <div class="overlay-hidden"></div>
    <button @click.prevent="openPopup" class="submit">{{ action }}</button>
    <div class="infor--content">
      <h2>Thông tin cá nhân</h2>
      <ul class="infor__content--items" ref="addComponent">
        <li class="content--item div-center">
          <div class="left">
            Họ và tên <small style="color: #c7422e">*</small>:
            <input
              type="text"
              v-model="listInfor.name"
              value=""
              v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Họ và tên'),
              }"
              name="Họ và tên"
            />
            <span v-show="errors.has('Họ và tên')" class="err">{{
              errors.first("Họ và tên")
            }}</span>
          </div>
          <div>
            Ngày sinh <small style="color: #c7422e">*</small>:
            <input
              type="date"
              v-model="listInfor.birth"
              id=""
              v-validate="'required'"
              :class="{
                input: true,
                'is-danger': errors.has('Ngày sinh'),
              }"
              name="Ngày sinh"
            />
            <span v-show="errors.has('Ngày sinh')" class="err">{{
              errors.first("Ngày sinh")
            }}</span>
          </div>
        </li>
        <li class="content--item div-center">
          <div class="left form--gender">
            Giới tính <small style="color: #c7422e">*</small>:
            <form class="add-account__form--gender">
              <input
                name="gender"
                v-model="listInfor.gender"
                type="radio"
                value="true"
              />Nam
              <input
                name="gender"
                v-model="listInfor.gender"
                type="radio"
                value="false"
              />Nữ
            </form>
          </div>
          <div>
            Dân tộc <small style="color: #c7422e">*</small>:
            <input
              type="text"
              v-model="listInfor.ethnic"
              v-validate="'required'"
              :class="{
                input: true,
                'is-danger': errors.has('Dân tộc'),
              }"
              name="Dân tộc"
            />
            <span v-show="errors.has('Dân tộc')" class="err">{{
              errors.first("Dân tộc")
            }}</span>
            <!-- <span style="color: #c7422e;" v-show="isShowError[4]">Dân tộc không được bỏ trống và không bao gồm số và các kí tự đặt biệt</span> -->
          </div>
        </li>
        <li class="content--item div-center">
          <div class="left">
            Số CCCD <small style="color: #c7422e">*</small>:
            <input type="text" v-model="listInfor.citizen_id" name="Số CCCD" />
          </div>
          <div>
            Số hộ khẩu:
            <input
              type="text"
              v-model="listInfor.idFamily"
              v-validate="'required|min:1|max:10|numeric'"
              :class="{
                input: true,
                'is-danger': errors.has('Số hộ khẩu'),
              }"
              name="Số hộ khẩu"
            />
            <span v-show="errors.has('Số hộ khẩu')" class="err">{{
              errors.first("Số hộ khẩu")
            }}</span>
            <!-- <span style="color: #c7422e;" v-show="isShowError[4]">Sổ hộ khẩu không được bỏ trống và chỉ bao gồm các chữ số </span> -->
          </div>
        </li>
        <li class="content--item div-center">
          <div class="left">
            Quốc tịch:
            <input
              type="text"
              v-model="listInfor.nationality"
              v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Quốc tịch'),
              }"
              name="Quốc tịch"
            />
            <span v-show="errors.has('Quốc tịch')" class="err">{{
              errors.first("Quốc tịch")
            }}</span>
            <!-- <span style="color: #c7422e;" v-show="isShowError[6]">Quốc tịch không được bỏ trống và không bao gồm số và các kí tự đặt biệt</span> -->
          </div>
          <div>
            Tôn giáo:
            <input
              type="text"
              v-model="listInfor.religion"
              v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Tôn giáo'),
              }"
              name="Tôn giáo"
            />
            <span v-show="errors.has('Tôn giáo')" class="err">{{
              errors.first("Tôn giáo")
            }}</span>
            <!-- <span style="color: #c7422e;" v-show="isShowError[7]">Tôn giáo không được bỏ trống và không bao gồm số và các kí tự đặt biệt</span> -->
          </div>
        </li>
        <li class="content--item div-center">
          <div class="left">
            Tỉnh <small style="color: #c7422e">*</small>:
            <input
              type="text"
              v-model="listInfor.city"
              v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Tỉnh'),
              }"
              name="Tỉnh"
            />
            <span v-show="errors.has('Tỉnh')" class="err">{{
              errors.first("Tỉnh")
            }}</span>
            <!-- <span style="color: #c7422e;" v-show="isShowError[9]">Tỉnh không được bỏ trống và không bao gồm số và các kí tự đặt biệt</span> -->
          </div>
          <div>
            Huyện/Thành phố <small style="color: #c7422e">*</small>:
            <input
              type="text"
              v-model="listInfor.district"
              v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Huyện'),
              }"
              name="Huyện"
            />
            <span v-show="errors.has('Huyện')" class="err">{{
              errors.first("Huyện")
            }}</span>
            <!-- <span style="color: #c7422e;" v-show="isShowError[10]">Huyện/Thành phố không được bỏ trống và không bao gồm số và các kí tự đặt biệt</span> -->
          </div>
        </li>
        <li class="content--item div-center">
          <div class="left">
            quarter:
            <input type="text" v-model="listInfor.quarter" />
          </div>
          <div>
            Xã/Thị trấn <small style="color: #c7422e">*</small>:
            <input
              type="text"
              v-model="listInfor.town"
              v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Xã/thị trấn'),
              }"
              name="Xã/thị trấn"
            />
            <span v-show="errors.has('Xã/thị trấn')" class="err">{{
              errors.first("Xã/thị trấn")
            }}</span>
            <!-- <span style="color: #c7422e;" v-show="isShowError[11]">Xã/Thị trấn không được bỏ trống và không bao gồm số và các kí tự đặt biệt</span> -->
          </div>
        </li>
        <li class="content--item div-center">
          <div class="left">
            Địa chỉ <small style="color: #c7422e">*</small>:
            <input
              type="text"
              v-model="listInfor.address"
              v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Địa chỉ'),
              }"
              name="Địa chỉ"
            />
            <span v-show="errors.has('Địa chỉ')" class="err">{{
              errors.first("Địa chỉ")
            }}</span>
            <!-- <span style="color: #c7422e;" v-show="isShowError[14]">Địa chỉ không được bỏ trống</span> -->
          </div>
          <div class="form-military">
            Tham gia NVQS <small style="color: #c7422e">*</small>:
            <form class="form-married--options">
              <input
                type="radio"
                v-model="listInfor.militaryService"
                value="true"
              />
              Đã tham gia
              <input
                type="radio"
                v-model="listInfor.militaryService"
                value="false"
              />
              Chưa tham gia
            </form>
          </div>
        </li>
        <li class="content--item div-center">
          <div>
            Nghề nghiệp <small style="color: #c7422e">*</small>:
            <input
              type="text"
              v-model="listInfor.profession"
              v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Nghề nghiệp'),
              }"
              name="Nghề nghiệp"
            />
            <span v-show="errors.has('Nghề nghiệp')" class="err">{{
              errors.first("Nghề nghiệp")
            }}</span>
            <!-- <span style="color: #c7422e;" v-show="isShowError[11]">Xã/Thị trấn không được bỏ trống và không bao gồm số và các kí tự đặt biệt</span> -->
          </div>
        </li>
        <li class="content--item div-center">
          <div class="left">
            Số điện thoại <small style="color: #c7422e">*</small>:
            <input type="number" 
            v-model="listInfor.phone" 
            v-validate="'required|numeric|length:10'"
              :class="{
                input: true,
                'is-danger': errors.has('Số điện thoại'),
              }"
              name="Số điện thoại"/>
            <!-- <span style="color: #c7422e;" v-show="isShowError[12]">Số điện thoại không được bỏ trống chỉ bao gồm số </span> -->
            <span v-show="errors.has('Số điện thoại')" class="err">{{
              errors.first("Số điện thoại")
            }}</span>
          </div>
          <div>
            Email <small style="color: #c7422e">*</small>:
            <input type="email" 
            v-model="listInfor.email" 
            v-validate="'required|min:1|max:255'"
              :class="{
                input: true,
                'is-danger': errors.has('Email'),
              }"
              name="Email"/>
            <!-- <span style="color: #c7422e;" v-show="isShowError[13]">Email không được bỏ trống chỉ bao gồm số và phải chứa kí tự '@' </span> -->
            <span v-show="errors.has('Email')" class="err">{{
              errors.first("Email")
            }}</span>
          </div>
        </li>
        <li class="content--item div-center">
          <div class="form-married">
            Tình trạng hôn nhân <small style="color: #c7422e">*</small>:
            <form class="form-married--options">
              <input type="radio" v-model="listInfor.married" value="true" /> Đã
              kết hôn
              <input type="radio" v-model="listInfor.married" value="false" />
              Chưa kết hôn
            </form>
          </div>
        </li>
        <li class="content--item div-center">
          <div>
            Link ảnh <small style="color: #c7422e">*</small>:
            <input type="text" v-model="listInfor.imgUrl" />
          </div>
        </li>
      </ul>
    </div>
    <div class="content">
      <h2 class="title">Tiền án, tiền sự</h2>
      <textarea
        v-model="listInfor.criminalRecord"
        name=""
        id=""
        cols="30"
        rows="10"
      >
      </textarea>
    </div>
  </div>
</template>
<script>
export default {
  props: ["listInfor","action"],
  methods: {
    async openPopup() {
      const result = await this.$validator.validateAll();
      this.$emit("openPopup");
    },
  },
};
</script>
<style scoped>
ul li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.container {
  margin-left: 280px;
  margin-top: 140px;
}

.overlay-hidden {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgb(239, 238, 238);
}

.div-center {
  display: flex;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
}

.add-account__form--gender {
  margin-left: 20px;
  display: flex;
}

.add-account__form--gender input {
  margin-right: 10px;
}

.form--gender {
  display: flex;
}

.infor--content {
  margin: 0 30px;
  padding: 30px;
  background-color: #fff;
  border-radius: 13px;
  box-shadow: 3px 2px 10px rgb(217, 213, 213);
}

.infor--content h2 {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  margin: 0;
  color: #4b4545;
}

.infor__content--items {
  padding: 30px 40px;
}

.content--item {
  padding: 10px 5px;
  border-bottom: 1.2px solid #cdcdcd;
  transform: matrix(1, 0, 0, 1, 0, 0);
}

.content--item div {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #4b4545;
}

.left {
  width: 50%;
  text-align: initial;
}

input {
  border: none;
  border-bottom: 1px solid black;
  padding: 2px 10px;
  margin-left: 10px;
}
.form-married {
  display: flex;
  text-align: start;
}
.form-married--options {
  margin-left: 10px;
  display: flex;
}
.form-married--options input {
  margin-right: 10px;
}
.form-military {
  display: flex;
  text-align: start;
}
.title {
  margin: 20px 0;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: #4b4545;
}
.content {
  margin: 0 30px;
  padding: 30px;
  background-color: #fff;
  border-radius: 13px;
  margin: 70px 30px;
  box-shadow: 3px 2px 10px rgb(217, 213, 213);
}
.content textarea {
  border: none;
  box-shadow: 2px 2px 8px rgb(230, 230, 230);
  width: 100%;
  min-height: 40px;
}
.err {
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  color: #ff4433;
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
  right: 80px;
  cursor: pointer;
  top: 30px;
  z-index: 2;
  transition: all 0.2s ease;
}
.submit:hover {
  background-color: rgb(40, 136, 40);
  box-shadow: 3px 3px 10px 3px rgb(209, 208, 208);
}
</style>
