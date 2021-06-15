import { createStore } from 'vuex'
// import { ref } from 'vue'

export default createStore({
  state: {
    network: {
      provider: null,
      contract: null
    },

    wallet: {
      balance: null
    }
  },

  getters: {
    isConnected: state => {
      return !!state.network.provider && !!state.network.contract
    }
  },

  actions: {
    updateNetworkConnection: async ({ commit }, payload) => {
      commit('updateNetworkConnection', payload)
    },

    updateWallet: ({ commit }, payload) => {
      commit('updateWallet', payload)
    }
  },

  mutations: {
    updateNetworkConnection: (state, payload) => {
      Object.keys(payload).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(state.network, key)) state.network[key] = payload[key]
        // else state.network[key] = ref(payload[key])
      })
    },

    updateWallet: (state, payload) => {
      Object.keys(payload).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(state.wallet, key)) state.wallet[key] = payload[key]
        // else state.wallet[key] = ref(payload[key])
      })
    }
  }
})
