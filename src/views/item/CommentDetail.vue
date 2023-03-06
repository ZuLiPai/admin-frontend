<template>
  <div>
    <a>查看</a>
  </div>
</template>
<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'CommentDetail',
    setup() {
      const visible = ref(false)
      const showModal = () => {
        visible.value = true
      }
      const handleOk = (e) => {
        console.log(e)
        visible.value = false
      }
      return {
        visible,
        showModal,
        handleOk,
      }
    },
  })
</script>

<style scoped></style>
