// store/store.js

import { createStore } from 'vuex';

// 1. Define the initial state
const state = {
  googleAccessToken: null, // This can store the Google OAuth token
  // Add other global state variables as needed
};

// 2. Define mutations to modify the state
const mutations = {
  setGoogleAccessToken(state, token) {
    state.googleAccessToken = token;
  },
  // Define other mutations as needed
};

// 3. Define actions to perform asynchronous tasks and commit mutations
const actions = {
  setGoogleToken({ commit }, token) {
    commit('setGoogleAccessToken', token);
  },
  // Define other actions as needed
};

// 4. Define getters to access and compute state data
const getters = {
  googleAccessToken: (state) => state.googleAccessToken,
  // Define other getters as needed
};

// 5. Create the Vuex store
const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
