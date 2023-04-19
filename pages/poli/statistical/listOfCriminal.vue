<template>
    <div class="container">
        <h2 class="title">Danh sách tội phạm tại {{ nameArea }}</h2>
        <div class="list-criminal">
            <ul class="responsive-table req-content">
                <li class="table-header">
                    <div class="col col-0">STT</div>
                    <div class="col col-1">Số CCCD</div>
                    <div class="col col-2">Tên</div>
                    <div class="col col-3">Ngày sinh</div>
                    <div class="col col-4">Địa chỉ</div>
                    <div class="col col-5">Tội danh</div>
                </li>
                <ul class="responsive-table content" v-for="(item, index) in listCriminalRecord" :key="item.id_requirement">
                    <li class="table-row display"  @click="handleClick(item.citizenId)">
                        <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
                        <div class="col col-1" data-label="Số CCCD công dân">
                            {{ item.citizenId }}
                        </div>
                        <div class="col col-2" data-label="Tên">{{ item.name }}</div>
                        <div class="col col-3" data-label="Ngày sinh">{{ item.birth }}</div>
                        <div class="col col-4" data-label="Địa chỉ">{{ item.address }}</div>
                        <div class="col col-5" data-label="Tội danh">{{ item.criminalRecord }}</div>

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
            listCriminalRecord:[],
            idPoli:null,
            nameArea:''
        }
    },
    mounted(){
        this.idPoli = localStorage.getItem('idPolicitian')
        this.nameArea = localStorage.getItem('nameArea')
        this.getListCriminal();
    },
    methods:{
        async getListCriminal() {
          try {
            console.log("test militarie");
            await this.$axios
              .get(`http://localhost:8080/api/citizen/report/criminalRecord/poliId=${this.idPoli}`)
              .then((res) => {
                    this.listCriminalRecord = res.data.list;
                    // localStorage.setItem('countCriminals',res.data.count)
              });
          } catch (error) {
            console.log(error);
          }
      },
      handleClick(citizenId) {
      localStorage.setItem("idCitizenOfSeeInforCitizen", citizenId);
      this.$router.push("/poli/seeInforCitizen/inforCitizen");
      console.log(this.idCitizen);
    },
    }
}
</script>
<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.list-criminal{
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
  flex-basis: 10%;
}

.responsive-table .col-3 {
  flex-basis: 15%;
}

.responsive-table .col-4 {
  flex-basis: 15%;
}
.responsive-table .col-5 {
  flex-basis: 25%;
}
.table-row:hover{
  font-weight: 600;
  text-decoration: underline;
  color: green;
}
</style>