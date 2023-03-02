<template>
  <div class="container">
    <div class="content">
      <h2>Đăng ký thông tin cá nhân công dân</h2>
      <button class="submit">Đăng ký</button>
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
                  <input type="number" v-model="list.password" class="cccd" />
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
                  <input
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
        <button @click.prevent="submit" class="submit">Đăng ký</button>
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
        // citizen_id: "52",
        name: "",
        password: "123",
        birth: "",
        idFamily: "",
        gender: false,
        ethnic: "",
        religion: "",
        nationality: "",
        address: "",
        //location_id: 123,
        quarter: "123",
        town: "",
        district: "",
        city: "",
        profession: "",
        criminalRecord: "",
        phone: null,
        email: "",
        married: false,
      },
    };
  },
  // middleware: 'main',
  methods: {
    async submit() {
      // sau khi nhập dữ liệu, làm cách nào để đẩy dữ liệu lên server
      try {
        console.log(this.list);
        await this.$axios
          .post("http://localhost:8080/api/v1/auth/register", this.list
          )
          .then((res) => {
            this.$router.push("/citizen/inforCitizen");
          });
        console.log(this.list);
      } catch (error) {
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
  margin-bottom: 0;
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
</style>