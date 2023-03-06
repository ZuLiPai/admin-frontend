<template>
  <div>
    <div class="table-search">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="租赁产品">
              <a-input placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="评价分数">
              <a-select placeholder="请选择">
                <a-select-option value="1">1星</a-select-option>
                <a-select-option value="2">2星</a-select-option>
                <a-select-option value="3">3星</a-select-option>
                <a-select-option value="4">4星</a-select-option>
                <a-select-option value="5">5星</a-select-option>
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
              <a-form-item label="评价日期">
                <a-date-picker
                  style="width: 100%"
                  placeholder="请输入评价日期"
                />
              </a-form-item>
            </a-col>
            <!--            <a-col :md="8" :sm="24">-->
            <!--              <a-form-item label="租赁产品">-->
            <!--                <a-input style="width: 100%" />-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <!--            <a-col :md="8" :sm="24">-->
            <!--              <a-form-item label="支付金额">-->
            <!--                <a-input-number style="width: 100%" />-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
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
          <template v-if="column.key === 'rating'">
            <a-rate v-model:value="record.rating" allow-half disabled />
          </template>
          <template v-if="column.key === 'comment'">
            {{ cutLongComment(record.comment) }}
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a @click="showDetail">查看</a>
              <a-modal
                v-model:visible="visible"
                :title="record.username + '对' + record.item + '的评论详情'"
                @ok="handleOk"
              >
                <p>{{ record.rating }}分</p>
                <p>{{ record.comment }}</p>
              </a-modal>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确定删除本条评论吗？"
                ok-text="是的，确定删除"
                cancel-text="否，不删除"
                @confirm="confirmDelete"
                @cancel="cancelDelete"
              >
                <a href="#">删除</a>
              </a-popconfirm>
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
      title: '产品',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '评分',
      key: 'rating',
      dataIndex: 'rating',
    },
    {
      title: '评价内容',
      key: 'comment',
      dataIndex: 'comment',
    },
    {
      title: '操作',
      key: 'action',
    },
  ]
  const data = [
    {
      username: '王Brown',
      item: 'Sony a7m3',
      rating: 5,
      comment: '非常好用的机器，拍出来的效果完美！',
    },
    {
      username: '吉米Green',
      item: 'Canon 5D Mark IV',
      rating: 4.5,
      comment: '机身略有磕碰，不过用起来没有什么问题，连拍速度很快！',
    },
    {
      username: '乔Black',
      item: 'DJI Phantom 4',
      rating: 4,
      comment:
        '随附的电池续航有点差，一次飞了20分钟就返航了，有些不太尽兴。不过飞机还算比较新',
    },
  ]

  export default {
    name: 'AllComment',
    components: {
      UpOutlined,
      DownOutlined,
    },
    props: ['status', 'disabled'],
    setup(props) {
      const advanced = ref(false)
      const visible = ref(false)
      const showDetail = () => {
        visible.value = true
      }
      const handleOk = (e) => {
        console.log(e)
        visible.value = false
      }

      const confirmDelete = (e) => {
        console.log(e)
      }
      const cancelDelete = (e) => {
        console.log(e)
      }
      function toggleAdvanced() {
        advanced.value = !advanced.value
      }
      return {
        advanced,
        visible,
        showDetail,
        handleOk,
        toggleAdvanced,
        confirmDelete,
        cancelDelete,
        data,
        columns,
        props,
      }
    },
    methods: {
      cutLongComment(comment) {
        if (comment.length > 15) {
          return comment.substring(0, 15) + '…'
        }
        return comment
      },
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
