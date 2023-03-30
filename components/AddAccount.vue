<template>
    <div class="container">
        <div class="overlay-hidden"></div>
        <div class="infor--content">
            <h2>Thông tin cá nhân</h2>
            <ul class="infor__content--items">
                <li class="content--item div-center">
                    <div class="left">
                        Họ tên:
                        <input type="text" v-model="listInfor.name" value="">
                    </div>
                    <div>
                        Ngày sinh:
                        <input type="date" v-model="listInfor.birth" name="" id="">
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left form--gender">
                        Giới tính:
                        <form class="add-account__form--gender">
                            <input name="gender" v-model="listInfor.gender" type="radio" value="true" />Nam
                            <input name="gender" v-model="listInfor.gender" type="radio" value="false" />Nữ
                        </form>
                    </div>
                    <div>
                        Dân tộc:
                        <input type="text" v-model="listInfor.ethnic" name="" id="">
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Số CCCD:
                        <input type="text" v-model="listInfor.citizen_id" name="" id="">
                    </div>
                    <div>
                        Số hộ khẩu:
                        <input type="text" v-model="listInfor.idFamily">
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Quốc tịch:
                        <input type="text" v-model="listInfor.nationality">
                    </div>
                    <div>
                        Tôn giáo:
                        <input type="text" v-model="listInfor.religion">
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Tỉnh:
                        <input type="text" v-model="listInfor.city">
                    </div>
                    <div>
                        Huyện/Thành phố:
                        <input type="text" v-model="listInfor.district">
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        quarter:
                        <input type="text" v-model="listInfor.quarter">
                    </div>
                    <div>
                        Xã/Thị trấn:
                        <input type="text" v-model="listInfor.town">
                    </div>
                </li>
                <li class="content--item div-center">
                    <div>
                        Địa chỉ:
                        <input type="text" v-model="listInfor.address">
                    </div>
                </li>
                <li class="content--item div-center">
                    <div>
                        Nghề nghiệp:
                        <input type="text" v-model="listInfor.profession">
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="left">
                        Điện thoại:
                        <input type="number" v-model="listInfor.phone" name="" id="">
                    </div>
                    <div>
                        Email:
                        <input type="email" v-model="listInfor.email" name="" id="">
                    </div>
                </li>
                <li class="content--item div-center">
                    <div class="form-married">
                        Tình trạng hôn nhân:
                        <form class="form-married--options">
                            <input type="radio" v-model="listInfor.married" value="true"> Đã kết hôn
                            <input type="radio" v-model="listInfor.married" value="false"> Chưa kết hôn
                        </form>
                    </div>
                </li>
                <li class="content--item div-center">
                    <div>
                        Link ảnh:
                        <input type="text" v-model="listInfor.imgUrl">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ['listInfor'],
    methods: {
    },
}
</script>
<style scoped>
ul li {
    list-style: none;
    padding: 0;
    margin: 0;

}

.container {
    margin-left: 280px;
    margin-top: 140px;
}

.overlay-hidden {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: rgb(239, 238, 238);
}

.div-center {
    display: flex;
    text-align: center;
    justify-content: flex-start;
    align-items: center;
}

.add-account__form--gender {
    margin-left: 20px;
    display: flex;
}

.add-account__form--gender input {
    margin-right: 10px;
}

.form--gender {
    display: flex;
}

.infor--content {
    margin: 0 30px;
    padding: 30px;
    background-color: #fff;
    border-radius: 13px;
    box-shadow: 3px 2px 10px rgb(217, 213, 213);

}

.infor--content h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    margin: 0;
    color: #4B4545;
}

.infor__content--items {
    padding: 30px 40px;
}

.content--item {
    padding: 10px 5px;
    border-bottom: 1.2px solid #CDCDCD;
    transform: matrix(1, 0, 0, 1, 0, 0);

}

.content--item div {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #4B4545;
}

.left {
    width: 50%;
    text-align: initial;
}

input {
    border: none;
    border-bottom: 1px solid black;
    /* box-shadow: 2px 4px 6px #CDCDCD; */
    /* background-color:#eeeded; */
    padding: 2px 10px;
    /* border-radius: 5px; */
    margin-left: 10px;
}
.form-married{
    display: flex;
    text-align: start;
}
.form-married--options{
    margin-left: 10px;
    display: flex;
}
.form-married--options input{
    margin-right: 10px;
}
</style>