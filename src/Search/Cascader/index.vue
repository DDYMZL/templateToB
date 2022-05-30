<template>
  <el-cascader
    :options="optionList"
    v-model="$_value"
    v-bind="$_attrs"
    @change="handleChange"
  >
  </el-cascader>
</template>
<script>
export default {
  name: 'Cascader',

  props: {
    optionList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {};
  },

  computed: {
    $_attrs() {
      return {
        clearable: true,
        filterable: true,
        ...this.$attrs,
      };
    },
    $_value: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('send-cascader-value', val);
      },
    },
  },

  methods: {
    handleChange() {},
  },
};
</script>
<style lang="scss" scoped></style>
