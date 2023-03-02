<template>
  <div class="container">
    <h2>Thông tin công dân</h2>
    <div>
      <div>
        <div class="infor">
          <img
            src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/326538807_878801156697098_8566777046600716424_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kXnmArmPyF4AX-HBWWm&_nc_ht=scontent.fdad1-2.fna&oh=00_AfCV4UkBupefj4sYTgZWeeY5Pcz2ngffrYmkt44nqVyO8w&oe=63EBB4D2"
            alt=""
          />
          <div class="infor-content">
            <ul class="list-infor">
              <li>
                Họ và tên: <span>{{ listInfor.name }}</span>
              </li>
              <li>
                Số CCCD:
                <span>{{ listInfor.citizen_id }}</span>
              </li>
              <li>
                Giới tính:
                <span :keyup="gender(listInfor)"> {{ genderEx }}</span>
              </li>
              <li>
                Quốc tịch:
                <span>{{ listInfor.nationality }}</span>
              </li>
              <li>
                Nghề nghiệp:
                <span>{{ listInfor.profession }}</span>
              </li>
              <li>
                Số điện thoại:
                <span>{{ listInfor.phone }}</span>
              </li>
            </ul>
            <ul class="list-infor">
              <li>
                Ngày sinh:
                <span>{{ listInfor.birth }}</span>
              </li>
              <li>
                Dân tộc:
                <span>{{ listInfor.ethnic }}</span>
              </li>
              <li>
                Số hộ khẩu:
                <span>{{ listInfor.family?.id_Family }}</span>
              </li>
              <li>
                Tôn giáo:
                <span>{{ listInfor.religion }}</span>
              </li>
              <li>
                Quê quán:
                <span>{{ listInfor.address }}</span>
              </li>
              <li>
                Email:
                <span>123@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="crimiantion">
        <h3>Tiền án tiền sự</h3>
        <div class="crimimal-content">
          Nội dung: {{ listInfor.criminalRecord }}
        </div>
      </div>
    </div>
  </div>
</template>
      
    <script>
export default {
  components: {},
  data() {
    return {
      listInfor: {},
      genderEx: "nu",
      id: null,
    };
  },
  mounted() {
    this.id = localStorage.getItem("idCitizenOfSeeInforCitizen");
    this.fetchDataCitizen();
  },
  methods: {
    async fetchDataCitizen() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
          .then((res) => {
            this.listInfor = res["data"];
            console.log(this.listInfor);
          });
      } catch (error) {
        console.log(error);
      }
    },
    gender(list) {
      if (list.gender === false) return (this.genderEx = "nữ");
      else return (this.genderEx = "nam");
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

.crimimal-content {
  background-color: #f3f3f3;
  padding: 20px 10px;
  border-radius: 10px;
  min-height: 100px;
  margin-bottom: 10px;
}
</style>