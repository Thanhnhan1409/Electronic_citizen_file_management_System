<template>
    <div class="container">

        <div class="poli_inf">
            <Tableft />
            <Navbar />
            <h2>Danh sách cán bộ</h2>
            <div class="search-bar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24"
                    style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                    <path
                        d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z">
                    </path>
                </svg>
                <input type="text" placeholder="Tìm kiếm cán bộ..." v-model="searchText" @input="searchPolitician" />
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
import PopUp from "../../../components/Poli/PopUp.vue";
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
            searchText: "",
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
        searchPolitician() {
            if (this.searchText !== "") {
                this.items = this.items.filter((item) =>
                    item.citizen.name.toLowerCase().includes(this.searchText.toLowerCase())
                );
            } else {
                this.fetchData();
            }
        },
    },
};
</script>



<style scoped>
.container {

    margin-left: 280px;
    margin-top: 70px;
}


.poli_inf {
    padding: 0px 0 30px 0;
    margin-top: 20px;
    box-shadow: 3px 3px 10px rgb(206, 203, 203);
    border-radius: 10px;
    background-color: #fff;

}

.poli_inf h2 {
    text-align: left;
    top: 10px;
    left: 0px;
    margin: 30px 0 30px 30px;

}

body {
    font-family: "lato", sans-serif;
}

.table {
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

.search-bar {
     position: relative;
  top: 50%;
  left: 85%;
  width: 250px;
  height: 40px;
  border-radius: 40px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  transform: translate(-50%, -50%);
  background: #b5d7bd;
  transition: all 0.3s ease;

}
.search-bar input {
    position: absolute;
  top: 10px;
  left: 38px;
  font-size: 14px;
  background: none;
  color: #5a6674;
  width: 195px;
  height: 20px;
  border: none;
  appearance: none;
  outline: none;

}
.search-bar svg{
    position: absolute;
  top: 10px;
  left: 15px;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  outline: none!important;
  cursor: pointer;
}
</style>