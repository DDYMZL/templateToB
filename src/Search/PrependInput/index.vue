<template>
  <el-form-item>
    <el-input v-bind="$_attrs" v-on="$listeners">
      <el-select slot="prepend" v-model="type" :style="{ width: prependWidth }">
        <el-option
          v-for="item of optionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-input>
  </el-form-item>
</template>
<script>
export default {
  name: 'PrependInput',

  props: {
    optionList: {
      type: Array,
      require: true,
    },

    prependWidth: { type: String, default: '120px' },
  },

  data() {
    return {
      type: undefined,
    };
  },

  computed: {
    $_attrs() {
      return {
        ...this.$attrs,
      };
    },
  },

  watch: {
    type(val) {
      this.$emit('getSelectField', val);
    },
  },

  created() {
    this.type = this.optionList[0].value;
  },
};
</script>
