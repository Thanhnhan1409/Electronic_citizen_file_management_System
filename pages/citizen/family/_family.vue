<template>
    <div class="container">
        <Navbar :userName = "name" />
        <ListInfor6Colums
        :listTmp="listFamily"
        :object="'family'"
        @pushToDetailInfor="pushToDetailInfor"
        :title="'người thân trong gia đình'"
        />
    </div>
</template>
<script>
import { getMaxListeners } from 'process';

export default {
    data(){
        return{
            idFamily:null,
            listFamily:[],
            name:''
        }
    },
    mounted(){
        this.idFamily = localStorage.getItem('idFamily')
        this.getListFamily();
        this.name = localStorage.getItem('name')
    },
    methods: {
        async getListFamily(){
            try {
                await this. $axios
            .get(`http://localhost:8080/api/citizen/family/id=${this.idFamily}`)
            .then((res)=>{
                this.listFamily = res.data;
            })
            } catch (error) {
                console.log(error);
            }
            
        },
        pushToDetailInfor(id){
            this.$router.push("/citizen/family/inforMember")
        }
    }
}

    
</script>
<style src="../../../static/asset/styles.css"></style>
<style scoped>
.container {
    margin-left: 280px;
}

h2 {
    position: absolute;
    top: 70px;
    /* margin: 50px 0 80px 0; */
}

h2 small {
    font-size: 0.5em;
}

.req-content {
    padding: 100px 0 20px 0;
    box-shadow: 3px 3px 10px rgb(206, 203, 203);
    border-radius: 10px;
    background-color: #fff;
    margin-top: 60px;
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
    position: relative;
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

.responsive-table .col-5 {
    flex-basis: 15%;
}

.responsive-table .col-6 {
    flex-basis: 18%;
}

.responsive-table .col-7 {
    flex-basis: 20%;
}

.responsive-table div {
    text-align: center;
    cursor: pointer;
}

.button-display {
    position: absolute;
    right: 40px;
    top: 110px;
}

.button-all {
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
    width: 70px;
}

.button-waiting {
    /* position: absolute;
  top: 270px;
  left: 190px; */
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
    width: 120px;

}

.button-except {
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
    width: 100px;

}

.button-denied {
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
    width: 90px;

}

.display-block {
    display: block !important;
}

.display-flex {
    display: flex !important;
    justify-content: space-evenly;
}

.display-hide {
    display: none !important;
}

#popUp-forward {
    width: 300px;
    height: 170px;
    /* border: 1px solid black; */
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 3px 3px 10px 2px #3e463d;
    text-align: center;
    position: fixed;
    left: 40%;
    top: 45%;
    z-index: 90;
    background-color: #fff;
}

#overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: -100%;
    opacity: 0.6;
    background-color: rgb(139, 142, 144);
    animation: overlay 0.5s ease forwards;
    z-index: 10;
}

@keyframes ovelay {
    from {
        opacity: 0;
        visibility: hidden;
        transform: translateX(-100%);
    }

    to {
        opacity: 1;
        visibility: visible;
        transform: translateX(0%);

    }

}

#popUp-forward p {
    text-align: center;
    font-weight: 650;
    margin-top: 20px;
}

#popUp-forward input {
    border: none;
    border-bottom: 1px solid black;
    padding: 3px 8px;
    margin: 35px 0 10px 10px;
    width: 100px;
}

.popup--icon-close {
    width: 10px;
    height: auto;
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    fill: #818281;
}

.popup--button button {
    margin-top: 15px;
    padding: 5px 10px;
    cursor: pointer;
    width: 135px;
    border: 0.3px solid black;
}

.popup--button {
    display: flex;
    padding: 10px;
    justify-content: space-between;

}

.cancel {
    background-color: #fff;
    border: 0.3px solid black;
    color: green;

}

.confirm {
    background-color: green;
    color: #fff;
    border: 1.3px solid #fff;
    margin-left: 5px;
}

.status {
    position: absolute;
    right: 55px;
    top: -3px;
}

.status-action {
    padding: 10px 15px;
    box-shadow: 3px 3px 10px #cccccc;
    background-color: #fff;
    border-radius: 5px;
    width: 100px;
    font-size: 15px;
    z-index: 3;
    transition: all 0.2s linear;
    opacity: 0;
    visibility: hidden;
    /* display: none; */
    /* display: none; */
}

.status-action li {
    padding: 0;
    margin: 0;
    cursor: pointer;
}

.status-action li:hover {
    color: green;
    font-weight: 550;
}

.icon__status-dot {
    position: absolute;
    right: 0px;
    top: 30px;
    width: 3px;
    height: auto;
    cursor: pointer;
    /* z-index: 4; */
}

.icon__status-dot:hover {
    fill: green;
}

.icon__status-dot:hover+.status-action {
    opacity: 1;
    visibility: visible;
    display: block;
}

.status-action:hover {
    opacity: 1;
    visibility: visible;
    display: block;
}

#popup--confirm-change {
    width: 280px;
    height: auto;
    background-color: #fff;
    padding: 10px 25px;
    border-radius: 5px;
    position: fixed;
    z-index: 90;
    top: 40%;
    left: 45%;

}

#popup--confirm-change span {
    font-weight: 600;
    text-align: center;
}</style>