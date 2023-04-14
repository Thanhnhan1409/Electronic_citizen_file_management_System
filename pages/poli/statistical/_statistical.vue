<template>
    <div class="container">
        <div class="statis-cards">
            <div class="card">
                <div class="total" @click.prevent="pushToList">
                    <div class="total-data">
                        <p>Tổng số người dân:</p>
                        <h1>{{countCitizen }}</h1>
                    </div>
                    <div class="total-gender citizen">
                        <div>
                            <span>Nam:</span>
                            <span>12</span>
                        </div>
                        <div>
                            <span>Nữ:</span>
                            <span>12</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="total">
                    <div class="total-data" @click="pushToListMilitariers">
                        <p>Tổng số người đã đi NVQS:</p>
                        <h2>{{ countMilitariers }}</h2>
                    </div>
                    <div class="total-gender military">
                        <div>
                            <span>Nam:</span>
                            <span>12</span>
                        </div>
                        <div>
                            <span>Nữ:</span>
                            <span>12</span>
                        </div>
                    </div>
                </div>

            </div>
            <div class="card">
                <div class="total" @click="pushToListCriminal">
                    <div class="total-data">
                        <p>Tổng số tội phạm:</p>
                        <h2>123</h2>
                    </div>
                    <div class="total-gender criminal">
                        <div>
                            <span>Nam:</span>
                            <span>12</span>
                        </div>
                        <div>
                            <span>Nữ:</span>
                            <span>12</span>
                        </div>
                    </div>
                </div>

            </div>
            <div class="card">
                <div class="total">
                    <div class="total-data">
                        <p>Tổng số người dân:</p>
                        <h2>123</h2>
                    </div>
                    <div class="total-gender difference">
                        <div>
                            <span>Nam:</span>
                            <span>12</span>
                        </div>
                        <div>
                            <span>Nữ:</span>
                            <span>12</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="area-charts">
            <div class="area-charts--item">
                <client-only placeholder="Loading...">
                    <donut-chart :data="donutChartData" :options="chartOptions" :height="310" :width="1000"
                        class="pie-chart">
                    </donut-chart>
                </client-only>
                <h4>Biểu đồ thể hiện tình trạng kết hôn hoặc chưa kết hôn ở khu vực {{ nameArea }}</h4>
            </div>
            <div class="area-charts--item">
                <client-only placeholder="Loading...">
                    <bar-chart :data="barChartData" :options="chartOptions" :height="310" class="bar-chart"></bar-chart>
                </client-only>
                <h4>Biểu đồ thể hiện số lượng người ở các độ tuổi trong khu vực {{ nameArea }}</h4>
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
        donutChartData() {
            return {
                labels: [
                    'Đã kết hôn',
                    'Chưa kết hôn',
                ],
                datasets: [
                    {
                        label: '',
                        data: [23,30],
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
        barChartData() {
            return {
                labels: [
                    'Dưới 14 tuổi',
                    'Từ 14 tuổi đến 59 tuổi',
                    'Từ 60 tuổi trở lên',
                ],
                datasets: [
                    {
                        borderRadius: 8,
                        hoverBorderRadius: 8,
                        label: '',
                        data: this.listAge,
                        backgroundColor: [
                            '#ED3232',
                            '#189EFF',
                            '#50C878'
                        ],
                        barThickness: 40,
                        onClick: (event, activeElements) => {
                            if (activeElements.length > 0) {
                                const index = activeElements[0]._index;
                                console.log(`Clicked on bar ${index}`);
                            }
                        }
                    },
                ],
            };
        },
        chartOptions() {
            return {
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: this.countCitizen
                        }
                    }]
                },
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
            listAge: [1, 3, 2],
            totalCitizens: 120,
            countMilitariers: null,
            idPoli: null,
            countMarried: 0,
            countNoMarry: 0,
            countCitizen:0
        }
    },
    mounted() {
        this.idPoli = localStorage.getItem('idPolicitian');
        this.getOpinions()
        this.nameArea = localStorage.getItem('nameArea');
        this.getQuantityOfAge()
        this.countMilitariers = localStorage.getItem('countMilitariers')
        this.getListMilitery()
        // this.getCountNoMarry()
        // this.getCountMarried()
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
        async getQuantityCitizen() {
            try {
                await this.$axios.get(`http://localhost:8080/api/citizen/report/countCitizen/poliId=${this.idPoli}`)
                    .then((res) => {
                        this.countCitizen = res.data;
                    })
            } catch (error) {
                console.log(error);
            }

        },
        async getQuantityOfAge() {
            try {
                await this.$axios.get('http://localhost:8080/api/citizen/report/age')
                    .then((res) => {
                        this.listAge = res.data;
                        console.log(this.listAge)
                    })
            } catch (error) {
                console.log(error);
            }

        },
        async getListMilitery() {
            try {
                await this.$axios(`http://localhost:8080/api/citizen/report/militaryService/poliId=${this.idPoli}`)
                    .then((res) => {
                        this.countMilitariers = res.data.count;
                        localStorage.setItem('listMilitaries', res.data.list)
                        console.log("militery" + this.listMilitery);
                    })
            } catch (error) {
                console.log(error);
            }

        },
        async getCountMarried() {
            try {
                await this.$axios(`http://localhost:8080/api/citizen/report/married/poliId=${this.idPoli}/?isMarried=true`)
                    .then((res) => {
                        this.countMarried = res.data.count;
                    })
            } catch (error) {
                console.log(error);
            }

        },
        async getCountNoMarry() {
            try {
                await this.$axios(`http://localhost:8080/api/citizen/report/married/poliId=${this.idPoli}/?isMarried=false`)
                    .then((res) => {
                        this.countNoMarry = res.data.count;
                    })
            } catch (error) {
                console.log(error);
            }

        },
        pushToList() {
            this.$router.push("/poli/seeInforCitizen/_seeInforCitizen");
        },
        pushToListMilitariers() {
            this.$router.push("/poli/statistical/listOfMilitarier");
        },
        pushToListCriminal() {
            this.$router.push("/poli/statistical/listOfCriminal");
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
    width: 24%;
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
    height: 90px;
    padding: 10px 20px;
}

.total-data h1 {
    padding-top: 20px;
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
    background: linear-gradient(to right, #17c136, #66c978);
    /* background: linear-gradient(to right,#fe9365,#feb798); */
    /* background-image: linear-gradient(to right, #50C878, #50C878); */
}

.military {
    background: linear-gradient(to right, #fcf525, #e5e18e);

}

.criminal {
    background: linear-gradient(to right, #fb8a5d, #e7b7a4);
}

.difference {
    background: linear-gradient(to right, #23c5c5, #99f6f6);

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
}</style>