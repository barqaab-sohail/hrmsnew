import { createStore } from 'vuex'
//import axios from 'axios'
export const useAuthStore = createStore({
    state () {
        return {
          count: 0
        }
      },
      mutations: {
        increment (state) {
          state.count++
        }
      }

})