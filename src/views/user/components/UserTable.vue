<template>
  <div>
    <a-row>
      <a-col :span="12">
        <h1>用户管理</h1>
      </a-col>
    </a-row>
    <div class="table-search">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="用户名称">
              <a-input placeholder="" v-model:value="queryName" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="手机号码">
              <a-input placeholder="" v-model:value="queryPhone" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="电子邮箱">
              <a-input placeholder="" v-model:value="queryEmail" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-button type="primary" @click="submitQuery">查询</a-button>
            <a-button style="margin-left: 12px" @click="resetQuery">
              重置
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-content">
      <a-table :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'id'">
            <span>用户ID</span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'username'">
            {{ record.username }}
          </template>
          <template v-if="column.key === 'phone'">
            {{ record.phone }}
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a @click="changeDetail(record.id)">修改信息</a>
              <a-divider type="vertical" />
              <a @click="switchUserState(record.id, record.is_active)">
                {{ userAction(record.is_active) }}用户
              </a>
            </span>
          </template>
        </template>
      </a-table>
    </div>
    <a-modal
      :visible="visible"
      width="90%"
      wrap-class-name="full-modal"
      title="用户详情"
      @ok="handleOk"
      @cancel="handleCancel"
      destroy-on-close
    >
      <UserInfo :id="newID"></UserInfo>
    </a-modal>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import UserInfo from '@/views/user/components/UserInfo.vue'
  import { getUsers, switchUser } from '@/api/manage_user'
  import { message } from 'ant-design-vue'
  const userAction = (is_active) => {
    if (is_active) {
      return '禁用'
    } else {
      return '启用'
    }
  }

  const switchUserState = (id, state) => {
    switchUser(id, state).then(() => {
      message.success('更改用户状态成功')
      getUsers().then((resp) => {
        data.value = resp.data
      })
    })
  }
  const columns = [
    {
      name: '用户ID',
      dataIndex: 'id',
      key: 'id',
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

  const data = ref([])
  const queryName = ref('')
  const queryPhone = ref('')
  const queryEmail = ref('')
  const submitQuery = () => {
    const param = {
      username: queryName.value,
      phone: queryPhone.value,
      email: queryEmail.value,
    }
    getUsers(param).then((resp) => {
      data.value = resp.data
    })
  }

  const resetQuery = () => {
    queryName.value = ''
    queryPhone.value = ''
    queryEmail.value = ''
    getUsers().then((resp) => {
      data.value = resp.data
    })
  }

  export default {
    name: 'UserTable',
    components: { UserInfo },
    setup() {
      const newID = ref()
      const visible = ref(false)
      onMounted(() => {
        getUsers().then((resp) => {
          data.value = resp.data
        })
      })
      const changeDetail = (id) => {
        newID.value = id
        visible.value = true
      }
      const handleOk = () => {
        getUsers().then((resp) => {
          data.value = resp.data
        })
        visible.value = false
      }
      const handleCancel = () => {
        getUsers().then((resp) => {
          data.value = resp.data
        })
        visible.value = false
      }
      const advanced = ref(false)
      return {
        newID,
        advanced,
        data,
        columns,
        visible,
        changeDetail,
        handleOk,
        handleCancel,
        userAction,
        switchUserState,
        queryName,
        queryPhone,
        queryEmail,
        submitQuery,
        resetQuery,
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
