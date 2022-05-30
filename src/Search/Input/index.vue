<template>
  <el-input v-bind="$_attrs" v-on="$listeners"></el-input>
</template>
<script>
export default {
  name: 'Input',

  computed: {
    $_attrs() {
      return {
        ...this.$attrs,
      };
    },
  },
};
</script>
<style scoped></style>
