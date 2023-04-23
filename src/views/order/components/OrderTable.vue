<template>
  <div>
    <a-row>
      <a-col :span="12">
        <h1>订单管理</h1>
      </a-col>
    </a-row>
    <div class="table-search">
      <a-form>
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="订单编号">
              <a-input placeholder="" v-model:value="queryId" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="订单状态">
              <a-select
                placeholder="请选择"
                :default-value="props.status"
                :disabled="props.disabled"
                v-model:value="queryStat"
              >
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="0">已下单</a-select-option>
                <a-select-option value="1">物流中</a-select-option>
                <a-select-option value="2">租赁中</a-select-option>
                <a-select-option value="3">发回物流中</a-select-option>
                <a-select-option value="4">验机中</a-select-option>
                <a-select-option value="5">赔偿中</a-select-option>
                <a-select-option value="6">已完成</a-select-option>
                <a-select-option value="7">已取消</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户昵称">
              <a-input style="width: 100%" v-model:value="queryName" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="租赁产品">
              <a-input style="width: 100%" v-model:value="queryItem" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="submitQuery">查询</a-button>
              <a-button style="margin-left: 12px" @click="resetQuery">
                重置
              </a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-content">
      <a-table :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'id'">
            <span>订单编号</span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-if="column.key === 'status'">
            <a-badge
              :status="statusBadge(record.status)"
              :text="statusText(record.status)"
            />
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a
                @click="
                  this.$router.push({
                    name: 'OrderDetail',
                    params: { id: record.id },
                  })
                "
              >
                查看
              </a>
              <a-divider type="vertical" />
              <a
                @click="
                  this.$router.push({
                    name: 'CreateTicket',
                    params: { userId: record.user },
                  })
                "
              >
                工单
              </a>
            </span>
          </template>
          <template v-else-if="column.key === 'id'">
            <a
              @click="
                this.$router.push({
                  name: 'OrderDetail',
                  params: { id: record.id },
                })
              "
            >
              {{ record.id }}
            </a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { getOrderList } from '@/api/order'
  // import { UpOutlined, DownOutlined } from '@ant-design/icons-vue'

  const statusBadge = (id) => {
    if (id === 1 || id === 2 || id === 3 || id === 4) {
      return 'processing'
    } else if (id === 0 || id === 6) {
      return 'success'
    } else if (id === 7) {
      return 'error'
    } else if (id === 5) {
      return 'warning'
    }
  }
  const statusText = (id) => {
    switch (id) {
      case 0:
        return '已下单'
      case 1:
        return '物流中'
      case 2:
        return '租赁中'
      case 3:
        return '归还中'
      case 4:
        return '验机中'
      case 5:
        return '赔偿中'
      case 6:
        return '已完成'
      case 7:
        return '已取消'
      default:
        return '未知'
    }
  }

  const columns = [
    {
      name: '订单编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名称',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: '产品名称',
      dataIndex: 'item_name',
      key: 'item_name',
    },
    {
      title: '订单状态',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: '操作',
      key: 'action',
    },
  ]
  const data = ref([])

  const stat = 'processing'
  const queryId = ref('')
  const queryName = ref('')
  const queryStat = ref('全部')
  const queryItem = ref('')
  const submitQuery = () => {
    const param = {
      id: queryId.value,
      username: queryName.value,
      status: queryStat.value,
      item: queryItem.value,
    }
    getOrderList(param).then((resp) => {
      data.value = resp.data
    })
  }

  const resetQuery = () => {
    queryId.value = ''
    queryName.value = ''
    queryStat.value = ''
    queryItem.value = ''
    getOrderList().then((resp) => {
      data.value = resp.data
    })
  }

  export default {
    name: 'OrderTable',
    components: {},
    props: ['status', 'disabled', 'tableData'],
    setup(props) {
      const advanced = ref(false)
      const loadData = (tableData) => {
        console.log(tableData)
        data.value = tableData
      }
      return {
        advanced,
        data,
        columns,
        stat,
        props,
        queryId,
        queryName,
        queryStat,
        queryItem,
        submitQuery,
        resetQuery,
        loadData,
        statusText,
        statusBadge,
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
