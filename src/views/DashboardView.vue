<template>
    <v-card>
      <v-layout>
        <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
  
        <v-app-bar
          color="primary"
          prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
          <v-toolbar-title>My files</v-toolbar-title>
  
          <v-spacer></v-spacer>
  
         
          <v-avatar :image="pictureUrl"></v-avatar>
          <v-banner-text class="ma-4">{{ userName }}</v-banner-text>
  
          <div class="text-center">
    <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="white"
          v-bind="props"
        >
        <v-btn icon="mdi-dots-vertical" variant="text" ></v-btn>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in rightItems"
          :key="index"
        >
        <v-btn variant="outlined" color="primary" @click.prevent="logout">
          {{ item.title }}
        </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
        </v-app-bar>
  
        <v-navigation-drawer
          v-model="drawer"
          location="left"
          temporary
        >
          <v-list
            :items="items" 
          ></v-list>
        </v-navigation-drawer>
  
        <v-main style="height: 100vh;">
          
        </v-main>
      </v-layout>
    </v-card>
  </template>

<script>
//import {ref} from 'vue'

export default {
    name: 'DashboardView',
    
    data: () => ({
      drawer: false,
      group: null,
      userName:localStorage.getItem('userName'),
      pictureUrl:localStorage.getItem('pictureUrl'),
      rightItems: [
        { title: 'Logout' },
      ],
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      
      ],
    }),
    methods:{
      logout(){
       this.$store.commit('logout')
      },
      mounted() {
        this.$store.commit('initializeStore')
      },
   
    },
    
    watch: {
      group () {
        this.drawer = false
      },
    },
}
</script>