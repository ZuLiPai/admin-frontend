<template>
  <div>
    <a-card hoverable>
      <template #cover style="height: 200px">
        <img
          alt="bulletin"
          :height="200"
          :src="imageUrl"
          id="img"
          style="object-fit: contain"
        />
      </template>
      <template #actions>
        <delete-outlined key="delete" @click="handleDelete(props.id)" />
        <swap-outlined @click="handleShow(props.id)" />
      </template>
      <a-card-meta :title="props.title"></a-card-meta>
      公告可见状态：{{ statusWord(props.status) }}
    </a-card>
  </div>
</template>

<script>
  import { DeleteOutlined, SwapOutlined } from '@ant-design/icons-vue'
  import { Modal } from 'ant-design-vue'
  import { deleteBulletin, switchBulletin } from '@/api/bulletin'
  import { defineComponent, onMounted, ref } from 'vue'
  import { getImage } from '@/api/image'
  // eslint-disable-next-line no-unused-vars
  import { decode } from 'blurhash'

  export default defineComponent({
    name: 'BulletinCard',
    components: {
      DeleteOutlined,
      SwapOutlined,
    },
    props: {
      id: Number,
      title: String,
      content: String,
      image: Number,
      status: Boolean,
    },
    setup(props, context) {
      const imageUrl = ref()
      onMounted(() => {
        if (props.image) {
          getImage(props.image).then((resp) => {
            imageUrl.value = resp.data.url
          })
        }
      })
      const statusWord = (status) => {
        return status === true ? '可见' : '不可见'
      }
      const handleDelete = (id) => {
        Modal.confirm({
          title: '确定删除此公告吗？',
          onOk: () => {
            deleteBulletin(id).then(() => {
              context.emit('refresh')
            })
          },
        })
      }
      const handleShow = (id) => {
        switchBulletin(id).then(() => {
          context.emit('refresh')
        })
      }
      return { props, imageUrl, handleDelete, handleShow, statusWord }
    },
  })
</script>

<style scoped>
  .ant-card {
    margin-bottom: 20px;
  }
</style>
