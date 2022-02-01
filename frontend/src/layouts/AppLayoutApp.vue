<template>
  <v-app>
    <v-navigation-drawer app rail permanent>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
      >
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact">
        <v-list-item
          @click="projectDrawer = !projectDrawer"
          prepend-icon="mdi-home-city"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-account"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group-outline"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="#fcb69f"
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#scrolling-techniques-2"
    >
    </v-app-bar>
    <v-navigation-drawer app v-model="projectDrawer">
      <v-list density="compact">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Home"
          value="home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-forum"
          title="About"
          value="about"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main> <slot /></v-main>
  </v-app>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const projectDrawer = ref(false);
</script>
