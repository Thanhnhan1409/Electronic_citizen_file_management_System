<template>
  <div class="container">
    <Tableft/>
    <Navbar/>
    <InforCitizenNew :listInfor="list"/>
    <InforPoli :listPoli="listPoli" />
  </div>
</template>
<script>
import Tableft from '@/components/Tableft.vue';
import InforCitizenNew from '@/components/InforCitizenNew.vue';
import InforPoli from '@/components/InforPoli.vue';
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    InforCitizenNew,
    Tableft,
    InforPoli
  },
  data() {
    return {
      message: "",
      list: {},
      listPoli: {},
      id: "",
      idFamily: null,
      role: [],
      name: "",//lưu tên user
    };
  },
  // middleware: "auth",
  mounted() {
    this.id = localStorage.getItem("id");
    this.fetchData();
    this.fetchDataPoli();
    // this.gender();
    this.getFamilyId();
    this.name = localStorage.getItem("name");
  },
  methods: {
    async fetchData() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
          .then((res) => {
            this.list = res["data"];
            localStorage.setItem("name", this.list.name);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataPoli() {
      try {
        await this.$axios
          .get(`http://localhost:8080/api/politician/citizenId=${this.id}`)
          .then((res) => {
            this.listPoli = res["data"];
            localStorage.setItem('nameArea', this.listPoli.areaManage)
            localStorage.setItem('level', this.listPoli.levelManager)
            localStorage.setItem('idPolicitian', this.listPoli.politician_id)
            console.log(this.listPoli);
          });
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      localStorage.clear();
      localStorage.removeItem("auth._token.local");
      //login=>index
      this.$router.push("/");
    },
    getFamilyId() {
      for (let item in this.list) {
        console.log(item);
      }
    },
  },
};
</script>
<style src="../../../static/asset/styles.css"></style>
<!-- <template>
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
  // import { mapMutations } from 'vuex';
  export default {
    components: {
    },
    data() {
    return {
      message: "",
      list: {},
      listPoli: {
      },
      id: '',
      gender:'',
      idFamily: null,
      role:[],
    };
  },
    mounted() {
    this.id = localStorage.getItem("id");
    this.fetchData();
    this.fetchDataPoli();
    this.checkGender();
    this.getFamilyId();
  },

  methods: {
    async fetchData() {
      try {
        await this.$axios.get(
            `http://localhost:8080/api/citizen/listCitizen/id=${this.id}`
          )
          .then((res) => {
            this.list = res['data'];
            localStorage.setItem('name', this.list.name)
            
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataPoli() {
      try {
        await this.$axios.get(
            `http://localhost:8080/api/politician/citizenId=${this.id}`
          )
          .then((res) => {
            this.listPoli = res['data'];  
            localStorage.setItem('nameArea', this.listPoli.areaManage)
            localStorage.setItem('levelManager', this.listPoli.levelManager)
            console.log(this.listPoli);
            
          });
      } catch (error) {
        console.log(error);
      }
    },
    // ...mapMutations({
    // }),
    checkGender(){
      if(this.list.gender === false)
        this.gender = 'Nữ'
        else this.gender = 'Nam'
    },
    getFamilyId(){
      for(let item in this.list){
        console.log(item)
      }
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
  </style> -->