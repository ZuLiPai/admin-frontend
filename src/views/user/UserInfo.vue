<template>
  <a-card title="用户详情" style="width: 100%">
    <a-row justify="center">
      <avater></avater>
    </a-row>
    <a-row justify="center" style="margin-top: 30px">
      <a-col :span="3"></a-col>
      <a-col :span="6">
        <UserDetail></UserDetail>
      </a-col>
      <a-col :span="3"></a-col>
      <a-col :span="12">
        <UserAddress></UserAddress>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
  import avater from '@/views/user/components/Avater.vue'
  import UserDetail from '@/views/user/components/UserDetail.vue'
  import UserAddress from '@/views/user/components/UserAddress.vue'
  export default {
    name: 'index',
    components: { avater, UserDetail, UserAddress },
  }
</script>

<style scoped></style>
