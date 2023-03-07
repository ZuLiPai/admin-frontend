<template>
  <div>
    <a-row>
      <a-col>
        <h1>工单标题：{{ title }}</h1>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <h2>用户：{{ username }}</h2>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-card title="用户：有问题" style="width: 100%">
          <template #extra><a href="#">回复</a></template>
          <p>
            有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题有问题
          </p>
        </a-card>
        <a-card title="客服：没事儿" style="width: 100%">
          <template #extra>{{ time }}</template>
          <p>
            没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿没事儿
          </p>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-textarea placeholder="回复工单" :rows="10" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-button type="primary" style="width: 100%">回复工单</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'TicketDetail',
    data() {
      return {
        title: '相机有磕碰',
        username: '张三',
        time: new Date(),
      }
    },
  }
</script>

<style scoped>
  .ant-card {
    margin-bottom: 10px;
  }
  .ant-row {
    margin-bottom: 10px;
  }
</style>
