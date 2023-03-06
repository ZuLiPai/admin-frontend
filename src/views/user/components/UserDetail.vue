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
      <a-input v-model:value="formState.user.name" :disabled="isModifying" />
    </a-form-item>
    <a-form-item
      :name="['user', 'phone']"
      label="手机号"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.user.phone" :disabled="isModifying" />
    </a-form-item>
    <a-form-item
      :name="['user', 'email']"
      label="电子邮箱"
      :rules="[{ required: false }]"
    >
      <a-input v-model:value="formState.user.email" :disabled="isModifying" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit" @click="changeModify">
        修改
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
  import { defineComponent, reactive, ref } from 'vue'

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
      const isModifying = ref(true)
      const changeModify = () => {
        isModifying.value = !isModifying.value
      }
      return {
        formState,
        onFinish,
        layout,
        validateMessages,
        isModifying,
        changeModify,
      }
    },
  })
</script>
