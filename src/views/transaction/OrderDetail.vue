<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12">
        <h1>订单详细信息</h1>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <h2 style="margin-bottom: 40px">
          用户昵称：永雏塔菲
          <a><u>查看用户信息</u></a>
        </h2>
        <h2 style="margin-bottom: 40px">
          商品名称：Sony A7m3
          <a><u>查看商品详情</u></a>
        </h2>
        <h3>订单创建时间 2023-03-06 17:33:27</h3>
        <p style="color: #999999">租赁预计开始时间 2023-03-08</p>
        <p style="color: #999999">租赁实际开始时间</p>
        <p style="color: #999999">租赁预计结束时间 2023-03-13</p>
        <p style="color: #999999">租赁实际结束时间</p>
        <h3 style="margin-bottom: 40px">订单结束时间</h3>
        <a-row>
          <a-col :xs="24">
            <h2 style="margin-bottom: 10px">用户评价</h2>
            <a-card title="吉米Green" style="width: 80%">
              <template #extra>
                <a href="#">佳能 Canon 5D Mark IV</a>
              </template>
              <a-rate v-model:value="rating" allow-half disabled></a-rate>
              <p>
                随附的电池续航有点差，一次飞了20分钟就返航了，有些不太尽兴。不过飞机还算比较新
              </p>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="12">
        <h2 style="margin-bottom: 40px">当前状态</h2>
        <a-steps direction="vertical" :current="5">
          <a-step title="已付款，等待发货" description="点击此处以发货" />
          <a-step title="已发货，物流中" description="运单号 SF13800138000" />
          <a-step title="租赁中" description="用户正在使用" />
          <a-step title="待归还" description="等待用户寄回" />
          <a-step title="商品归还中" description="运单号 SF13800138001" />
          <a-step title="验机中" description="点击此处以确认商品状态" />
          <a-step title="订单完成" description="" />
        </a-steps>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'OrderDetail',
    setup() {},
    data() {
      return {
        itemName: '佳能 Canon 5D Mark IV',
        username: '吉米Green',
        rating: 4.5,
        comment:
          '随附的电池续航有点差，一次飞了20分钟就返航了，有些不太尽兴。不过飞机还算比较新',
      }
    },
  })
</script>

<style scoped></style>
