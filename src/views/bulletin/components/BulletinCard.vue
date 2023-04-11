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
        <delete-outlined key="delete" @click="handleDelete(props.id)" />
        <down-outlined />
      </template>
      <a-card-meta :title="props.title"></a-card-meta>
    </a-card>
  </div>
</template>

<script>
  import {
    DeleteOutlined,
    UpOutlined,
    DownOutlined,
  } from '@ant-design/icons-vue'
  import { Modal } from 'ant-design-vue'
  import { deleteBulletin } from '@/api/bulletin'
  export default {
    name: 'BulletinCard',
    components: {
      DeleteOutlined,
      UpOutlined,
      DownOutlined,
    },
    props: {
      id: Number,
      title: String,
      content: String,
      image: String,
    },
    setup(props) {
      const handleDelete = (id) => {
        console.log(id)
        Modal.confirm({
          title: '确定删除此公告吗？',
          onOk: () => {
            deleteBulletin(id).then(() => {
              document.location.reload()
            })
          },
        })
      }
      return { props, handleDelete }
    },
  }
</script>

<style scoped>
  .ant-card {
    margin-bottom: 20px;
  }
</style>
