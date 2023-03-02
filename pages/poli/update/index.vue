<template>
  <div class="container">
    <div class="content">
      <h2>Cập nhật thông tin cá nhân công dân</h2>
      <form @submit.prevent="fetchData" class="search">
        <input v-model="idSearch" class="input-search" type="text" placeholder="Nhập số CCCD"/>
        <svg class="glass-find" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        <button  @click.prevent="fetchData"  class="button-search"> Tìm kiếm </button>
      </form>
      <button class="submit">Cập nhật</button>
      <div>
        <div>
          <div class="infor">
            <img src="" />
            <div class="infor-content">
              <ul class="list-infor">
                <li>
                  Họ và tên:
                  <input type="text" v-model="list.name" class="name" />
                </li>
                <li>
                  Số CCCD:
                  <input type="number" v-model="list.citizenId" class="cccd" />
                </li>
                <li class="gender-form">
                  <p>Giới tính:</p>
                  <form class="gender">
                    <input
                      name="gender"
                      v-model="list.gender"
                      type="radio"
                      value="true"
                    />Nam
                    <input
                      name="gender"
                      v-model="list.gender"
                      type="radio"
                      value="false"
                    />Nữ
                  </form>
                </li>
                <li>
                  Quốc tịch:
                  <input value="viet Nam"
                    class="nationality"
                    v-model="list.nationality"
                    type="text"
                  />
                </li>
                <li>
                  Nghề nghiệp:
                  <input
                    class="profession"
                    v-model="list.profession"
                    type="text"
                  />
                </li>
                <li>
                  Số điện thoại:
                  <input class="phone" v-model="list.phone" type="number" />
                </li>
                <li>
                  Ngày sinh:
                  <input
                    type="datetime"
                    v-model="list.birth"
                    class="birthday"
                    name=""
                    id=""
                  />
                </li>
                <li>
                  Dân tộc:
                  <input
                    type="text"
                    v-model="list.ethnic"
                    class="ethinic"
                    name=""
                    id=""
                  />
                </li>
                <li>
                  Số hộ khẩu:
                  <input
                    type="number"
                    v-model="list.idFamily"
                    class="idFamily"
                    name=""
                    id=""
                  />
                </li>
              </ul>
              <ul class="list-infor">
                <li>
                  Tôn giáo:
                  <input
                    type="text"
                    v-model="list.religion"
                    class="religion"
                    name=""
                    id=""
                  />
                </li>
                <li>
                  Quê quán:
                  <div class="address">
                    <p>
                      Tỉnh:<input
                        type="text"
                        v-model="list.city"
                        class="city"
                        name=""
                        id=""
                      />
                    </p>
                    <p>
                      Thành phố/Huyện:
                      <input
                        type="text"
                        v-model="list.district"
                        class="district"
                        name=""
                        id=""
                      />
                    </p>
                    <p>
                      Xã/Phường:
                      <input
                        type="text"
                        v-model="list.town"
                        class="town"
                        name=""
                        id=""
                      />
                    </p>
                    <p>
                      Địa chỉ:
                      <input
                        type="text"
                        v-model="list.address"
                        class="address-detail"
                        name=""
                        id=""
                      />
                    </p>
                  </div>
                </li>
                <li>
                  Email:
                  <input
                    type="email"
                    v-model="list.email"
                    class="mail"
                    name=""
                    id=""
                  />
                </li>
                <li>
                  Married:
                  <form action="">
                    <input type="radio" v-model="list.married" value="true"> Đã kết hôn
                  <input type="radio" v-model="list.married" value="false"> Chưa kết hôn
                  </form> 
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="crimiantion">
          <h3>Tiền án tiền sự</h3>
          <div class="crimimal-content">
            <textarea
              v-model="list.criminalRecord"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
        <button @click.prevent="submit" class="submit">Cập nhật</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: {
        citizenId: '',
        name: "",
        birth: "",
        idFamily: "",
        gender: false,
        ethnic: "",
        religion: "",
        nationality: "",
        address: "",
        quarter: "123",
        town: "",
        district: "",
        city: "",
        profession: "",
        criminalRecord: "",
        phone: null,
        email: "",
        married: false,
        // role: []
      },
      idSearch: '',
    };
  },
  // middleware: 'nhan',
  methods: {
    async fetchData() {
      try {
        await this.$axios.get(
            `http://localhost:8080/api/citizen/listCitizen/id=${this.idSearch}`
          )
          .then((res) => {
            this.list.citizenId = res.data.citizenId;
            this.list.name = res.data.name;
            this.list.birth = res.data.birth;
            this.list.idFamily = res.data.family.id_Family;
            this.list.gender = res.data.gender;
            this.list.ethnic = res.data.ethnic;
            this.list.religion = res.data.religion;
            this.list.nationality = res.data.nationality;
            this.list.address = res.data.address;
            this.list.quarter = res.data.location.quarter;
            this.list.town = res.data.location.town;
            this.list.district = res.data.location.district;
            this.list.city = res.data.location.city;
            this.list.profession = res.data.profession;
            this.list.criminalRecord = res.data.criminalRecord;
            this.list.phone = res.data.phone;
            this.list.email = res.data.email;
            this.list.married = res.data.married;
            // this.list.role = res.data.role;
            console.log(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      try {
        console.log(this.list);
        console.log("test1");
        await this.$axios
          .put(`http://localhost:8080/api/citizen/update`,this.list
          )
          .then((res) => {
            console.log("test");
            alert('Cập nhật thành công!');
            this.list = res.data;
          });
          console.log("test2");
        console.log(this.list);
      } catch (error) {
        console.log("test3");
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}

html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  padding: 0;
  overflow: hidden;
}

.container h2 {
  padding: 10px;
  width: fit-content;
  margin-bottom: 60px;
}

ul {
  list-style: none;
}

.infor {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid green;
  border-bottom: 2px solid green;
}

.infor-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70%;
}

.list-infor {
  width: 50%;
}

.list-infor li {
  padding-bottom: 20px;
  line-height: 2;
  font-weight: 550;
}

.list-infor li span {
  font-weight: 400;
}

img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

.crimiantion {
  padding: 20px;
  border-bottom: 2px solid green;
  margin-bottom: 30px;
}

.crimimal-content textarea {
  width: 94vw;
  min-height: 100px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
}

input {
  padding: 5px;
  width: 200px;
  margin-left: 10px;
  border-radius: 8px;
  border: 0.8px solid black;
}

.city {
  margin-left: 105px;
}

.town {
  margin-left: 58px;
}

.address-detail {
  margin-left: 90px;
}

.nationality {
  margin-left: 30px;
}

.birthday {
  margin-left: 30px;
}

.cccd {
  margin-left: 30px;
}

.name {
  margin-left: 30px;
}

.ethinic {
  margin-left: 45px;
}

.idFamily {
  margin-left: 20px;
}

.religion {
  margin-left: 38px;
}

.mail {
  margin-left: 50px;
}

.gender-form {
  display: flex;
}
.gender-form form {
  width: 70%;
}

.submit {
  padding: 10px 30px;
  background-color: green;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  margin-bottom: 40px;
  position: absolute;
  right: 2%;
  cursor: pointer;
  box-shadow: 3px 3px 3px 1px rgba(218, 169, 36, 0.25);
  top: 180px;
}

.glass-find{
  width: 20px;
  height: auto;
  position: absolute;
  left: 25px;  
  top: 237px;
}

.input-search{
  margin: 20px 0;
  border-radius: 20px;
  position: absolute;
  left: 15px;  
  top: 210px;
  width: 200px;
  height: 20px;
  border: 1px solid black;
  padding: 5px 5px 5px 35px;
}

.button-search{
  position: absolute;
  left: 275px;  
  top: 235px;
  background-color: green;
  color: #fff;
  padding: 5px 12px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}
</style>