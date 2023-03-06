<template>
  <div>
    <div class="table-search">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="用户名称">
              <a-input placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="手机号码">
              <a-input placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="电子邮箱">
              <a-input placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-button type="primary">查询</a-button>
            <a-button style="margin-left: 12px">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-content">
      <a-table :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'userid'">
            <span>用户ID</span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'username'">
            <a>
              {{ record.username }}
            </a>
          </template>
          <template v-if="column.key === 'phone'">
            <a>
              {{ record.phone }}
            </a>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a @click="changeDetail">修改信息</a>
              <a-modal
                :visible="visible"
                width="75%"
                wrap-class-name="full-modal"
                title="用户详情"
                @ok="handleOk"
                @cancel="handleCancel"
                destroy-on-close
              >
                <UserInfo></UserInfo>
              </a-modal>
              <a-divider type="vertical" />
              <a>删除用户</a>
              <a-divider type="vertical" />
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import UserInfo from '@/views/user/components/UserInfo.vue'
  const columns = [
    {
      name: '用户ID',
      dataIndex: 'userid',
      key: 'userid',
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '电子邮箱',
      key: 'email',
      dataIndex: 'email',
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
      userid: '1',
      username: 'Tim Cook',
      phone: '13800013800',
      email: 'cook@apple.com',
    },
    {
      userid: '2',
      username: 'Tim Cook2',
      phone: '13800013800',
      email: 'cook@apple.com',
    },
    {
      userid: '3',
      username: 'Tim Cook3',
      phone: '13800013800',
      email: 'cook@apple.com',
    },
  ]
  export default {
    name: 'UserTable',
    components: { UserInfo },
    setup() {
      // console.log(props.status, props.disabled)
      const visible = ref(false)
      const changeDetail = () => {
        visible.value = true
      }
      const handleOk = (e) => {
        console.log(e)
        visible.value = false
      }
      const handleCancel = (e) => {
        console.log(e)
        visible.value = false
      }
      const advanced = ref(false)
      return {
        advanced,
        data,
        columns,
        visible,
        changeDetail,
        handleOk,
        handleCancel,
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

  .full-modal {
    .ant-modal {
      max-width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }
    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh);
    }
    .ant-modal-body {
      flex: 1;
    }
  }
</style>
