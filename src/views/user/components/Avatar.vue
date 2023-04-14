<template>
  <a-avatar :size="64" :src="avatarUrl">
    <template #icon><UserOutlined /></template>
  </a-avatar>
</template>
<script>
  import { UserOutlined } from '@ant-design/icons-vue'
  import { defineComponent, onMounted, ref } from 'vue'
  import { getAvatar } from '@/api/manage_user'

  const avatarUrl = ref('')
  export default defineComponent({
    name: 'Avatar',
    components: {
      UserOutlined,
    },
    props: {
      id: Number,
    },
    setup(props) {
      onMounted(() => {
        getAvatar(props.id).then((resp) => {
          avatarUrl.value = resp.data.url
        })
      })
      return { avatarUrl }
    },
  })
</script>
