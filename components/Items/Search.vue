<template>
    <div class="container">
        <div class="form">
            <input v-model="searchId" v-on:keydown.enter="searchItems" class="input-search" type="text" placeholder="Nhập số CCCD hoặc tên">
            <svg class="icon-glass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <button @click="searchItems" class="button-search">
                Tìm kiếm
            </button>
        </div>

    </div>
</template>
  
<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            searchId: this.value,
        }
    },
    watch: {
        value(newValue) {
            this.searchId = newValue
        },
    },
    methods: {
        searchItems() {
            // Do nothing if searchId is empty
            if (!this.searchId) {
                return
            }

            // Convert searchId to a number
            const id = this.searchId

            // Reset searchId to empty string
            this.searchId = ''

            // Emit the "search" event with the searched id
            this.$emit('search', id)
        }
    }
}
</script>

<style scoped>
.container {
    width: fit-content;
}
.form{
    position: relative;
    width: fit-content;
}
.input-search {
    width: 200px;
    padding: 5px 10px 5px 35px;
    border-radius: 15px;
    border: 0.5px solid black;
    margin-right: 5px;
}

.icon-glass {
    width: 18px;
    height: auto;
    position: absolute;
    top: 5px;
    left: 9px;
}

.button-search {
    border-radius: 15px;
    padding: 5px 10px;
    border: none;
    color: #fff;
    background-color: green;
    cursor: pointer;
    width: 80px;
    transition: all 0.2s ease;
}
.button-search:hover{
    box-shadow: 3px 3px 10px 3px rgb(221, 221, 221);
}
</style>