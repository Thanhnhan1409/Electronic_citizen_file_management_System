<template>
    <div class="container">
        <Tableft />
        <Navbar />
        <div @click.prevent="displayPopup" class="add-notification">
            <svg class="icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" />
            </svg>
            <p>Đóng góp ý kiến</p>


        </div>

        <div class="list--content-notification">
            <h2>Ý kiến đã gửi</h2>
            <ul class="responsive-table content">
                <li class="table-header">
                    <div class="col col-0">STT</div>
                    <div class="col col-1">Số CCCD</div>
                    <div class="col col-2">Ngày gửi</div>
                    <div class="col col-3">Nội dung</div>
                  
                </li>
                <li class="table-row display" v-for="item of listOpinion" :key="item.id">
                    <div class="col col-0" data-label="STT">{{ item.id }}</div>
                    <div class="col col-1" data-label="Số CCCD">{{ item.citizen.citizenId }}</div>
                    <div class="col col-2" data-label="Ngày gửi">{{ date }}</div>
                    <div class="col col-3" data-label="Nội dung">{{ item.content }}</div>
                   
                </li>
            </ul>
        </div>
        <div class="overlay-Popup"></div>

        <div class="add-notificaito--popup">
            <svg @click.prevent="hiddenPopup" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </svg>
            <div class="popup-content">
                <h3>Đóng góp ý kiến</h3>
                <ul class="popup-input">

                    <li class="popup-input--title">
                        <span>Nội dung:</span>
                        <textarea v-model="content" name="" id="" cols="30" rows="10"></textarea>
                    </li>
                    <button @click.prevent="postData" class="popup-button">Gửi ý kiến</button>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>

import PopupConfirm from '../../../components/PopupConfirm.vue';
import Tableft from '../../../components/Tableft.vue';

export default {
    components: {
        Tableft,
    },
    data() {
        return {
            listOpinion: [
            ],
            date: '',
            content:''
        };
    },
    mounted() {
       this.postData();
        this.fetchData();
        this.getDate();
        
    },
    methods: {
    
          async fetchData() {
            try {
                await this.$axios
                    .get(`http://localhost:8080/opinions/get`)
                    .then((res) => {
                        this.listOpinion = res.data;
                        console.log(this.listOpinion)
                        
                    });
            } catch (error) {
                console.log(error);
            }
        },
    
        async postData() {
            try {
                const res = await this.$axios.post(`http://localhost:8080/opinions/new`, {
                    content: this.content,
                    author_id: this.citizenId
                }).then()
                
                this.listOpinion = res.data;
                alert("Thêm thành công!");
            } catch (error) {
                console.error(error);
                console.log("lỗi!")
                
            }
            this.hiddenPopup();
        },
        
      
        displayPopup() {
            document.querySelector('.add-notificaito--popup').classList.add('display-block');
            document.querySelector('.overlay-Popup').classList.add('display-block');
        },
        hiddenPopup() {
            document.querySelector(".add-notificaito--popup").classList.remove("display-block");
            document.querySelector(".overlay-Popup").classList.remove("display-block");
            this.fetchData();
        },
        getDate() {
            let currentDate = new Date();
            this.date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
        }
    },
}

</script>
<style scoped>
body {
    font-family: "lato", sans-serif;
}

.container {
    max-width: 1500px;
    margin-left: 280px;
    padding-left: 10px;
    padding-right: 10px;

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

h2 {
    font-size: 22px;
    top: -40px;
    left: 20px;
    position: relative;
    margin: 0;
}

ul li {
    list-style: none;
    padding: 0px;
}

.display-block {
    display: block !important;
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

.list--content-notification {
    box-shadow: 3px 3px 10px rgb(201, 200, 200);
    background-color: #ffffff;
    padding: 50px 0 30px 0;
    margin-top: 50px;
    border-radius: 10px;
}

.responsive-table .table-header {
    background-color: rgb(159, 188, 159);
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin-top: 30px;
}

.responsive-table .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}

.responsive-table .col-0 {
    flex-basis: 10%;
}

.responsive-table .col-1 {
    flex-basis: 15%;
}

.responsive-table .col-2 {
    flex-basis: 15%;
}

.responsive-table .col-3 {
    flex-basis: 40%;
}

.responsive-table .col-4 {
    flex-basis: 20%;
}

.responsive-table div {
    text-align: center;
    cursor: pointer;
}

.item-idCitizen {
    padding: 2px 3px !important;
    margin: 0 !important;
}

.list-idCitizen--items {
    padding: 0;
}

.icon-plus {
    width: 16px;
    height: auto;
    /* fill: #fff; */
    margin-left: 7px;
}

.add-notification {
    box-shadow: 3px 3px 10px 2px rgb(231, 226, 226);
    position: absolute;
    display: flex;
    padding: 7px 15px;
    border-radius: 10px;
    font-weight: 600;
    justify-content: space-between;
    align-items: center;
    right: 300px;
    top: 100px;
    margin-right: 20px;
    background-color: #ffffff;
    transition: all 0.3s linear;
    cursor: pointer;
}

.add-notification:hover {
    transform: scale(1.05);
}

.add-notification p {
    margin: 0px;
    margin-left: 5px;
}

.add-notificaito--popup {
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

.add-notificaito--popup svg {
    width: 12px;
    height: auto;
    position: absolute;
    right: 20px;
    fill: rgb(107, 106, 106);
    cursor: pointer;
}

.popup-input {
    padding: 10px 30px;
}

.popup-content h3 {
    text-align: center;
}

.popup-input--title {
    display: flex;
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
    height: 50px;
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
}</style>