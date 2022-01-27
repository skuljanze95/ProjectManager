<template>
  <div class="h-full flex flex-row">
    <div class="h-full w-16 bg-indigo-600">
      <p class="text-white">P</p>
    </div>
    <div class="w-full">
      <div class="w-full h-14 bg-indigo-200">
        <p class="text-white">Top bar</p>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
