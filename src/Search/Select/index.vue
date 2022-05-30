<template>
  <el-select v-bind="$_attrs" v-on="$listeners">
    <el-option
      v-for="option in optionList"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: '',

  props: {
    optionList: {
      type: Array,
      require: true,
    },
  },

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
