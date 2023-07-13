<template>
    <div class="container">
        <Navbar :userName = "name"/>
        <InforCitizenNew :listInfor="information" />
        <Criminalrecord :Criminalrecord="information.Criminalrecord"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            information: {},
            id: "",
            name:''
        };
    },
    middleware: "auth",
    mounted() {
        this.id = localStorage.getItem("id");
        this.fetchData();
        
    },
    methods: {
        async fetchData() {
            try {
                await this.$axios
                    .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
                    .then((res) => {
                    this.information = res["data"];
                    localStorage.setItem("name", this.information.name);
                    localStorage.setItem("idFamily", this.information.family);
                    this.name = localStorage.getItem('name');
                });
            }
            catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
