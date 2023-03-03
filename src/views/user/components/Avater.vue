<template>
  <a-avatar :size="64">
    <template #icon><UserOutlined /></template>
  </a-avatar>
</template>
<script>
  import { UserOutlined } from '@ant-design/icons-vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    components: {
      UserOutlined,
    },
  })
</script>
