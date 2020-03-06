export default {
  title: '问卷标题',
  content: '',
  suffix: '您已完成本次问卷，感谢您的帮助与支持',
  questions: [
    {
      id: 'hImeAEuH',
      title: '单选题标题',
      type: 1,
      required: true,
      options: [
        {
          id: 'AtJK6hlCC',
          label: '选项1',
          has_open: false
        },
        {
          id: 'Pu9SjgE8m',
          label: '选项2',
          has_open: false
        }
      ]
    },
    {
      id: 'ceNBfmul',
      title: '多选题标题',
      type: 2,
      required: true,
      column: 3,
      min: 2,
      max: 3,
      options: [
        {
          id: 'Qhd24vCg4',
          label: '选项1',
          has_open: false
        },
        {
          id: '9IcmVi2G1',
          label: '选项2',
          has_open: false
        },
        {
          id: 'Qhd24vCg3',
          label: '选项1',
          has_open: false
        },
        {
          id: '9IcmVi2GR',
          label: '选项2',
          has_open: false
        }
      ]
    },
    {
      id: 'sFhIr4vs',
      title: '填空题标题',
      placeholder: '提示内容',
      type: 3,
      required: true,
      nativetype: 'text',
      minlength: 2,
      maxlength: 11
    },
    {
      id: 'sFhIr4va',
      title: '填空题标题',
      placeholder: '提示内容',
      type: 3,
      required: true,
      nativetype: 'number',
      minlength: 2,
      maxlength: 11
    },
    {
      id: '7qr8jTGs',
      title: '多选题标题',
      type: 2,
      required: true,
      options: [
        {
          id: 'KgNiMB2GD',
          label: '选项1',
          has_open: false
        },
        {
          id: 'K8vnajGoQ',
          label: '选项2',
          has_open: false
        }
      ]
    },
    {
      id: 'XKZiP97MP',
      title: '单选题标题',
      type: 1,
      required: true,
      options: [
        {
          id: 'ZDRfnIu2e',
          label: '选项1',
          has_open: false
        },
        {
          id: 'gyefKr_XP',
          label: '选项2',
          has_open: false
        }
      ]
    }
  ]
}
