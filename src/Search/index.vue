<template>
  <el-form :inline="true" @submit.native.prevent>
    <slot name="prepend" />
    <el-form-item v-for="item in config" :key="item.model" :label="item.label">
      <Input
        v-if="item.type === FORM_ITEM.input"
        v-model.trim="item.value"
        clearable
        :placeholder="item.placeholder || '请输入'"
        @keyup.enter.native="handleQuery"
        @change="(val) => handleChange(val, item)"
      />
      <Select
        v-else-if="item.type === FORM_ITEM.select"
        v-model="item.value"
        :placeholder="item.placeholder || '请选择'"
        :option-list="item.optionList || []"
        clearable
        filterable
        @change="(val) => handleChange(val, item)"
      />
      <DatePicker
        v-else-if="item.type === FORM_ITEM.datePicker"
        v-model="item.value"
        clearable
        :value-format="item.valueFormat || null"
        :picker-options="item.pickerOptions"
        @change="(val) => handleChange(val, item)"
      />
      <PrependInput
        v-else-if="item.type === FORM_ITEM.prepend"
        v-model.trim="item.value"
        clearable
        :placeholder="item.placeholder || '请输入'"
        :option-list="item.optionList"
        :prepend-width="item.prependWidth"
        @keyup.enter.native="handleQuery"
        @getSelectField="getSelectField"
        @change="(val) => handleChange(val, item)"
      />
      <ComboNum
        v-else-if="item.type === FORM_ITEM.comboNum"
        :value="item.value"
        :placeholder="item.placeholder || '请输入'"
        :option-list="item.optionList"
        @send-key="handleGetKey"
        @send-value="(value) => handleGetValue(value, item)"
        @keyup.enter.native="handleQuery"
      />
      <Cascader
        v-else-if="item.type === FORM_ITEM.cascader"
        v-model="item.value"
        :placeholder="item.placeholder || '请输入'"
        :option-list="item.optionList"
        :props="item.props"
        :showAllLevels="item.showAllLevels"
        @send-cascader-value="(val) => getCascaderValue(val, item)"
      />
    </el-form-item>
    <slot name="append" />
    <el-form-item>
      <el-button size="mini" type="primary" @click="handleQuery"
        >查询</el-button
      >
      <el-button size="mini" type="primary" plain @click="handleReset"
        >重置</el-button
      >
      <el-button
        v-if="flod && config.length > 1"
        size="mini"
        type="primary"
        plain
        @click="toggleFlod"
        >{{ flodFlag ? '折叠' : '展开' }}</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { FORM_ITEM, EXCLUDE_VALUE } from './constants';
import Input from './Input';
import Select from './Select';
import DatePicker from './DatePicker';
import PrependInput from './PrependInput';
import ComboNum from './ComboNum';
import Cascader from './Cascader';

