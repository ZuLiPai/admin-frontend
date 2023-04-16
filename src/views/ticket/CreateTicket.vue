<template>
  <div>
    <h1>创建工单</h1>
    <div>
      <a-row>
        <a-col span="24">
          <a-form :model="formState" name="basic">
            <a-form-item
              :rules="[{ required: true, message: '请选择工单用户!' }]"
              label="用户"
              name="ticket_user"
            >
              <a-select
                v-model:value="formState.ticket_user"
                show-search
                placeholder="选择发起工单的用户"
                style="width: 200px"
                :options="option"
                :filter-option="filterOption"
                @change="handleChange"
              ></a-select>
            </a-form-item>
            <a-form-item
              label="标题"
              name="ticket_title"
              :rules="[{ required: true, message: '请输入工单标题' }]"
            >
              <a-input v-model:value="formState.ticket_title" />
            </a-form-item>
            <a-form-item
              name="ticket_message"
              label="内容"
              :rules="[{ required: true, message: '请填写工单内容!' }]"
            >
              <a-textarea
                v-model:value="formState.ticket_message"
                :auto-size="{ minRows: 5, maxRows: 10 }"
              />
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                size="large"
                html-type="submit"
                style="width: 100%"
                @click="handleSubmit"
              >
                提交
              </a-button>
              <a-modal
                v-model:visible="modalVisible"
                title="创建工单"
                @ok="handleModalOk"
              >
                <p>工单创建成功</p>
              </a-modal>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import { getUsers } from '@/api/manage_user'
  import { createTicket } from '@/api/ticket'
  import router from '@/router'

  export default {
    name: 'CreateTicket',
    setup() {
      const data = ref()
      const option = ref([])
      const formState = reactive({
        ticket_user: '',
        ticket_title: '',
        ticket_message: '',
        isCustomer: false,
      })
      const modalVisible = ref(false)
      onMounted(() => {
        refresh()
      })
      const refresh = () => {
        getUsers().then((resp) => {
          data.value = resp.data
          data.value.forEach((user) => {
            option.value.push({
              value: user.id,
              label: user.username,
            })
          })
          console.log('This is userList:')
          console.log(option.value)
        })
      }

      const filterOption = (input, option) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }

      const handleChange = (name) => {
        formState.username = name
        console.log(formState.username)
      }
      const handleSubmit = () => {
        createTicket(formState).then((modalVisible.value = true))
      }
      const handleModalOk = () => {
        modalVisible.value = false
        router.push({ name: 'Ticket' })
      }
      return {
        option,
        formState,
        modalVisible,
        handleModalOk,
        filterOption,
        handleChange,
        handleSubmit,
        defineComponent,
      }
    },
  }
</script>

<style scoped></style>
