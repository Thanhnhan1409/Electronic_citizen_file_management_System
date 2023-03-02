import { createStore} from 'vuex'
export const state = () => ({
    levelManager: ""
})

 export const mutations ={
    setLevel(state, level){
        state.levelManager = level;
    }
 }

 export const getters = {
    getLevelManager(state){
        return state.Manager
    }
 }

 export const store = createStore({
    state,
    mutations,
    getters
  })

 