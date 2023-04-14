<template>
  <a-row justify="center">
    <Avatar :id="id"></Avatar>
  </a-row>
  <a-row justify="center" style="margin-top: 30px">
    <a-col :span="12">
      <UserDetail :id="id"></UserDetail>
    </a-col>
    <a-col :span="12">
      <UserAddress :id="id"></UserAddress>
    </a-col>
  </a-row>
</template>

<script>
  import Avatar from '@/views/user/components/Avatar.vue'
  import UserDetail from '@/views/user/components/UserDetail.vue'
  import UserAddress from '@/views/user/components/UserAddress.vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'UserInfo',
    components: { Avatar, UserDetail, UserAddress },
    props: { id: Number },
    setup() {
      return {}
    },
  })
</script>

<style scoped></style>
