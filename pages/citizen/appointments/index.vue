<template>
    <div class="container">
        <div class="container-listInfor">
            <div @click.prevent="displayPopup" class="add-appointment">
                <svg class="icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" />
                </svg>
                <p>Hẹn lịch</p>


            </div>

            <h2 class="title">Danh sách lịch hẹn</h2>

            <div class="list-appointment">
                <ul class="responsive-table">
                    <li class="table-header">
                        <div class="col col-0">STT</div>
                        <div class="col col-1">Số CCCD</div>
                        <div class="col col-2">Người nhận</div>
                        <div class="col col-3">Ngày</div>
                        <div class="col col-4">Bắt đầu</div>
                        <div class="col col-5">Kết thúc</div>
                        <div class="col col-6">Nội dung</div>
                        <div class="col col-7">Trạng thái</div>
                    </li>
                    <ul class="responsive-table content">
                        <li class="table-row display" v-for="(item, index) in listAppointment" :key="index">
                            <div class="col col-0" data-label="STT">{{ index + 1 }}</div>
                            <div class="col col-1" data-label="Số CCCD">{{ item.citizen.citizen_id }}</div>
                            <div class="col col-2" data-label="Tên ">{{ item.politician.citizen.name }}</div>
                            <div class="col col-3" data-label="Ngày">{{ item.appointmentDate }}</div>
                            <div class="col col-4" data-label="Bắt đầu">{{ item.startTime }}</div>
                            <div class="col col-5" data-label="Kết thúc">{{ item.endTime }}</div>
                            <div class="col col-6" data-label="Nội dung">{{ item.description }}</div>
                            <div class="col col-7" data-label="Trạng thái">{{ item.status }}</div>
                        </li>
                    </ul>
                </ul>
            </div>

            <div class="overlay-Popup"></div>

            <div class="addAppointment-popup">
                <svg @click.prevent="hiddenPopup" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                </svg>
                <div class="popup-content">
                    <h3>Hẹn lịch</h3>
                    <ul class="popup-input">

                        <li class="popup-input--title">
                            <div class="ngnhan">
                                <span>Người nhận:</span>
                                <input type="text" v-model="politician_id">
                            </div>
                            <div class="ngnhan">
                               <label for="appointment-date">Ngày hẹn:</label>
                      <input type="date"   v-model="appointmentDate">


                            </div>
                            <div class="time ">
                                <label for="start-time">Giờ bắt đầu:</label>
                                 <input type="time" v-model="startTime">

                                     <label for="end-time">Giờ kết thúc:</label>
                                    <input type="time" v-model="endTime">

                            </div>
                            <span>Nội dung:</span>
                            <textarea v-model="description" name="" id="" cols="30" rows="10"></textarea>
                        </li>
                        <button @click.prevent="postData" class="popup-button">Hẹn lịch</button>
                    </ul>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            listAppointment: [],
            id: '',
            citizenId: '',
            politician_id: '',
            appointmentDate: '',
            startTime: '',
            endTime: '',
          description:''

        };
    },
    mounted() {
         this.id = localStorage.getItem("id");
        this.fetchData();
        
    },
    methods: {
        async fetchData() {
            try {
                await this.$axios
                    .get(`http://localhost:8080/api/appointment/citizen_id=${this.id}`)
                    .then((res) => {
                        this.listAppointment = res.data;
                        console.log(this.listAppointment)
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async postData() {
            try {
                const response = await this.$axios.post(`http://localhost:8080/api/appointment/new`, {
                    citizen_id: this.citizenId,
                    politician_id: this.politician_id,
                    appointmentDate: this.appointmentDate,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    description: this.description
                    
                });
                this.listAppointment = response.data;
                console.log(this.listAppointment);
                alert('Gửi thành công');
            } catch (error) {
                console.error(error);
                alert('Gửi thất bại');
            }
            this.hiddenPopup();
        },
        displayPopup() {
            document.querySelector('.addAppointment-popup').classList.add('display-block');
            document.querySelector('.overlay-Popup').classList.add('display-block');
        },
        hiddenPopup() {
            document.querySelector(".addAppointment-popup").classList.remove("display-block");
            document.querySelector(".overlay-Popup").classList.remove("display-block");
            this.fetchData();
        },
    }
};
</script>

<style scoped src="../../../static/asset/styles.css"></style>
<style scoped>
.title {
    position: absolute !important;
    font-size: 22px;
    margin: 50px 0 60px 0;
    z-index: 2;
    color: #4b4545;
    left: 20px;
    top: 20px;
}

.responsive-table .col-0 {
    flex-basis: 10%;
}

.responsive-table .col-1 {
    flex-basis: 15%;
}

.responsive-table .col-2 {
    flex-basis: 10%;
}

.responsive-table .col-3 {
    flex-basis: 10%;
}

.responsive-table .col-4 {
    flex-basis: 10%;
}

.responsive-table .col-5 {
    flex-basis: 10%;
}

.responsive-table .col-6 {
    flex-basis: 20%;
}

.responsive-table .col-7 {
    flex-basis: 10%;
}

.list-appointment {
    margin-top: 60px;
    /* margin-left: 10px; */
    padding: 100px 0 20px 0;
    box-shadow: 4px 4px 10px 3px rgb(221, 221, 221);
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    width: 97%;
}

.display-block {
    display: block !important;
}

.add-appointment {
    box-shadow: 3px 3px 10px 2px rgb(231, 226, 226);
    position: absolute;
    display: flex;
    padding: 7px 15px;
    border-radius: 10px;
    font-weight: 600;
    justify-content: space-between;
    align-items: center;
    right: 200px;
    top: 50px;
    margin-right: 10px;
    background-color: #53bc47a8;
    transition: all 0.3s linear;
    cursor: pointer;
    z-index: 3;
}

.add-appointment:hover {
    transform: scale(1.05);
}

.add-appointment p {
    margin: 0px 0px 0px 5px;

}

.icon-plus {
    width: 16px;
    height: auto;
    /* fill: #fff; */
    margin-left: 7px;

}

.overlay-Popup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
    background-color: rgb(239, 238, 238);
    opacity: 0.6;
    display: none;
}

.addAppointment-popup {
    width: 400px;
    height: auto;
    box-shadow: 3px 3px 10px 2px rgb(207, 203, 203);
    padding: 10px 20px;
    border-radius: 10px;
    position: fixed;
    top: 30%;
    left: 40%;
    background-color: #ffffff;
    z-index: 20;
    display: none;
}

.addAppointment-popup svg {
    width: 12px;
    height: auto;
    position: absolute;
    right: 20px;
    fill: rgb(107, 106, 106);
    cursor: pointer;
}

.popup-content h3 {
    text-align: center;
}

.popup-input {
    padding: 10px 30px;
}

.popup-input--title {
    /* display: flex; */
    margin-top: 10px;

}

.popup-input--title span {
    width: 30%;
}

.popup-input--title input {
    border: none;
    width: 215px;
    border-bottom: 1px solid rgb(59, 59, 59);
    margin-left: 10px;
    padding: 5px 7px;
    /* border-radius: 5px; */
}

.popup-input--title textarea {

    width: 210px;
    height: 20px;
    margin-left: 10px;
    padding: 5px 10px;
    /* border-radius: 10px; */
}

.popup-button {
    padding: 5px 10px;
    border: none;
    margin-top: 20px;
    background-color: green;
    border-radius: 5px;
    color: #ffffff;
    position: relative;
    left: 32%;
    cursor: pointer;
}
.ngnhan {
    margin-bottom: 20px;
}
.time input {
    margin-bottom: 10px;

}
.time label{
    margin-bottom: 10px;
}
</style>
