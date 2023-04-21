<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12">
        <h1>订单详细信息</h1>
      </a-col>
    </a-row>
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
              title="吉米Green"
              style="width: 80%"
              v-if="order_data.is_commented"
            >
              <template #extra>
                <a href="#">佳能 Canon 5D Mark IV</a>
              </template>
              <a-rate v-model:value="rating" allow-half disabled></a-rate>
              <p>
                随附的电池续航有点差，一次飞了20分钟就返航了，有些不太尽兴。不过飞机还算比较新
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
        <a-steps direction="vertical" :current="order_data.status">
          <a-step title="已付款，等待发货" description="点击此处以发货" />
          <a-step title="已发货，物流中" description="运单号 SF13800138000" />
          <a-step title="租赁中" description="用户正在使用" />
          <a-step
            title="商品归还中"
            :description="'aaa' + order_data.create_time"
          />
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
          v-model:value="v"
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
        <a-button type="primary" style="margin-top: 10px" block>
          确认修改
        </a-button>
        <a-button type="ghost" style="margin-top: 20px" danger block>
          发起工单
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { getOrderDetail } from '@/api/order'
  const order_data = ref({})
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
      const route = useRoute()
      const order_id = route.params.id
      onMounted(() => {
        getOrderDetail(order_id).then((resp) => {
          console.log(resp.data)
          order_data.value = resp.data
        })
      })
      return { order_id, order_data, statusText }
    },
  })
</script>

<style scoped></style>