export default {
  name: 'StdSearch',

  components: {
    Input,
    Select,
    ComboNum,
    Cascader,
    DatePicker,
    PrependInput,
  },

  props: {
    configList: {
      require: true,
      type: Array,
    },
    flod: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    return {
      searchData: {},
      comboNumKey: '',
      prependField: '',
      flodFlag: false,

      FORM_ITEM,
    };
  },

  computed: {
    config() {
      if (this.flod) {
        return this.flodFlag ? this.configList : this.configList.slice(0, 1);
      } else {
        return this.configList;
      }
    },
  },

  destroyed() {
    this.resetData();
  },

  methods: {
    handleQuery() {
      this.searchData = {};
      this.config.forEach(({ value, fields, type }) => {
        let key;
        let key1;
        switch (type) {
          // 对数字组合查询特殊处理
          case FORM_ITEM.comboNum:
            key = fields[this.comboNumKey][0];
            key1 = fields[this.comboNumKey][1];

            this.searchData[key] = EXCLUDE_VALUE.includes(value[0])
              ? undefined
              : value[0];
            this.searchData[key1] = EXCLUDE_VALUE.includes(value[1])
              ? undefined
              : value[1];
            break;
          // 对组合查询特殊处理
          case FORM_ITEM.prepend:
            this.searchData[this.prependField] = EXCLUDE_VALUE.includes(value)
              ? undefined
              : value;
            break;
          // 日期组件特殊处理参数
          case FORM_ITEM.datePicker:
            this.setData(this.searchData, value, fields);
            break;
          // 级联选择器特殊处理参数
          case FORM_ITEM.cascader:
            this.setData(this.searchData, value, fields);
            this.searchData[fields] = EXCLUDE_VALUE.includes(value)
              ? undefined
              : value[0];
            break;

          default:
            this.searchData[fields] = EXCLUDE_VALUE.includes(value)
              ? undefined
              : value;
            break;
        }
      });
      // 重置分页
      this.$emit('reset-index');
      // 查询数据接口
      this.$emit('send-data');
    },

    handleReset() {
      this.resetData();
      // 重置分页
      this.$emit('reset-index');
      // 重置事件 当使用插槽的时候，点击重置，清空插槽的数据
      this.$emit('reset');
      // 查询数据接口
      this.$emit('send-data');
    },

    resetData() {
      this.searchData = {};
      this.config.forEach((item) => {
        if (item.type === FORM_ITEM.comboNum) {
          item.value = [undefined, undefined];
        } else {
          item.value = '';
        }
      });
    },

    // 这里只对清空的情况进行处理
    handleChange(val, item) {
      if (!EXCLUDE_VALUE.includes(val)) return;
      switch (item.type) {
        case FORM_ITEM.datePicker:
          this.setData(this.searchData, [undefined, undefined], item.fields);
          break;

        default:
          this.setData(this.searchData, undefined, item.fields);
          break;
      }
    },

    getSearchData() {
      this.config.forEach(({ value, fields, type }) => {
        // 对组合查询特殊处理
        if (type === FORM_ITEM.prepend) {
          this.searchData[this.prependField] = EXCLUDE_VALUE.includes(value)
            ? undefined
            : value;
          return;
        }
        if (!fields) {
          console.error('搜索组件配置项"field"字段异常');
          return;
        }
        // 数据为空时兜底
        if (EXCLUDE_VALUE.includes(value)) return;
        // 日期组件特殊处理参数
        if (type === FORM_ITEM.datePicker) {
          return this.setData(this.searchData, value, fields);
        }
        this.searchData[fields] = value;
      });
    },

    handleGetKey(comboNumKey) {
      const comboConfig = this.config.find(
        ({ type }) => type === FORM_ITEM.comboNum
      );
      if (!comboConfig) return;
      const fields = comboConfig.fields;
      if (this.comboNumKey) {
        let key = fields[this.comboNumKey][0];
        let key1 = fields[this.comboNumKey][1];
        key && delete this.searchData[key];
        key1 && delete this.searchData[key1];
      }
      this.comboNumKey = comboNumKey;
    },

    handleGetValue(value, item) {
      item.value = value;
    },

    getCascaderValue(val, item) {
      item.value = [val];
    },

    // 组合查询 获取下拉的key
    getSelectField(field) {
      // 每次切换，判断只有是否存在
      this.prependField && delete this.searchData[this.prependField];
      this.prependField = field;
    },

    setData(data, value, fields) {
      // 兼容日期格式 需要返回两个字段业务场景
      if (Array.isArray(fields) && fields.length > 0) {
        if (value) {
          data[fields[0]] = value[0];
          data[fields[1]] = value[1];
        } else {
          data[fields[0]] = undefined;
          data[fields[1]] = undefined;
        }
      } else {
        data[fields] = value;
      }
    },

    toggleFlod() {
      if (!this.flod) return;
      this.flodFlag = !this.flodFlag;
    },
  },
};
</script>
<style scoped></style>
