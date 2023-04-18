<template>
  <div>
    <div class="table-search">
      <a-form>
        <a-row :gutter="48">
          <a-col :sm="12" :xs="24">
            <a-form-item label="产品名称">
              <a-input placeholder="" v-model:value="queryData.item_name" />
            </a-form-item>
          </a-col>
          <a-col :sm="12" :xs="24">
            <a-form-item label="用户名称">
              <a-input
                style="width: 100%"
                v-model:value="queryData.comment_username"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :sm="12" :xs="24">
            <a-form-item label="评价分数">
              <a-space direction="vertical">
                <a-radio-group
                  v-model:value="queryData.rating"
                  name="radioGroup"
                >
                  <a-radio value="1">1</a-radio>
                  <a-radio value="2">2</a-radio>
                  <a-radio value="3">3</a-radio>
                  <a-radio value="4">4</a-radio>
                  <a-radio value="5">5</a-radio>
                </a-radio-group>
              </a-space>
            </a-form-item>
          </a-col>
          <a-col>
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="handleSubmit">查询</a-button>
              <a-button style="margin-left: 12px" @click="handleReset">
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
            <span>评论编号</span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'rating'">
            <a-rate v-model:value="record.rating" disabled />
          </template>
          <template v-if="column.key === 'content'">
            {{ cutLongComment(record.content) }}
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a
                @click="
                  showDetail(
                    record.comment_username,
                    record.item_name,
                    record.rating,
                    record.content
                  )
                "
              >
                查看
              </a>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确定删除本条评论吗？"
                ok-text="是的，确定删除"
                cancel-text="否，不删除"
                @confirm="confirmDelete(record.id)"
                @cancel="cancelDelete"
              >
                <a href="#">删除</a>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
    </div>
    <a-modal v-model:visible="visible" title="评论详情">
      <comment-detail
        :username="modalData.username"
        :item_name="modalData.item_name"
        :rating="modalData.rating"
        :content="modalData.content"
      />
      <template #footer>
        <a-button type="primary" @click="handleOk">返回</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import { onMounted, reactive, ref } from 'vue'
  import CommentDetail from '@/views/item/CommentDetail.vue'
  import { deleteComment, getComments } from '@/api/order'
  import { right } from 'core-js/internals/array-reduce'
  const columns = [
    {
      name: '评论编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '产品名称',
      dataIndex: 'item_name',
      key: 'item_name',
    },
    {
      title: '用户名称',
      dataIndex: 'comment_username',
      key: 'comment_username',
    },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: '评价内容',

      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '操作',
      key: 'action',
    },
  ]

  export default {
    name: 'AllComment',
    methods: { right },
    components: {
      CommentDetail,
    },
    props: ['status', 'disabled'],
    setup(props) {
      const visible = ref(false)
      const data = ref()
      const modalData = reactive({
        username: '',
        item_name: '',
        rating: null,
        content: '',
      })
      const queryData = reactive({
        comment_username: '',
        item_name: '',
        rating: '',
        create_time: '',
      })
      onMounted(() => {
        refresh()
      })
      const showDetail = (username, itemname, rating, content) => {
        console.log(username)
        modalData.username = username
        modalData.item_name = itemname
        modalData.rating = rating
        modalData.content = content
        visible.value = true
      }
      const handleOk = () => {
        visible.value = false
      }

      const confirmDelete = (id) => {
        deleteComment(id).then(refresh)
      }
      const cancelDelete = (e) => {
        console.log(e)
      }
      const refresh = () => {
        getComments().then((resp) => {
          data.value = resp.data
        })
      }
      const handleReset = () => {
        queryData.create_time = ''
        queryData.item_name = ''
        queryData.rating = ''
        queryData.comment_username = ''
        refresh()
      }
      const handleSubmit = () => {
        let params
        if (queryData.create_time !== '') {
          params = {
            create_time: queryData.create_time,
            item_name: queryData.item_name,
            rating: queryData.rating,
            comment_username: queryData.comment_username,
          }
        } else {
          params = {
            item_name: queryData.item_name,
            rating: queryData.rating,
            comment_username: queryData.comment_username,
          }
        }
        getComments(params).then((resp) => {
          data.value = resp.data
        })
      }
      function cutLongComment(comment) {
        if (comment.length > 15) {
          return comment.substring(0, 15) + '…'
        }
        return comment
      }
      return {
        visible,
        showDetail,
        handleOk,
        confirmDelete,
        cancelDelete,
        cutLongComment,
        handleReset,
        handleSubmit,
        modalData,
        queryData,
        data,
        columns,
        props,
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
