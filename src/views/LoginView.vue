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
                      <v-form ref="form"   v-model="valid"
    lazy-validation>
                             <v-text-field
                               v-model="username"
                               name="username"
                               label="Username"
                               type="text"
                               placeholder="username"
                               :rules="userNameRuless"
                               required
                            ></v-text-field>
                            
                             <v-text-field
                               v-model="password"
                               name="password"
                               label="Password"
                               type="password"
                               placeholder="password"
                               :rules="inputRules"
                               required
                            ></v-text-field>
 
                            <div class="red--text"> {{errorMessage}}</div>
                            <v-btn type="submit"  :disabled="!valid" @click="login" class="mt-4" color="primary" >Log In</v-btn>
                       </v-form>
                      </v-card-text>
                   </v-card>
                 
                </v-flex>
          
          </v-container>
       </v-main>
    </v-app>
 </template>
 
 <script lang="js">
 
 export default {
   name: "LoginView",
   data() {
     return {
       username: "",
       password: "",
       errorMessage: "",
       valid: true,
       userNameRuless: [
        value => {
          if (value?.length > 3) return true

          return 'First name must be at least 3 characters.'
        },
      ],
       inputRules: [
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
       const { username } = this;
   
       if (this.$refs.form.validate()) {
         this.$router.replace({ name: "dashboard", params: { username: username } });
        console.log('Login Pass');
       }else{
         console.log('Login Fail');
       }
     },
   },
 };
 </script>