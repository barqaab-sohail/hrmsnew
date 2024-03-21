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
                      <v-form ref="form"  v-model="valid" lazy-validation>
                             <v-text-field
                               v-model="username"
                               name="username"
                               label="Username"
                               type="text"
                               placeholder="username"
                               :rules="emailRules"
                            ></v-text-field>
                            
                             <v-text-field
                               v-model="password"
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


 export default {
   name: "LoginView",
   data() {
     return {
       username: "",
       password: "",
       errorMessage: "",
       valid: true,
       progressBar:false,
       show1: false,
       rememberMe: false,
       url:  'http://localhost/hrms/api/mis/login',
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
      const  data  = await axios.post(this.url,{
                email: this.username,
                password: this.password
              }).then(function (response){
              return response;
              }).catch(function (error) {
                console.log(error);
              });
          console.log(data);
     },
   },
 };
 </script>