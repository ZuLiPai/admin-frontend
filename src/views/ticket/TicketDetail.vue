<template>
  <div>
    <a-row>
      <a-col>
        <h1>工单标题：{{ title }}</h1>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <h2>用户名：{{ username }}</h2>
      </a-col>
    </a-row>
    <a-row justify="space-between">
      <a-col flex>
        <h2>工单状态：{{ status === true ? '已解决' : '未解决' }}</h2>
      </a-col>
      <a-col flex>
        <a-button danger v-if="status === false" @click="handleClose">
          关闭工单
        </a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <h2>工单信息</h2>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <template v-for="message in messages" v-bind:key="message.id">
          <a-card
            :title="message.isCustomer === true ? '用户' : '客服'"
            style="width: 100%"
          >
            <template #extra>
              <span>{{ message.ticket_message_date }}</span>
            </template>
            <p>
              {{ message.ticket_message }}
            </p>
          </a-card>
        </template>
      </a-col>
    </a-row>
    <div v-if="status === false">
      <a-row>
        <a-col :span="24">
          <a-textarea
            placeholder="在此输入回复工单内容"
            :rows="10"
            show-count="true"
            v-model:value="text"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-button type="primary" style="width: 100%" @click="handleSubmit">
            回复工单
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import {
    closeTicket,
    createTicketMessage,
    getTicketMessage,
  } from '@/api/ticket'
  import { useRoute } from 'vue-router'
  import { message } from 'ant-design-vue'

  export default {
    name: 'TicketDetail',
    setup() {
      const messages = ref()
      const username = ref()
      const status = ref()
      const time = ref()
      const title = ref()
      const route = useRoute()
      const text = ref()
      const ticketId = route.params.ticketId
      onMounted(() => {
        refreshDetail()
      })
      const refreshDetail = () => {
        getTicketMessage(ticketId).then((resp) => {
          title.value = resp.data.ticket_title
          username.value = resp.data.ticket_username
          time.value = resp.data.ticket_time
          messages.value = resp.data.ticket_messages
          status.value = resp.data.ticket_status
        })
      }
      const handleClose = () => {
        closeTicket(ticketId).then(refreshDetail)
        message.success('工单已关闭')
      }
      const handleSubmit = () => {
        console.log(text.value)
        if (text.value === '') {
          message.warn('回复内容不能为空')
          return
        }
        const data = {
          ticket_message: text.value,
          isCustomer: false,
        }
        createTicketMessage(ticketId, data).then(refreshDetail)
      }
      return {
        messages,
        username,
        time,
        title,
        status,
        text,
        handleSubmit,
        handleClose,
        refreshDetail,
      }
    },
  }
</script>

<style scoped></style>
