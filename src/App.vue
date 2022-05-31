<template>
  <div class="">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const text = ref<string>('张三');
</script>

<style scoped></style>
