<template>
    <div class="container">
      <h2>Xoá thông tin cá nhân</h2>
      <form @submit.prevent="fetchData" class="search">
        <input v-model="idSearch" class="input-search" type="text" placeholder="Nhập số CCCD" />
        <svg class="glass-find" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        <button  @click.prevent="fetchData"  class="button-search"> Tìm kiếm </button>
      </form>
      <button @click.prevent="deleteData" class="submit">Xoá tài khoản</button>
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
                <span>{{listPoli.levelManager}}</span>
              </li>
              <li>
                Khu vực:
                <span>{{listPoli.areaManage}}</span>
              </li>
              <li>
                Chức danh:
                <span>{{listPoli.position}}</span>
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
                <span>{{this.list.family?.id_Family}}</span>
              </li>
              <li>
                Tôn giáo:
                <span>{{list.religion}}</span>
              </li>
              <li>
                Quê quán:
                <span>
                  {{list.address}}</span>
              </li>
              <li>
                Số điện thoại:
                <span>{{list.phone}}</span>
              </li>
              <li>
                Email:
                <span>{{list.email}}</span>
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
      listPoli: {},
      idSearch: '',
      gender:'',
    };
  },
    mounted() {
        this.idSearch = localStorage.getItem('id');
        this.fetchData();
        this.checkGender();
  },
  // middleware: 'auth',
  methods: {
    async fetchData() {
      try {
        await this.$axios.get(
            `http://localhost:8080/api/citizen/listCitizen/id=${this.idSearch}`
          )
          .then((res) => {
            this.list = res['data'];
          });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteData() {
      try {
        confirm("Bạn có muốn xoá tài khoản không?")
        await this.$axios.delete(
            `http://localhost:8080/api/citizen/delete/id=${this.idSearch}`
            ).then(() =>{
                alert('xoá thành công');
                this.$router.push("/");
            })
          console.log(this.list)
      } catch (error) {
        console.log(error);
      }
    },
    checkGender(){
      if(this.list.gender === false)
        this.gender = 'Nữ'
        else this.gender = 'Nam'
    },
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
    margin-bottom: 70px;
    width: fit-content;
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

  .glass-find{
    width: 20px;
    height: auto;
    position: absolute;
    left: 23px;  
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
    top: 233px;
    background-color: green;
    color: #fff;
    padding: 7px 12px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
  }

  .submit{
    padding: 7px 15px;
    background-color: green;
    color: #fff;
    border: none;
    font-size: 18px;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-left: 10px;
    cursor: pointer;
    position: absolute;
    right: 30px;
    top: 220px;
  }
  </style>