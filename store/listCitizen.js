
import { defineStore } from 'pinia';

export const useListCitizenStore = defineStore('listCitizen', {
  state: () => {
    return {
      listCitizen: [],
    }
    
  },
  getters: {
    getListCitizen() {
      return this.listCitizen;
    },
    getQuantityCitizen(){
      return this.listCitizen.length;
    }
  },
  actions: {
    setListCitizen(newListCitizen) {
      this.listCitizen = newListCitizen;
      localStorage.setItem('listCitizenData', JSON.stringify(newListCitizen));
    },
  },
});
