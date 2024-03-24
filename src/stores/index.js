import {createStore} from 'vuex'
import router from '../router/index'
//import axios from 'axios'

export default createStore({

    state:{
        email:"",
    },
    getters:{

    },
    mutations:{
        login(state, email){
            state.email = email;
            localStorage.setItem('email',email);

        },
        logout(state){
            state.email="";
            localStorage.removeItem('email');
            localStorage.removeItem('userName');
            localStorage.removeItem('token');
            localStorage.removeItem('pictureUrl');
            router.push({ path: '/login' })
        },
        initializeStore(state){
            if(localStorage.getItem('email')){
                state.email = localStorage.getItem('email');
            }
        }
    }
})