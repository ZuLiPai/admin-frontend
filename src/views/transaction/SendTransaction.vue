<template>
  <transaction-table status="1" :disabled="true"></transaction-table>
</template>

<script>
  import TransactionTable from '@/views/transaction/components/TransactionTable.vue'

  export default {
    name: 'SendTransaction',
    components: { TransactionTable },
  }
</script>

<style scoped></style>
