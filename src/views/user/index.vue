<template>
  <UserTable></UserTable>
</template>

<script>
  import UserTable from '@/views/user/components/UserTable.vue'
  export default {
    components: { UserTable },
    setup() {
      return { UserTable }
    },
  }
</script>

<style scoped></style>
