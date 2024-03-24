<template>
    <v-app>
       <v-main>
          <v-container >
           
                <v-flex xs12 sm8 md4>
                   <v-card class="elevation-4"  max-width="344">
                      <v-toolbar dark color="primary">
                         <v-toolbar-title>Login Form</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        <v-alert closable title="Error" :text=errorMessage  type="error" v-model="alert"></v-alert>
                      <v-form ref="form"  v-model="valid" lazy-validation>
                             <v-text-field
                               v-model="form.email"
                               name="email"
                               label="Email"
                               type="text"
                               placeholder="email"
                               :rules="emailRules"
                            ></v-text-field>
                            
                             <v-text-field
                               v-model="form.password"
                               name="password"
                               label="Password"
                               :type="show1 ? 'text' : 'password'"
                               placeholder="password"
                               :rules="passwordRules"
                               :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                               @click:append="show1 = !show1"
                               
                            ></v-text-field>
 
                            <div class="red--text"> {{errorMessage}}</div>
                            <v-checkbox label="Remember Me" v-model="rememberMe"></v-checkbox>
                            <v-btn type="submit" :disabled="!valid" @click.prevent="login" class="mt-4" color="primary" value="log in">{{stateObj.login.name}}<v-progress-circular
                                  v-show="progressBar" 
                                  color="white"
                                  indeterminate
                            ></v-progress-circular>
                          </v-btn>
                       </v-form>
                      </v-card-text>
                   </v-card>
                 
                </v-flex>
          
          </v-container>
       </v-main>
    </v-app>
 </template>
 
 <script lang="js">
 import axios from 'axios'
 import {ref} from 'vue'
 import useLocalStorage from '../composable/useLocalStorate'
 import {useAuthStore} from '../stores/auth'

 export default {
   name: "LoginView",

   setup(){
      const progressBar= ref(false);
      const isLogin = useLocalStorage(false, 'isLoginUser');
      console.log(useAuthStore.state.count)
      return {
         progressBar,
         isLogin,
      }
   },
   data() {
      
     return {
       errorMessage: "",
       alert: false,
       valid: true,
       show1: false,
       rememberMe: false,
       form:{
         email:"",
         password:"",
      },
      
       emailRules: [
       v => !!v || 'This field is required',
       v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
       passwordRules: [
         v => !!v || 'This field is required',
         v => v.length >=5 || 'Minimum Characters must be five'
       ],
       stateObj: {
          login : {
             name: 'Login',
             message: 'Register'
          }
       }
     };
   },
  
   methods: {
    async login() {
      this.progressBar = true;
      this.valid=false;
      this.isLogin=true;
      let {data} = await axios.post('login',this.form).then(function (response){
               return response;
               
              }).catch(function (error) {
               console.log('error');
               return error.response;
              });
              if(data.status==200){
               console.log('sucess');
               this.valid= true;
               this.progressBar = false;
               this.$store.commit('login', this.form.email)
               localStorage.setItem('userName',data.userName);
               localStorage.setItem('token',data.token);
               localStorage.setItem('pictureUrl',data.pictureUrl);
               this.$router.push({ path: '/dashboard' })
              }else{
               console.log('fail');
               this.valid= true;
               this.progressBar = false;
               this.errorMessage = data.message;
               this.alert=true;
              }
             console.log(data);
     },

   },
 };
 </script>