<template>
    <div class="container">
        <InforCitizenNew :listInfor="list" />
        <Criminalrecord :Criminalrecord="list.Criminalrecord"/>
    </div>
</template>
<script>

export default {
    data() {
        return {
            list: {},
            id: "",
        };
    },
    mounted() {
        this.id = localStorage.getItem("idViewInfor");
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                await this.$axios
                    .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
                    .then((res) => {
                    this.list = res["data"];
                });
            }
            catch (error) {
                console.log(error);
            }
        },
        
    },
};
</script>

<style scoped src="~/static/asset/styles.css"></style>