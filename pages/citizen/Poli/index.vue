<template>
    <div class="container">
        <Tableft />
        <Navbar />
        <div class="poli_inf">
            <h2>Danh sách cán bộ</h2>
            <div>
                <SelectProvince />
            </div>
            <div class="table">
                <ul class="responsive-table">
                    <li class="table-header">
                        <div class="col col-0">STT</div>
                        <div class="col col-1">Mã cán bộ</div>
                        <div class="col col-2">Tên</div>
                        <div class="col col-3">Giới tính</div>
                        <div class="col col-4">Chức vụ</div>
                        <div class="col col-5">Khu vực</div>
                    </li>
                    <li class="table-row display" v-for="(item, index) in items" :key="item.politicianId"
                        @click.prevent="handleClick(item)">
                        <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
                        <div class="col col-1" data-label="Mã cán bộ">{{ item.politicianId }}</div>
                        <div class="col col-2" data-label="Tên">{{ item.citizen.name }}</div>
                        <div class="col col-3" data-label="Giới tính">{{ item.citizen.gender ? "Nam" : "Nữ" }}</div>
                        <div class="col col-4" data-label="Chức vụ">{{ item.position }}</div>
                        <div class="col col-5" data-label="Khu vực">{{ item.areaManage }}</div>
                    </li>
                </ul>
            </div>
        </div>
        <PopUp v-if="selectedPolitician !== null" :politician="selectedPolitician" @close="closePopup" />
    </div>
</template>

<script>
import PopUp from "../../../components/PopUp.vue";
import Navbar from "../../../components/Navbar.vue";
import SelectProvince from "../../../components/SelectProvince.vue";
import Tableft from "../../../components/Tableft.vue";

export default {
    components: {
        Tableft,
        Navbar,
        SelectProvince,
        PopUp,
    },
    data() {
        return {
            items: [],
            selectedPolitician: null,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await this.$axios.get(`http://localhost:8080/api/politician/listPolitician/country`);
                this.items = response.data;
                localStorage.setItem("name", this.citi.name);
            } catch (error) {
                console.log(error);
            }
        },
        handleClick(politician) {
           
            this.selectedPolitician = politician;
        },
        closePopup() {
            this.selectedPolitician = null;
        },
    },
};
</script>



<style scoped>
.container {
    margin-left: 280px;
}


.poli_inf {
    padding: 50px 0 20px 0;
    box-shadow: 3px 3px 10px rgb(206, 203, 203);
    border-radius: 10px;
    background-color: #fff;

}

.poli_inf h2 {
    top: -30px;
    left: 0px;
    margin: 0;

}
body {
font-family: "lato", sans-serif;
}
.table{
    margin-top: 3%;
}
h2 {
font-size: 26px;
margin: 50px 0 80px 0;
text-align: center;
}

h2 small {
font-size: 0.5em;
}

.responsive-table {
padding-left: 0;
}

.responsive-table li {
border-radius: 3px;
padding: 25px 30px;
display: flex;
justify-content: space-between;
margin-bottom: 25px;
}

.responsive-table .table-header {
background-color: rgb(159, 188, 159);
font-size: 14px;
text-transform: uppercase;
letter-spacing: 0.03em;
}

.responsive-table .table-row {
background-color: #ffffff;
box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
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
flex-basis: 10%;
}

.responsive-table .col-4 {
flex-basis: 10%;
}

.responsive-table .col-6 {
flex-basis: 10%;
}

.responsive-table .col-5 {
flex-basis: 25%;
}

.responsive-table div {
text-align: center;
cursor: pointer;
}
.table-row:hover {
  color: green;
}
</style>