<template>
  <a-form
    :model="formState"
    v-bind="layout"
    name="nest-messages"
    :validate-messages="validateMessages"
    @finish="onFinish"
  >
    <a-form-item
      :name="['username']"
      label="用户名"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.username" :disabled="isModifying" />
    </a-form-item>
    <a-form-item
      :name="['phone']"
      label="手机号"
      :rules="[{ required: true, pattern: '^1[0-9]{10}$' }]"
    >
      <a-input v-model:value="formState.phone" :disabled="isModifying" />
    </a-form-item>
    <a-form-item
      :name="['email']"
      label="电子邮箱"
      :rules="[
        {
          required: false,
          pattern: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
        },
      ]"
    >
      <a-input v-model:value="formState.email" :disabled="isModifying" />
    </a-form-item>
    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit" @click="changeModify">
        修改
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import { getUser, updateUser } from '@/api/manage_user'
  import { message } from 'ant-design-vue'

  export default defineComponent({
    components: {},
    props: {
      id: Number,
    },
    setup(props) {
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
        username: '',
        phone: '',
        email: '',
      })
      onMounted(() => {
        if (props.id) {
          getUser(props.id).then((resp) => {
            formState.username = resp.data.username
            formState.phone = resp.data.phone
            formState.email = resp.data.email
          })
        }
      })
      const onFinish = () => {
        if (!isModifying.value) {
          return
        }
        const data = {
          username: formState.username,
          phone: formState.phone,
          email: formState.email,
        }
        updateUser(props.id, data).then(() => {
          message.success('修改用户信息成功')
        })
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
