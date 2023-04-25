<template>
    <div class="container">
        <LandingPage/>
    </div>
</template>
<script>
import moment from 'moment-timezone';

export default {
    data() {
        return {
            selectedDate: "",
            timezoneOffset: "", // định dạng múi giờ
        };
    },
    methods: {
        handleDateChange() {
            const formattedDate = moment(this.selectedDate).format("YYYY-MM-DD");
            const formattedTimezone = moment.tz(this.timezoneOffset).format("Z");
            // Sử dụng formattedDate và formattedTimezone trong yêu cầu API hoặc xử lý dữ liệu ngày tháng
            // ...
        },
    },
};

</script>