import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { getLocal } from '@/utilis/local.js'

export default new Vuex.Store({
  state: {
    // token:getLocal('tokenInfo') ? getLocal('tokenInfo').token : '',
    // refresh_token:getLocal('tokenInfo') ? getLocal('tokenInfo').refresh_token : ''    
    token:getLocal('tokenInfo') && getLocal('tokenInfo').token,
    refresh_token:getLocal('tokenInfo') && getLocal('tokenInfo').refresh_token    
  },
  mutations: {
    changeToken(state,token){
      state.token = token
    },
    changeRefToken(state,token){
      state.refresh_token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
