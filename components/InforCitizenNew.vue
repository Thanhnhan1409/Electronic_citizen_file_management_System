<template>
    <div class="container">
        <div class="overlay-hidden"></div>
        
        <div class="img--personal div-center">
            <img  src="../static/images/logo.png" alt="">
            <span>{{ listInfor.name }}</span>
        </div>
        <div class="infor--content">
            <h2>Thông tin cá nhân</h2>
            <!-- <div class="infor--edit">
                Chỉnh sửa
                <svg class="infor__icon--edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/></svg>
            </div> -->
            <ul class="infor__content--items">
                <li class="content--item div-center">
                    <div class="left">
                        Họ tên:
                        <span>{{ listInfor.name }}</span>
                    </div>
                    <div>
                        Ngày sinh:
                        <span>{{ listInfor.birth }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Giới tính:
                        <span :keyup="gender(listInfor)">{{ genderEx }}</span>
                    </div>
                    <div>
                        Dân tộc:
                        <span>{{ listInfor.ethnic }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Số CCCD:
                        <span>{{ listInfor.citizen_id }}</span>
                    </div>
                    <div>
                        Số hộ khẩu:
                        <span>{{ listInfor.family?.id_Family }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Quốc tịch:
                        <span>{{ listInfor.nationality }}</span>
                    </div>
                    <div>
                        Tôn giáo:
                        <span>{{ listInfor.religion }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div>
                        Địa chỉ:
                        <span>{{ listInfor.address }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div>
                        Nghề nghiệp:
                        <span>{{ listInfor.profession }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Điện thoại:
                        <span>{{ listInfor.address }}</span>
                    </div>
                    <div>
                        Email:
                        <span>{{ listInfor.email }}</span>
                    </div>
                </li>
                <li class="content--item div-center">
                    
                    <div>
                       Tình trạng hôn nhân:
                        <span></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default{
    props:['listInfor', 'genderEx'],
    methods: {
      gender(list) {
        this.$emit('gender',list)
      },
    },
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul li{
    list-style: none;
    padding: 0;
    margin: 0;
    
}
.container{
    margin-left: 280px;
}
.overlay-hidden{
    position: fixed;
    left: 0;
    top:0;
    right: 10px;
    bottom: 0;
    z-index: -1;
    background-color: rgb(239, 238, 238);
}
.infor--edit{
    position: absolute;
    top: 200px;
    right: 70px;
    font-weight: 600;
    font-size: 18px;
    padding: 5px 10px ;
    border-radius: 8px;
    box-shadow: 5px 1px 10px #e1dede;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.infor__icon--edit{
    width:20px;
    height: auto;
    margin-left: 10px;
}
.img--personal{
    margin-left: 50px;
}
.div-center{
    display: flex;
    text-align: center;
    justify-content: flex-start;
    align-items: center;
}
.img--personal img{
    width: 120px;
    height: 180px;
}
.img--personal span{
    font-size: 18px;
    font-weight: 550;
}
.infor--content{
    margin:0 30px;
    padding: 30px;
    background-color: #fff;
    border-radius: 13px;
    box-shadow: 3px 2px 10px rgb(217, 213, 213);

}
.infor--content h2{
    font-family: 'Segoe UI Variable';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;

    color: #4B4545;
}
.infor__content--items{
    padding: 30px 40px;
}
.content--item {
    padding: 10px 5px;
    border-bottom: 1.2px solid #CDCDCD;
    transform: matrix(1, 0, 0, 1, 0, 0);
    
}
.content--item div{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #4B4545;
}
.left{
    width: 50%;
    text-align: initial;
}
</style>