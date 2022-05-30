<template>
  <section class="combo-num">
    <el-select
      class="combo-num_select"
      v-model="key"
      placeholder="请选择"
      @change="handleChange"
    >
      <el-option
        v-for="item in optionList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <input
      class="combo-num_input"
      v-bind="$attrs"
      v-model="transformValue[0]"
    />
    至
    <input
      class="combo-num_input"
      v-bind="$attrs"
      v-model="transformValue[1]"
    />
  </section>
</template>
<script>
export default {
  name: 'ComboNum',

  props: {
    optionList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      key: '',
    };
  },

  computed: {
    transformValue: {
      get() {
        return this.value;
      },
      set() {
        console.log(123);
        this.$emit('send-value');
      },
    },
  },

  created() {
    this.key = this.optionList[0].value;
    this.$emit('send-key', this.key);
  },

  methods: {
    handleChange(key) {
      this.$emit('send-key', key);
    },
  },
};
</script>
<style scoped>
.combo-num {
  display: inline-block;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.combo-num_select {
  width: 150px;
  border-right: 1px solid #dcdfe6;
}
.combo-num_input {
  width: 120px;
  padding: 0 30px 0 15px;
  color: #606266;
  font-size: 14px;
  line-height: 40px;
  border: none;
  outline: none;
}
.combo-num_select ::v-deep.el-input__inner {
  border: none;
}

.combo-num_input::-webkit-input-placeholder {
  color: #c0c4cc;
}
.combo-num_input::-moz-input-placeholder {
  color: #c0c4cc;
}
.combo-num_input::-ms-input-placeholder {
  color: #c0c4cc;
}
</style>
