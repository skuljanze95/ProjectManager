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
        <v-list-item prepend-icon="mdi-home-city"></v-list-item>
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

    <v-main> <slot /></v-main>
  </v-app>
</template>
<script setup lang="ts"></script>
