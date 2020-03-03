# 格式

```js
survey: {
  id: '',
  title: '',
  content: '',
  questions: [
    {
      id: '题目id',
      title: '标题内容',
      tip: '题目相关的提示',
      type: '题目的类型，包括单选，多选，填空',
      attrs: {
        required: '是否必填',
        // column: 'Number, 选项布局',
        // radio
        // checkbox
        min: '',
        max: '',
        // input
        input_type: '',
        char_count: '',
        append: 'String',
        placeholder: '提示内容'
      },
      options: [
        {
          id: '选项id',
          label: 'String, 选项内容',
          has_open: 'Boolean, 选项是否包含开放属性',
          exclusive: 'Boolean, 选项排他'
        }
      ]
    }
  ]
}
```
