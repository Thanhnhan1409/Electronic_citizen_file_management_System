<template>
    <div class="container">
        <div class="nav-bar">
            <div @click.prevent="changePassVisible" class="nav__name-user">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                <span> | {{ userName }} </span>
                <nuxt-link to="/poli/changePass/" v-show="isShow" class="nav__change-pass">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                    </svg>
                    <p>Đổi mật khẩu</p>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>    
export default {
    props:['userName'],
    data() {
        return {
            isShow: false,
        }
    },
    methods: {
        changePassVisible() {
            this.isShow = !this.isShow;
        },
    }
}
</script>
<style scoped>
.nav-bar {
    text-align: end;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    padding: 7px 10px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 8;
    box-shadow: 3px 3px 10px rgb(210, 208, 208);
}

.nav__name-user {
    cursor: pointer;
    padding-right: 30px;
    display: flex;
    justify-content: center;
}

.nav__name-user svg {
    width: 16px;
    height: auto;
    padding-right: 7px;
}

.nav__change-pass {
    position: absolute;
    right: 30px;
    top: 30px;
    transition: all 0.5 linear;
}
.change-pass--visible {
    display: block !important;
    transform: translateY(0%) !important;
}
.nav__change-pass p {
    padding: 5px 10px;
    /* border-radius: 10px; */
    background-color: #127E23;
    color: #fff;
    margin: 0;
    width: 110px;
    position: absolute;
    text-align: center;
    right: -4px;
    top: 12px;
    text-align: start;
}

.nav__change-pass svg {
    fill: #127E23;
    position: absolute;
    right: 0px;
    top: 2px;
    width: 13px;
    height: auto;
}
</style>