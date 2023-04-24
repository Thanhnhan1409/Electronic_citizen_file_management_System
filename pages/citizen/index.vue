<template>
    <div class="container">
        <Tableft />
        <Navbar />
        <InforCitizenNew :listInfor="list" />
        <Criminalrecord :listInfor="list"/> 


    </div>
</template>
<script>
import Tableft from '@/components/Tableft.vue';
import InforCitizenNew from '@/components/InforCitizenNew.vue';
import Navbar from '@/components/Navbar.vue';
import Criminalrecord from '../../components/Criminalrecord.vue';
export default {
    components: {
        InforCitizenNew,
        Tableft,
        Criminalrecord,

    },
    data() {
        return {
            message: "",
            list: {},
            id: "",
            idFamily: null,
            role: [],
            name: "",
        };
    },

    mounted() {
        this.id = localStorage.getItem("id");
        this.fetchData();
        this.getFamilyId();
        this.name = localStorage.getItem("name");
    },
    methods: {
        async fetchData() {
            try {
                await this.$axios
                    .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
                    .then((res) => {
                        this.list = res["data"];
                        localStorage.setItem("name", this.list.name);
                    });
            } catch (error) {
                console.log(error);
            }
        },

        logout() {
            localStorage.clear();
            localStorage.removeItem("auth._token.local");

            this.$router.push("/");
        },
        getFamilyId() {
            for (let item in this.list) {
                console.log(item);
            }
        },
    },
};
</script>

<style scope>
@import url('static\asset\styles.css');
</style>