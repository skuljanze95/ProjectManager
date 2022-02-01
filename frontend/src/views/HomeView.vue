<template>
  <v-container class="home">
    <h1>HOME</h1>
    <button @click="handleClick">Test api</button>
  </v-container>
</template>

<script setup lang="ts">
import api from '@/services/api';

const handleClick = () => {
  api.post('/project/createProject', {}).then((response: any) => {
    if (response.data) {
      console.log(response.data);
    } else console.log(response.data);
  });
};
</script>
