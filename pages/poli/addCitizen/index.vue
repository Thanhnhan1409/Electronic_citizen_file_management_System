<template>
  <div class="container">
    <div class="content">
      <h2>Đăng ký thông tin cá nhân công dân</h2>
      <button @click.prevent="submit" class="submit">Đăng ký</button>
      <AddCitizen :list="list" ></AddCitizen>
      </div>
  </div>
</template>

<script>
import AddCitizen from '../../../components/AddCitizen.vue';
import auth from '../../../middleware/auth';
export default {
  components:{
    AddCitizen
  },
  data() {
    return {
      list: {
        name: "",
        password: "123",
        birth: "",
        idFamily: "",
        gender: false,
        ethnic: "",
        religion: "",
        nationality: "",
        address: "",
        quarter: "123",
        town: "",
        district: "",
        city: "",
        profession: "",
        criminalRecord: "",
        phone: null,
        email: "",
        married: false,
        imgUrl: "",
        militaryService: false,
      },
    };
  },
  methods: {
    async submit() {
      try {
        console.log(this.list);
        await this.$axios
          .post("http://localhost:8080/api/v1/auth/register", this.list
          )
          .then((res) => {
            alert("Đăng ký thành công!");
            this.$router.push("/");
          });
        console.log(this.list);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}

html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  padding: 0;
  overflow: hidden;
}

.container h2 {
  padding: 10px;
  width: fit-content;
  margin-bottom: 0;
}

ul {
  list-style: none;
}


img {
  width: 180px;
  height: 210px;
  margin-right: 20px;
}

input {
  padding: 5px;
  width: 200px;
  margin-left: 10px;
}

.submit {
  padding: 10px 30px;
  background-color: green;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  margin-bottom: 40px;
  position: absolute;
  right: 2%;
  cursor: pointer;
  box-shadow: 3px 3px 3px 1px rgba(218, 169, 36, 0.25);
  top: 180px;
}
</style>