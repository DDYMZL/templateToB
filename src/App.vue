<template>
  <div class="text">
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const text = ref<string>('张三');
</script>

<style scoped lang="scss">
.text {
  span {
    color: blue;
  }
}
</style>
