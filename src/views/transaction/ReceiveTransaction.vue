<template>
  <transaction-table status="4" :disabled="true"></transaction-table>
</template>

<script>
  import TransactionTable from '@/views/transaction/components/TransactionTable.vue'

  export default {
    name: 'ReceiveTransaction',
    components: { TransactionTable },
  }
</script>

<style scoped></style>
