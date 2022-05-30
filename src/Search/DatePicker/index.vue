<template>
  <el-date-picker v-bind="$_attrs" v-on="$listeners"></el-date-picker>
</template>
<script>
import { pickerOptions } from '../constants';
export default {
  name: 'DatePicker',

  data() {
    return {};
  },

  computed: {
    $_attrs() {
      return {
        ...this.$attrs,
        align: 'right',
        type: 'daterange',
        pickerOptions,
        'unlink-panels': true,
        'range-separator': '至',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
        'default-time': ['00:00:00', '23:59:59'],
      };
    },
  },
};
</script>
<style scoped></style>
