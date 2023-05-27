<template>
    <div class="container">
      <Navbar :userName = "name" />
        <h2 class="title">Danh sách những người chưa tham gia nghĩa vụ quân sự tại {{ nameArea }}</h2>
        <!-- <a href="http://localhost:8080/api/citizen/export-to-pdf/militaryService/poliId=1"> -->
          <button class="download">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
           Tải xuống 
          </button>
        <!-- </a> -->
        
        <div class="list-militariers">
            <ul class="responsive-table req-content">
                <li class="table-header">
                    <div class="col col-0">STT</div>
                    <div class="col col-1">Số CCCD</div>
                    <div class="col col-2">Tên</div>
                    <div class="col col-3">Ngày sinh</div>
                    <div class="col col-4">Địa chỉ</div>
                </li>
                <ul class="responsive-table content" v-for="(item, index) in listMilitarier" :key="index">
                    <li class="table-row display" @click="handleClick(item.citizenId)">
                        <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
                        <div class="col col-1" data-label="Số CCCD công dân">
                            {{ item.citizenId }}
                        </div>
                        <div class="col col-2" data-label="Tên">{{ item.name }}</div>
                        <div class="col col-3" data-label="Ngày sinh">{{ item.birth }}</div>
                        <div class="col col-4" data-label="Địa chỉ">{{ item.address }}</div>
                    </li>
                </ul>
            </ul>
    </div>
</div>
</template>
<script>
export default{
    data(){
        return {
            listMilitarier:[],
            idPoli:null,
            nameArea:'',
            idPoli:null,
            name:''
        }
    },
    mounted(){
        this.nameArea = localStorage.getItem('nameArea')
        this.getListMilitarier();
        this.idPoli = localStorage.getItem('idPolicitian');
        this.name = localStorage.getItem('name')
    },
    methods:{
      async getListMilitarier() {
        try {
          console.log("test militarie");
          this.idPoli = localStorage.getItem('idPolicitian')
          console.log("aaa"+this.idPoli);
          await this.$axios
            .get(`http://localhost:8080/api/citizen/report/militaryService/poliId=${this.idPoli}`)
            .then((res) => {
                  this.listMilitarier = res.data.list;
                  // localStorage.setItem('countMilitariers',res.data.count)
            });
        } catch (error) {
          console.log(error);
        }
      },
      handleClick(citizenId) {
      localStorage.setItem("idCitizenOfSeeInforCitizen", citizenId);
      this.$router.push("/poli/viewInforCitizen/inforCitizen");
      console.log(this.idCitizen);
    },
  }
}
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.list-militariers{
    background-color: #fff;
    padding: 30px;
    margin-right: 30px;
    border-radius: 10px;
    padding: 100px 0 50px 0;
}
.title {
  font-size: 22px;
  position: absolute !important;
  margin: 0;
  left: 20px;
  top: 20px;
  color: #4b4545;
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
  flex-basis: 15%;
}

.responsive-table .col-4 {
  flex-basis: 27%;
}
.table-row:hover{
  font-weight: 600;
  text-decoration: underline;
  color: #127E23;
}
.download{
  padding: 8px 20px ;
  background-color: #fff;
  border: 1px solid #127E23;
  border-radius: 5px;
  position: absolute;
  right: 60px;
  top: 50px;
  z-index: 3;
  cursor: pointer;
}
.download:hover{
  background-color: #127E23;
  color: #fff;
}
.download svg{
  width: 14px;
  height: auto;
  padding-right: 5px;
}
.download:hover svg{
  fill: #fff;
}
</style>