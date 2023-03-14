<template>
    <div class="container">
        <h2>Danh dách nội dung thông báo</h2>
        <div class="add-notification">
           <svg class="icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z"/></svg>
        <p>Thêm thông báo</p> 
        </div>
        
        <div>
            <ul class="responsive-table">
                <li class="table-header">
                    <div class="col col-0">STT</div>
                    <div class="col col-1">Số CCCD Người nhận</div>
                    <div class="col col-2">Ngày</div>
                    <div class="col col-3">Nội dung</div>
                </li>
                <!-- <ul class="responsive-table content" v-for="item of listNotification" :key="item.id_requirement">
                    <ul class="table-row display">
                        <li class="table-header">
                            <div class="col col-0" data-label="STT">{{ item.id }}</div>
                            <div class="col col-1" data-label="Số CCCD Người nhận" v-for="tmp of item.citizens">
                                {{ tmp.citizen.citizenId }}
                            </div>
                            <div class="col col-2" data-label="Ngày">{{ Date.now() }}</div>
                            <div class="col col-3" data-label="Nội dung">{{ item.message }}</div>
                        </li>
                    </ul>
                </ul> -->
            </ul>
        </div>
        <h2>Thêm Thông báo</h2>
    </div>
</template>

<style scoped>
body {
  font-family: "lato", sans-serif;
}

.container {
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
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
  flex-basis: 15%;
}

.responsive-table .col-1 {
  flex-basis: 15%;
}

.responsive-table .col-2 {
  flex-basis: 15%;
}

.responsive-table .col-3 {
  flex-basis: 20%;
}



.responsive-table div {
  text-align: center;
  cursor: pointer;
}

.icon-plus{
    width: 16px;
    height: auto;
    fill: #fff;
}

.add-notification{
    border: 1px solid #fff;
    background-color: green;
    color: #fff;
    position: absolute;
    display: flex;
    padding: 7px 15px;
    border-radius: 10px;
    justify-content: space-between;
    align-items: center;
    right: 110px;
    top: 270px;
}

.add-notification p{
    margin: 0px;
    margin-left: 5px;
}
</style>