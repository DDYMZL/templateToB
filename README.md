# standard-form

## 项目介绍
配置化表单查询。顾名思义可以通过一些配置化代码生成查询表单，从而直接生成对应的页面。该组件适用于B端系统。

## 配置化
基于elementUI二次封装。目前支持：输入框查询、下拉框查询、时间范围选择器、组合输入框查询、组合数字范围查询

## Attributes
+ configList：JSON数组形式。里面的每个对象可参考下面的配置详解
+ searchData：可通过$refs获取当前查询表单的值
+ flod：是否需要显示折叠按钮

## Events
+ send-data：点击查询或重置按钮触发
+ reset-index：点击查询或重置按钮触发，如若需要重置分页索引，则回调此方法
+ reset：点击重置按钮触发，用于重置事件之后的自定义事件

## 配置详解
### 输入框查询
接收四个参数
+ label：用于显示的表单item名称
+ type：input，固定参数
+ fields：需要绑定的字段名
+ value：v-model需要绑定的值

### 下拉框查询
接收五个参数
+ label：用于显示的表单item名称
+ type：select，固定参数
+ fields：需要绑定的字段名
+ value：v-model需要绑定的值
+ optionList：下拉的选项，依赖label和value两个值

### 时间范围选择器
接收五个参数
+ label：用于显示的表单item名称
+ type：datePicker，固定参数
+ fields：需要绑定的字段名，这里为数组。因为时间范围是两个值
+ value：v-model需要绑定的值
+ valueFormat：格式化规则，参考[element](https://element.eleme.io/#/zh-CN/component/date-picker)

### 组合输入框查询
接收三个参数
+ type：prepend，固定参数
+ value：v-model需要绑定的值
+ optionList：key下拉的选项，依赖label和value两个值

### 组合数字范围查询
接收四个参数
+ type：comboNum，固定参数
+ fields：需要绑定的字段名，这里是对象形式。每一个key对应optionList中的每一个value
+ value：v-model绑定的值。这里为数组
+ optionList：key下拉的选项，依赖label和value两个值
