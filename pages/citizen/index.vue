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
        this.id = localStorage.getItem("id");
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                await this.$axios
                    .get(`http://localhost:8080/api/citizen/listCitizen/id=${this.id}`)
                    .then((res) => {
                    this.list = res["data"];
                    localStorage.setItem("name", this.list.name);
                    localStorage.setItem("idFamily", this.list.family);
                });
            }
            catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
