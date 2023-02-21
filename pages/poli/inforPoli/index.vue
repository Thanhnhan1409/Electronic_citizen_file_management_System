<template>
    <div class="container">
      <h2>Thông tin cá nhân</h2>
      <div>
        <div class="infor">
          <img
            src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/326538807_878801156697098_8566777046600716424_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kXnmArmPyF4AX-HBWWm&_nc_ht=scontent.fdad1-2.fna&oh=00_AfCV4UkBupefj4sYTgZWeeY5Pcz2ngffrYmkt44nqVyO8w&oe=63EBB4D2"
            alt=""
          />
          <div class="infor-content">
            <ul class="list-infor">
              <li>Họ và tên: <span>{{list.name}}</span></li>
              <li>
                Số CCCD:
                <span>{{ list.citizen_id }}</span>
              </li>
              <li>
                Giới tính:
                <span >{{gender}}</span>
              </li>
              <li>
                Quốc tịch:
                <span>{{list.nationality}}</span>
              </li>
              <li>
                Nghề nghiệp:
                <span>{{list.profession}}</span>
              </li>
              <li>
                Cấp vụ:
                <span>{{list.levelManager}}</span>
              </li>
              <li>
                Khu vực:
                <span>{{list.areaManage}}</span>
              </li>
              <li>
                Chức danh:
                <span>{{list.position}}</span>
              </li>
              
            </ul>
            <ul class="list-infor">
              <li>
                Ngày sinh:
                <span>{{list.birth}}</span>
              </li>
              <li>
                Dân tộc:
                <span>{{list.ethnic}}</span>
              </li>
              <li>
                Số hộ khẩu:
                <span>{{list.idFamily}}</span>
              </li>
              <li>
                Tôn giáo:
                <span>{{list.religion}}</span>
              </li>
              <li>
                Quê quán:
                <span>
                  {{list.address}}</span
                >
              </li>
              <li>
                Số điện thoại:
                <span>{{list.phone}}</span>
              </li>
              <li>
                Email:
                <span>{{list.mail}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
    
    <script>
  export default {
    components: {
    },
    data() {
    return {
      message: "",
      list: {},
      id: '',
      gender:'',
      nameUser: '',

    };
  },
    mounted() {
    this.id = localStorage.getItem("id");
    this.fectchData();
    this.checkGender();

  },
  methods: {
    async fectchData() {
      try {
        await this.$axios.get(
            `http://localhost:8080/api/citizen/listCitizen/id=${this.id}`
          )
          .then((res) => {
            this.list = res['data'];
          });
      } catch (error) {
        console.log(error);
      }
    },
    checkGender(){
      if(this.list.gender === false)
        this.gender = 'Nữ'
        else this.gender = 'Nam'
    }
  },
  }
  </script>
    
    <style scoped>
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .container {
    margin: 0;
    padding: 0;
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
  </style>