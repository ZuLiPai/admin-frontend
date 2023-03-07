<template>
  <div>
    <a-card hoverable>
      <template #cover style="height: 200px">
        <img
          alt="example"
          :height="200"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </template>
      <template #actions>
        <up-outlined />
        <delete-outlined key="delete" />
        <down-outlined />
      </template>
      <a-card-meta title="公告标题"></a-card-meta>
    </a-card>
  </div>
</template>

<script>
  import {
    DeleteOutlined,
    UpOutlined,
    DownOutlined,
  } from '@ant-design/icons-vue'
  export default {
    name: 'BulletinCard',
    components: {
      DeleteOutlined,
      UpOutlined,
      DownOutlined,
    },
  }
</script>

<style scoped>
  .ant-card {
    margin-bottom: 20px;
  }
</style>
