<template>
  <div>
    <a-row>
      <a-col :span="12">
        <h1>工单管理</h1>
      </a-col>
      <a-col :span="12">
        <a-button
          type="primary"
          style="float: right"
          @click="this.$router.push({ name: 'CreateTicket' })"
        >
          <PlusOutlined />
          创建工单
        </a-button>
      </a-col>
    </a-row>
    <div class="table-search">
      <a-form>
        <a-row justify="space-between" gutter="24">
          <a-col flex="5">
            <a-form-item label="工单编号">
              <a-input placeholder="" v-model:value="queryItem.ticket_id" />
            </a-form-item>
          </a-col>
          <a-col flex="5">
            <a-form-item label="用户昵称">
              <a-input
                style="width: 100%"
                v-model:value="queryItem.ticket_username"
              />
            </a-form-item>
          </a-col>
          <a-col flex="4">
            <a-form-item label="工单状态">
              <a-select
                placeholder="请选择"
                v-model:value="queryItem.ticket_status"
              >
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="false">未解决</a-select-option>
                <a-select-option value="true">已解决</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col flex="6">
            <a-form-item label="工单日期">
              <a-date-picker
                style="width: 100%"
                placeholder="请选择工单日期"
                v-model:value="queryItem.tickets_time"
                :format="dateFormat"
              />
            </a-form-item>
          </a-col>
          <a-col flex="6">
            <a-button type="primary" @click="submitQuery">查询</a-button>
            <a-button style="margin-left: 12px" @click="resetQuery">
              重置
            </a-button>
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
              <a
                @click="
                  this.$router.push({
                    name: 'TicketDetail',
                    params: { ticketId: record.ticket_id },
                  })
                "
              >
                查看
              </a>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确认关闭该工单吗？"
                ok-text="是"
                cancel-text="否"
                @confirm="confirm(record.ticket_id)"
                :disabled="record.ticket_status === true"
              >
                <a v-if="record.ticket_status === false">关闭工单</a>
                <a disabled="" v-else>工单已关闭</a>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, onMounted, reactive } from 'vue'
  import { message } from 'ant-design-vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { getAllTickets, closeTicket } from '@/api/ticket'

  export default defineComponent({
    name: 'index',
    components: {
      PlusOutlined,
    },
    setup() {
      const tickets = ref()
      const count = ref()
      const queryTime = ref()
      const dateFormat = 'YYYY-MM-DD'
      const queryItem = reactive({
        ticket_id: '',
        ticket_username: '',
        ticket_status: null,
        tickets_time: '',
      })
      onMounted(() => {
        refreshTicket()
      })
      const refreshTicket = () => {
        getAllTickets().then((resp) => {
          tickets.value = resp.data
          count.value = resp.data.length
        })
      }
      const handleDetail = (ticketId) => {
        this.$router.push({
          name: 'TicketDetail',
          param: { ticketId: ticketId },
        })
      }
      const confirm = (id) => {
        closeTicket(id).then(refreshTicket)
        message.success('工单已关闭')
      }
      const submitQuery = () => {
        let params = {}
        if (queryItem.tickets_time !== '') {
          params = {
            ticket_id: queryItem.ticket_id,
            ticket_status: queryItem.ticket_status,
            ticket_username: queryItem.ticket_username,
            ticket_time: queryItem.tickets_time.format(dateFormat),
          }
        } else {
          params = {
            ticket_id: queryItem.ticket_id,
            ticket_status: queryItem.ticket_status,
            ticket_username: queryItem.ticket_username,
          }
        }
        getAllTickets(params).then((resp) => {
          tickets.value = resp.data
        })
      }
      const resetQuery = () => {
        queryItem.ticket_id = ''
        queryItem.ticket_username = ''
        queryItem.ticket_status = null
        queryItem.tickets_time = ''
        getAllTickets().then((resp) => {
          tickets.value = resp.data
        })
      }

      return {
        tickets,
        columns,
        stat,
        queryItem,
        queryTime,
        dateFormat,
        resetQuery,
        submitQuery,
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
