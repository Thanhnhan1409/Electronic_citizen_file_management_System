<template>
    <div class="container">
        <Tableft />
        <InforCitizenNew :listInfor="listInfor" :genderEx="genderEx" @gender="gender" />
        <InforPoli :listPoli="listPoli"/>
    </div>
</template>
<script>
import Tableft from '../../components/Tableft.vue';
import InforCitizenNew from '../../components/InforCitizenNew.vue';
import InforPoli from '../../components/InforPoli.vue';
export default {
    components: {
        InforCitizenNew,
        Tableft,
        InforPoli
    },
    data() {
        return {
            listInfor: [],
            genderEx: '',
            id: null,
            listPoli:[]
        }
    },
    mounted() {
        this.id = localStorage.getItem("id");
        this.fetchDataCitizen();
        this.fetchDataPoli();
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
    },
}
</script>