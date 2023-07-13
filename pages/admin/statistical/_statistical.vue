<template>
    <div class="container">
        <div class="statis-cards">
            <div class="card">
                <div class="total" @click.prevent="pushToList">
                    <div class="total-data">
                        <p>Tổng số người dùng:</p>
                        <h1>{{count[0]}}</h1>
                    </div>
                    <div class="total-gender citizen">
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="total">
                    <div class="total-data">
                        <p>Tổng số công dân:</p>
                        <h2>{{ count[0] - count[1] }}</h2>
                    </div>
                    <div class="total-gender military">
                    </div>
                </div>

            </div>
            <div class="card">
                <div class="total" >
                    <div class="total-data">
                        <p>Tổng số cán bộ công chức:</p>
                        <h2>{{ count[1] }}</h2>
                    </div>
                    <div class="total-gender criminal">
                    </div>
                </div>
            </div> 
        </div>

        <div class="area-charts">
            <div class="area-charts--item">
                <client-only placeholder="Loading...">
                    <donut-chart
                        v-if="count.length != 0"
                        :data="donutChartData" 
                        :options="chartOptions" 
                        :height="310" 
                        :width="1000"
                        class="pie-chart">
                    </donut-chart>
                </client-only>
                <h4>Biểu đồ thể hiện tình trạng kết hôn hoặc chưa kết hôn ở khu vực {{ nameArea }}</h4>
            </div>
        </div>
        <div class="list-comment">
            <h3>Danh sách ý kiến của người dân</h3>
            <ul class="responsive-table req-content">
                <li class="table-header">
                    <div class="col col-0">STT</div>
                    <div class="col col-1">Tên</div>
                    <div class="col col-2">Nội dung</div>
                </li>
                <ul class="responsive-table content" v-for="(item, index) in listOpinions" :key="index">
                    <li class="table-row display">
                        <div class="col col-0" data-label="STT">{{ item.id }}</div>
                        <div class="col col-1" data-label="Tên công dân">
                            {{ item.citizen.name }}
                        </div>
                        <div class="col col-2" data-label="Nội dung">{{ item.content }}</div>
                    </li>
                </ul>
            </ul>
        </div>
    </div>
</template>
<script>
import { Doughnut } from 'vue-chartjs';
export default {
    computed: {
        countData(){
            return this.count;
        },
        donutChartData() {
            return {
                labels: [
                    'Người dân',
                    'Cán bộ',
                ],
                datasets: [
                    {
                        label: '',
                        data: this.countData,
                        backgroundColor: [
                            '#ED3232',
                            '#189EFF',
                        ],
                        borderColor: '#fff',
                        borderWidth: 1,
                    },
                ],
            };
        },
        chartOptions() {
            return {
                beginAtZero: true,
                responsive: true,
                maintainAspectRatio: false,
                offset: 8,
                radius: 160,
                spacing: 4,
                hoverOffset: 32,
                hoverBorderWidth: 1,
                weight: 0,
                borderRadius: 8,
                categoryPercentage: 0.5,
                barPercentage: 0.5// thay đổi giá trị này để đặt độ rộng của cột là 20px

            };
        },
    },
    data() {
        return {
            listOpinions: [],
            nameArea: '',
            idPoli: null,
            count: []
        }
    },
    middleware: "auth",
    mounted() {
        this.idPoli = localStorage.getItem('idPolicitian');
        this.getOpinions()
        this.nameArea = localStorage.getItem('nameArea');
        this.getQuantity()
    },
    methods: {
        async getOpinions() {
            try {
                await this.$axios.get('http://localhost:8080/opinions/get')
                    .then((res) => {
                        this.listOpinions = res.data;
                        console.log(this.listOpinions)
                    })
            } catch (error) {
                console.log(error);
            }
        },
        async getQuantity() {
            try {
                await this.$axios.get(`http://localhost:8080/api/citizen/admin/report`)
                    .then((res) => {
                        this.count = res.data;
                    })
            } catch (error) {
                console.log(error);
            }

        },
        pushToList() {
            this.$router.push("/admin/listInforAll");
        },
    }
}
</script>
<style scoped>
.container {
    margin-left: 280px;
    margin-top: 50px;
}

.statis-cards {
    display: flex;
}

.card {
    /* height: 190px; */
    width: 32.6%;
}

.total {
    /* background-color: red; */

    /* padding: 10px 20px; */
    cursor: pointer;
    height: 160px;
    margin: 10px 20px;
    box-shadow: 3px 3px 10px 3px rgb(213, 214, 211);
    /* background: linear-gradient(to right,#fe9365,#feb798); */
    border-radius: 10px;
    transition: all 0.3s ease;
    animation: first-load 1s ease backwards;
}

.total:hover {
    transform: scale(1.04);
}

@keyframes first-load {
    from {
        opacity: 0;
        visibility: visible;
        display: block;
        transform: translateY(-100%);
    }

    to {
        opacity: 1;
        visibility: hidden;
        display: none;
        transform: translateY(0%);
    }

}

.total-data {
    background-color: #fff;
    /* height: 50%; */
    border-radius: 10px 10px 0 0;
    height: 120px;
    padding: 10px 20px;
}
.total-data p {
    font-weight: 600;
    color: #515050;
    margin-top: 10px;
}

.total-gender {
    padding: 10px 20px;
    /* height: ; */
    border-radius: 0 0 10px 10px;
    font-size: 14px;
    /* border-top: 1.7px solid #13761e; */
    background: linear-gradient(to right, #0d8e24, #5bbb6d);
    /* background: linear-gradient(to right,#fe9365,#feb798); */
    /* background-image: linear-gradient(to right, #50C878, #50C878); */
}

.military {
    background: linear-gradient(to right, #ED3232, #e57979);

}

.criminal {
    background: linear-gradient(to right, #189EFF, #78b7e3);
}



.area-charts {
    display: flex;
    width: 90%;
    background-color: #fff;
    padding: 30px;
    margin: 20px 0 0 20px;
    border-radius: 10px;
    justify-content: space-around;
}

.pie-chart {
    width: 320px;
}

.area-charts--item h4 {
    margin: 30px 0 10px 0;
    width: 400px;
    text-align: center;
}

.list-comment {
    background-color: #fff;
    width: 90%;
    margin: 50px 0 50px 20px;
    padding: 30px;
    border-radius: 10px;
}

.list-comment h3 {
    color: rgb(74, 73, 73);
    margin: 20px 0;
}

.responsive-table {
    padding-left: 0;
}

.responsive-table li {
    border-radius: 3px;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    /* margin-bottom: 25px; */
}

.responsive-table .table-header {
    /* background-color: rgb(159, 188, 159); */
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border-bottom: 1px solid rgb(116, 115, 115);
}

.responsive-table .table-row {
    background-color: #ffffff;
    /* box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1); */
    position: relative;
}

.responsive-table .col-0 {
    flex-basis: 10%;
}

.responsive-table .col-1 {
    flex-basis: 20%;
}

.responsive-table .col-2 {
    flex-basis: 65%;
}

.responsive-table div {
    text-align: center;
    cursor: pointer;
}
</style>