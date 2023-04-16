<template>
  <OrderTable
    ref="tableRef"
    status="0"
    :disabled="false"
    :tableData="tableData"
  ></OrderTable>
</template>

<script>
  import OrderTable from '@/views/order/components/OrderTable.vue'
  import { onMounted, ref } from 'vue'
  import { getOrderList } from '@/api/order'

  const tableData = ref(null)
  const tableRef = ref(null)
  export default {
    name: 'AllOrder',
    components: {
      OrderTable,
    },
    setup() {
      onMounted(() => {
        getOrderList().then((resp) => {
          tableRef.value.loadData(resp.data)
        })
      })
      return {
        tableData,
        tableRef,
      }
    },
  }
</script>

<style scoped lang="less">
  .table-search {
    .ant-form-inline {
      .ant-form-item {
        display: flex;
        margin-right: 0;
        margin-bottom: 24px;

        .ant-form-item-control-wrapper {
          flex: 1 1;
          display: inline-block;
          vertical-align: middle;
        }

        > .ant-form-item-label {
          width: auto;
          padding-right: 8px;
          line-height: 32px;
        }

        .ant-form-item-control {
          height: 32px;
          line-height: 32px;
        }
      }
    }

    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
  }
</style>
