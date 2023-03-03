<template>
  <a-form
    :model="formState"
    v-bind="layout"
    name="nest-messages"
    :validate-messages="validateMessages"
    @finish="onFinish"
  >
    <a-form-item
      :name="['user', 'username']"
      label="用户名"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.user.name" />
    </a-form-item>
    <a-form-item
      :name="['user', 'phone']"
      label="手机号"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.user.phone" />
    </a-form-item>
    <a-form-item
      :name="['user', 'email']"
      label="电子邮箱"
      :rules="[{ required: false }]"
    >
      <a-input v-model:value="formState.user.email" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
  import { defineComponent, reactive } from 'vue'
  export default defineComponent({
    setup() {
      const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      }
      const validateMessages = {
        required: '${label} 未填入!',
        types: {
          phone: '${label} 不是一个有效的手机号码!',
          email: '${label} 不是一个有效的电子邮箱',
        },
        number: {
          range: '${label} 必须在 ${min} 和 ${max}',
        },
      }
      const formState = reactive({
        user: {
          username: '',
          phone: '',
          email: '',
        },
      })
      const onFinish = (values) => {
        console.log('Success:', values)
      }
      return {
        formState,
        onFinish,
        layout,
        validateMessages,
      }
    },
  })
</script>
