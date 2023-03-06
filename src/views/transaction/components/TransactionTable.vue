<template>
  <div>
    <div class="table-search">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="订单编号">
              <a-input placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="订单状态">
              <a-select
                placeholder="请选择"
                :default-value="props.status"
                :disabled="props.disabled"
              >
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">已下单</a-select-option>
                <a-select-option value="2">物流中</a-select-option>
                <a-select-option value="3">租赁中</a-select-option>
                <a-select-option value="4">发回物流中</a-select-option>
                <a-select-option value="5">验机中</a-select-option>
                <a-select-option value="6">赔偿中</a-select-option>
                <a-select-option value="7">已完成</a-select-option>
                <a-select-option value="8">已取消</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="用户昵称">
                <a-input style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="租赁日期">
                <a-date-picker
                  style="width: 100%"
                  placeholder="请输入更新日期"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="租赁产品">
                <a-input style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="支付金额">
                <a-input-number style="width: 100%" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="
                (advanced && { float: 'right', overflow: 'hidden' }) || {}
              "
            >
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 12px">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 12px">
                {{ advanced ? '收起' : '展开' }}
                <up-outlined v-if="advanced"></up-outlined>
                <down-outlined v-if="!advanced"></down-outlined>
              </a>
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
              :status="record.status === '赔偿中' ? 'warning' : 'processing'"
              :text="record.status"
            />
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a>查看</a>
              <a-divider type="vertical" />
              <a>工单</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link">
                更多操作
                <down-outlined />
              </a>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { UpOutlined, DownOutlined } from '@ant-design/icons-vue'

  const columns = [
    {
      name: '订单编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '产品',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: '订单状态',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: '订单时间',
      key: 'datetime',
      dataIndex: 'datetime',
    },
    {
      title: '操作',
      key: 'action',
    },
  ]
  const data = [
    {
      key: '1',
      id: 1,
      username: 'John Brown',
      item: 'Sony a7m3',
      status: '已下单',
      datetime: '2023-03-03 11:01',
    },
    {
      key: '2',
      id: 2,
      username: 'Jim Green',
      item: 'Canon 5D Mark IV',
      status: '赔偿中',
      datetime: '2023-03-02 21:34',
    },
    {
      key: '3',
      id: 3,
      username: 'Joe Black',
      item: 'DJI Pocket',
      status: '验机中',
      datetime: '2023-02-28 09:31',
    },
  ]

  const stat = 'processing'

  export default {
    name: 'TransactionTable',
    components: {
      UpOutlined,
      DownOutlined,
    },
    props: ['status', 'disabled'],
    setup(props) {
      // console.log(props.status, props.disabled)
      const advanced = ref(false)
      function toggleAdvanced() {
        advanced.value = !advanced.value
      }
      return { advanced, toggleAdvanced, data, columns, stat, props }
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
