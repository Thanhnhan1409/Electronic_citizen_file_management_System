import { defineStore } from "pinia";

export const currentUserStore = defineStore("currentUser", {
  state: () => {
    return {
      user: {},
    };
  },
  getters: {
    getCurrentUser() {
      return this.user;
    },
  },
  actions:{
    setCurrentUser(newUser){
        this.user = newUser;
    }
  }
});
