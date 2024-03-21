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
                      <v-form ref="form">
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
                               type="password"
                               placeholder="password"
                               :rules="passwordRules"
                            ></v-text-field>
 
                            <div class="red--text"> {{errorMessage}}</div>
                            <v-btn type="submit"  @click.prevent="login" class="mt-4" color="primary" value="log in">{{stateObj.login.name}}  <v-progress-circular
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
       url:  'http://192.168.1.10/hrms/api/mis/login',
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
     login() {
      axios.post(this.url,{
                email: this.username,
                password: this.password
              }).then(function (response) {
                  console.log(response);
              }).catch(function (error) {
                console.log(error);
              });
     },
   },
 };
 </script>