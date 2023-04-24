<template>
    <div class="popup-overlay">
        <div class="popup-container">
            <div class="popup-header">
                <h3>Thông tin chi tiết cán bộ</h3>
                <button class="popup-close-btn" @click="closePopup">X</button>
            </div>
            <div class="popup-content">
                <ul class="infor__content--items">
                    <li class="content--item div-center">
                        <div class="left">
                            Họ tên:
                            <span>{{ politician.citizen.name }}</span>
                        </div>
                        <div>
                            Ngày sinh:
                            <span>{{ politician.citizen.birth }}</span>
                        </div>
                    </li>
                    <li class="content--item div-center">
                        <div class="left">
                            Giới tính:
                            <span>{{ politician.citizen.gender ? 'Nam' : "Nữ" }}</span>
                        </div>
                        <div>
                            Dân tộc:
                            <span>{{ politician.citizen.ethnic }}</span>
                        </div>
                    </li>
                    <li class="content--item div-center">
                        
                      <div>
                                Mã cán bộ:
                                <span>{{ politician.politician_id }}</span>
                            </div>
                    </li>
                    <li class="content--item div-center">
                        <div class="left">
                            Quốc tịch:
                            <span>{{ politician.citizen.nationality }}</span>
                        </div>
                        <div>
                            Tôn giáo:
                            <span>{{ politician.citizen.religion }}</span>
                        </div>
                    </li>
                    <li class="content--item div-center">
                        <div>
                            Khu vực:
                            <span>{{ politician.areaManage }}</span>
                        </div>
                    </li>
                    <li class="content--item div-center">
                        <div>
                           Chức vụ:
                            <span>{{ politician.position }}</span>
                        </div>
                    </li>
                    <li class="content--item div-center">
                        <div class="left">
                            Địa chỉ:
                            <span>{{politician.citizen.address }}</span>
                        </div>
                        <div>
                            Email:
                            <span>{{ politician.citizen.email }}</span>
                        </div>
                    </li>
                    <li class="content--item div-center">

                        <div>
                            Tình trạng hôn nhân:
                            <span>{{ politician.citizen.married ? "Đã kết hôn" : "Chưa kết hôn" }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        politician: {
            type: Object,
            required: true,
        },
    },
    methods: {
        closePopup() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
* {
    font-family: Mulish;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}


ul li {
    list-style: none;
    padding: 0;
    margin: 0;

}

.container {
    margin-left: 280px;
}

.overlay-hidden {
    position: fixed;
    left: 270px;
    top: 40px;
    right: 10px;
    bottom: 0;
    z-index: -1;
    background-color: rgb(239, 238, 238);
}

.infor--edit {
    position: absolute;
    top: 200px;
    right: 70px;
    font-weight: 600;
    font-size: 18px;
    padding: 5px 10px;
    border-radius: 8px;
    box-shadow: 5px 1px 10px #e1dede;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.infor__icon--edit {
    width: 20px;
    height: auto;
    margin-left: 10px;
}

.img--personal {
    margin-left: 50px;
}

.div-center {
    display: flex;
    text-align: center;
    justify-content: flex-start;
    align-items: center;
}

.img--personal img {
    width: 120px;
    height: 180px;
}

.img--personal span {
    font-size: 18px;
    font-weight: 550;
}

.infor--content {
    margin: 0 30px;
    padding: 30px;
    background-color: #fff;
    border-radius: 13px;
    box-shadow: 3px 2px 10px rgb(217, 213, 213);

}

.infor--content h2 {
    margin: 20px 0;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;

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
}.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    max-width: 1000px;
    width: 100%;
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.popup-close-btn {
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
}

.popup-content {
    margin-top: 20px;
}
</style>


