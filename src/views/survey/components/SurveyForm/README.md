# FormItem组件

## 组件说明

### 使用 provide/inject

组件使用了`provide`和`inject`，[参考](https://cn.vuejs.org/v2/api/#provide-inject)
使用该方式的目的是用于高阶组件间的通信。
通过这种方式可以在`el-form`和`el-form-item`之间封装多层组件。

ps: 在本项目中其实可以不用这样的方式封装，因为每张表都是独立且完整的，没有拆分封装的必要
但依然使用了该方式，便于以后扩展

用法：

在祖先组件中插入如下代码：

```js
export default {
  name: 'xxx',
  // ...
  provide() {
    return {
      provideData: this // 将祖先组件的this注入到子组件当中
    }
  },
  data() {
    return {
      formInfo: []
    }
  }
  // ...
}
```

FormItem组件中：

```js
export default {
  inject: ['provideData'],
}
```

共通过`provideData`就可以获取到祖先组件的相关vue选项或方法,
如：`provideData.formInfo`

## 表单数据格式

[详情格式](../SurveyItem/README.md)
