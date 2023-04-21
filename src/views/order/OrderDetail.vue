<template>
  <div>
    <a-page-header title="订单详细信息" @back="this.$router.back()" />
    <a-row>
      <a-col :span="12">
        <h2>
          用户：
          <a>{{ order_data.user_name }}</a>
        </h2>
        <h2>
          商品：
          <a>{{ order_data.item_name }}</a>
        </h2>
        <h3>订单创建时间: {{ order_data.create_time }}</h3>
        <p>租赁预计开始时间: {{ order_data.expect_start_time }}</p>
        <p>租赁实际开始时间: {{ order_data.actual_start_time || '' }}</p>
        <p>租赁预计结束时间: {{ order_data.expect_end_time }}</p>
        <p>租赁实际结束时间: {{ order_data.actual_end_time || '' }}</p>
        <h3>订单结束时间: {{ order_data.order_end_time }}</h3>
        <a-row>
          <a-col :xs="24">
            <h2 style="margin-bottom: 20px">用户评价</h2>
            <a-card
              :title="comments.comment_username"
              style="width: 80%"
              v-if="order_data.is_commented"
            >
              <template #extra>
                <a>商品:{{ comments.item_name }}</a>
              </template>
              <a-rate v-model:value="comments.rating" disabled></a-rate>
              <p>
                {{ comments.content }}
              </p>
            </a-card>
            <a-empty
              v-else
              style="width: 80%"
              description="用户还未评价"
            ></a-empty>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <h2 style="margin-bottom: 40px">当前状态</h2>
        <a-steps direction="vertical" :current="status">
          <a-step title="已付款，等待发货" description="点击此处以发货" />
          <a-step title="已发货，物流中" description="运单号 SF13800138000" />
          <a-step title="租赁中" description="用户正在使用" />
          <a-step title="商品归还中" :description="order_data.create_time" />
          <a-step title="验机中" description="点击此处以确认商品状态" />
          <a-step title="赔偿中" description="" />
          <a-step title="订单完成" description="" />
          <a-step title="已取消" description="" />
        </a-steps>
      </a-col>
      <a-col :span="6">
        <h2>修改订单状态</h2>
        <a-select
          style="width: 100%"
          v-model:value="selectStatus"
          :placeholder="statusText(order_data.status)"
        >
          <a-select-option value="0">已付款，等待发货</a-select-option>
          <a-select-option value="1">已发货，物流中</a-select-option>
          <a-select-option value="2">租赁中</a-select-option>
          <a-select-option value="3">商品归还中</a-select-option>
          <a-select-option value="4">验机中</a-select-option>
          <a-select-option value="5">赔偿中</a-select-option>
          <a-select-option value="6">订单完成</a-select-option>
          <a-select-option value="7">已取消</a-select-option>
        </a-select>
        <a-button
          type="primary"
          @click="handleChangeStatus(order_data.id)"
          style="margin-top: 10px"
          block
        >
          确认修改
        </a-button>
        <a-button
          type="ghost"
          @click="
            this.$router.push({
              name: 'CreateTicket',
              params: { userId: order_data.user },
            })
          "
          style="margin-top: 20px"
          danger
          block
        >
          发起工单
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { getOrderComments, getOrderDetail, updateOrder } from '@/api/order'
  import { message } from 'ant-design-vue'
  import router from '@/router'
  const statusText = (id) => {
    switch (id) {
      case 0:
        return '已付款，等待发货'
      case 1:
        return '已发货，物流中'
      case 2:
        return '租赁中'
      case 3:
        return '商品归还中'
      case 4:
        return '验机中'
      case 5:
        return '赔偿中'
      case 6:
        return '订单完成'
      case 7:
        return '已取消'
    }
  }
  export default defineComponent({
    name: 'OrderDetail',
    setup() {
      const order_data = ref({})
      const route = useRoute()
      const order_id = route.params.id
      const status = ref()
      const comments = ref({})
      const selectStatus = ref(undefined)
      onMounted(() => {
        refreshPage(order_id)
        refreshComment(order_id)
      })
      const refreshPage = (order_id) => {
        getOrderDetail(order_id).then((resp) => {
          console.log(resp.data)
          order_data.value = resp.data
          status.value = resp.data.status
        })
      }
      const refreshComment = (order_id) => {
        getOrderComments(order_id).then((resp) => {
          comments.value = resp.data
        })
        console.log(comments)
      }
      const handleChangeStatus = (id) => {
        if (selectStatus.value === undefined) {
          message.error(`请选择订单状态`)
          return
        }
        const data = {
          id: order_data.value.id,
          status: selectStatus.value,
          expect_end_time: order_data.value.expect_end_time,
          expect_start_time: order_data.value.expect_start_time,
        }
        updateOrder(id, data).then(() => {
          message.success(`订单状态修改成功`)
          router.go(-1)
        })
      }
      return {
        order_id,
        order_data,
        status,
        selectStatus,
        comments,
        statusText,
        handleChangeStatus,
      }
    },
  })
</script>

<style scoped></style>
