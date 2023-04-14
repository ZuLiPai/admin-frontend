<template>
  <div>
    <a-row>
      <a-col :span="12">
        <h1>工单管理</h1>
      </a-col>
      <a-col :span="12">
        <a-button type="primary" style="float: right">
          <PlusOutlined />
          创建工单
        </a-button>
      </a-col>
    </a-row>
    <div class="table-search">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="工单编号">
              <a-input placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="工单状态">
              <a-select placeholder="请选择">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">未解决</a-select-option>
                <a-select-option value="2">已解决</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="用户昵称">
              <a-input style="width: 100%" />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="工单日期">
                <a-date-picker
                  style="width: 100%"
                  placeholder="请输入工单日期"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="租赁产品">
                <a-input style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="工单内容">
                <a-input style="width: 100%" />
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
      <a-table :columns="columns" :data-source="tickets">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'ticket_id'">
            <span>工单编号</span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'ticket_status'">
            <a-badge
              :status="record.ticket_status === true ? 'success' : 'error'"
              :text="record.ticket_status === true ? '已解决' : '未解决'"
            />
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a @click="handleDetail(record.ticket_id)">查看</a>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确认关闭该工单吗？"
                ok-text="是"
                cancel-text="否"
                @confirm="confirm(record.ticket_id)"
              >
                <a>关闭工单</a>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, onMounted } from 'vue'
  import { message } from 'ant-design-vue'
  import { UpOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons-vue'
  import { getAllTickets, closeTicket } from '@/api/ticket'

  export default defineComponent({
    name: 'index',
    components: {
      UpOutlined,
      DownOutlined,
      PlusOutlined,
    },
    setup() {
      const advanced = ref(false)
      const tickets = ref()
      const count = ref()
      onMounted(() => {
        refreshTicket()
      })
      const refreshTicket = () => {
        getAllTickets().then((resp) => {
          tickets.value = resp.data.results
          count.value = resp.data.count
        })
      }
      const handleDetail = () => {}
      const confirm = (id) => {
        closeTicket(id).then(refreshTicket)
        message.success('工单已关闭')
      }
      function toggleAdvanced() {
        advanced.value = !advanced.value
      }
      return {
        advanced,
        toggleAdvanced,
        tickets,
        columns,
        stat,
        handleDetail,
        confirm,
      }
    },
  })

  const columns = [
    {
      name: '工单编号',
      dataIndex: 'ticket_id',
      key: 'ticket_id',
    },
    {
      title: '用户昵称',
      dataIndex: 'ticket_username',
      key: 'ticket_username',
    },
    {
      title: '工单标题',
      dataIndex: 'ticket_title',
      key: 'ticket_title',
    },
    {
      title: '工单状态',
      key: 'ticket_status',
      dataIndex: 'ticket_status',
    },
    {
      title: '工单时间',
      key: 'ticket_datetime',
      dataIndex: 'ticket_time',
    },
    {
      title: '操作',
      key: 'action',
    },
  ]
  const stat = 'processing'
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
