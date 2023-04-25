<template>
    <div class="popup">
        <div class="popup-container">
            <h2 class="popup-title">{{ title }}</h2>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="name">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" v-model="message"></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
            <button class="close-btn" @click="closePopup">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            name: '',
            email: '',
            message: ''
        }
    },
    methods: {
        handleSubmit() {
            // Gửi thông tin lên server
            this.closePopup();
        },
        closePopup() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.popup-container {
    position: relative;
    width: 80%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.popup-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button[type="submit"] {
    display: block;
    margin: 20px auto 0;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color:#ccc;
}

</style>