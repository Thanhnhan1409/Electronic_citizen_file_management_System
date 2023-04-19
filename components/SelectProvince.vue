<template>
    <div class="filter">
        <label for="province">Tỉnh/Thành phố:</label>
        <select id="province" v-model="selectedProvince" @change="onChangeProvince">
            <option value="">Chọn tỉnh/thành phố</option>
            <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</option>
        </select>

        <label for="district">Quận/Huyện:</label>
        <select id="district" v-model="selectedDistrict" @change="onChangeDistrict" :disabled="!selectedProvince">
            <option value="">Chọn quận/huyện</option>
            <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}</option>
        </select>

        <label for="ward">Phường/Xã:</label>
        <select id="ward" v-model="selectedWard" :disabled="!selectedDistrict">
            <option value="">Chọn phường/xã</option>
            <option v-for="ward in wards" :key="ward.id" :value="ward.id">{{ ward.name }}</option>
        </select>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            provinces: [],
            districts: [],
            wards: [],
            selectedProvince: '',
            selectedDistrict: '',
            selectedWard: ''
        }
    },
    mounted() {
        axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then(response => {
                this.cities = response.data;
            });
    },

    methods: {
        onCityChange(event) {
            const cityId = event.target.options[event.target.selectedIndex].dataset.id;
            if (cityId) {
                const city = this.cities.find(c => c.Id === cityId);
                this.districts = city.Districts;
                this.wards = [];
            } else {
                this.districts = [];
                this.wards = [];
            }
        },
        onDistrictChange(event) {
            const districtId = event.target.options[event.target.selectedIndex].dataset.id;
            if (districtId) {
                const cityId = document.getElementById('city').options[document.getElementById('city').selectedIndex].dataset.id;
                const city = this.cities.find(c => c.Id === cityId);
                const district = city.Districts.find(d => d.Id === districtId);
                this.wards = district.Wards;
            } else {
                this.wards = [];
            }
        }
    }
    
}


</script>

<style>
.filter {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
   
   
}


label {
    margin-right: 1rem;
}

select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    margin-right: 1rem;
    font-size: 1rem;
}

select:disabled {
    opacity: 0.5;
}
</style>
