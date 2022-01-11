
let fullUser = JSON.parse(localStorage.getItem('fullUser')) || {};

export default{
  state:{
    notification: "",
    user: fullUser,
    profiles: []
  },
  mutations:{
    setProfiles(state,payload){
      state.profiles =  payload;    
      
    },
    setUser(state,payload){
      state.user =  payload;    
      
    },
    resetUser(state){
      state.user =  {};      
      
    },
    setNotification(state,payload){
      state.notification =  payload
    },
    clearNotification(state){
      state.notification =  "";
    }
  },
  actions:{
    setProfiles({commit},payload){
      commit('setProfiles', payload)
    },
    resetUser({commit}){
      commit('resetUser')
    },
    setUser({commit},payload){
      commit('setUser',payload)
    },
    setNotification({commit},payload){
      commit('setNotification',payload)
    },
    clearNotification({commit}){
      commit('clearNotification')
    }
  },
  getters:{
    getLayout(state){
      return state.layout;
    },
    getNotification(state){
      return state.notification;
    },
    getUser(state){
      return state.user;
    },
    getProfiles(state){
      return state.profiles;
    }
  }
}