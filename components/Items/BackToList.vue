<template>
    <div>
        <div class="back-to-list" @click="pushTo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
            </svg>
            <span>Quay lại</span>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        pushTo() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.back-to-list {
    position: absolute;
    top: -60px;
    left: 20px;
    width: 100px;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s linear;
}

.back-to-list svg {
    width: 14px;
    height: auto;
    transition: all 0.2s linear;
}

span {
    color: black;
    text-decoration: none;
    margin-left: 10px;
    font-weight: 600;
    transition: all 0.2s linear;
}
.back-to-list:hover svg{
    transform: translateX(-5px);
}
.back-to-list:hover span{
    transform: scale(1.03);
}
</style>