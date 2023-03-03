<template>
  <transaction-table status="6" :disabled="true"></transaction-table>
</template>

<script>
  import TransactionTable from '@/views/transaction/components/TransactionTable.vue'

  export default {
    name: 'CompensateTransaction',
    components: { TransactionTable },
  }
</script>

<style scoped></style>
