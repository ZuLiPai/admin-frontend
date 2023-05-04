<template>
  <div>
    <a-page-header title="订单详细信息" @back="this.$router.back()" />
    <a-row>
      <a-col :span="12">
        <h2>
          用户：
          <a>{{ order_data.user_name }}</a>
        </h2>
        <h2>
          商品：
          <a>{{ order_data.item_name }}</a>
        </h2>
        <h3>订单创建时间: {{ order_data.create_time }}</h3>
        <p>租赁预计开始时间: {{ order_data.expect_start_time }}</p>
        <p>租赁实际开始时间: {{ order_data.actual_start_time || '' }}</p>
        <p>租赁预计结束时间: {{ order_data.expect_end_time }}</p>
        <p>租赁实际结束时间: {{ order_data.actual_end_time || '' }}</p>
        <h3>订单结束时间: {{ order_data.order_end_time }}</h3>
        <a-row>
          <a-col :xs="24">
            <h2 style="margin-bottom: 20px">用户评价</h2>
            <a-card
              :title="comments.username"
              style="width: 80%"
              v-if="order_data.is_commented"
            >
              <template #extra>
                <a>商品:{{ comments.item }}</a>
              </template>
              <a-rate v-model:value="comments.rating" disabled></a-rate>
              <p>
                {{ comments.content }}
              </p>
            </a-card>
            <a-empty
              v-else
              style="width: 80%"
              description="用户还未评价"
            ></a-empty>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <h2 style="margin-bottom: 40px">当前状态</h2>
        <a-steps direction="vertical" :current="status">
          <a-step title="已付款，等待发货" description="点击商品发货继续处理" />
          <a-step title="已发货，物流中" :description="expressText1" />
          <a-step title="租赁中" description="用户正在使用" />
          <a-step title="商品归还中" :description="expressText2" />
          <a-step title="验机中" description="点击此处以确认商品状态" />
          <a-step title="赔偿中" description="向用户发起工单商议赔偿" />
          <a-step title="订单完成" description="" />
          <a-step title="已取消" description="" />
        </a-steps>
      </a-col>
      <a-col :span="6">
        <h2>修改订单状态</h2>
        <a-select
          style="width: 100%"
          v-model:value="selectStatus"
          :placeholder="statusText(order_data.status)"
        >
          <a-select-option value="0">已付款，等待发货</a-select-option>
          <a-select-option value="1">已发货，物流中</a-select-option>
          <a-select-option value="2">租赁中</a-select-option>
          <a-select-option value="3">商品归还中</a-select-option>
          <a-select-option value="4">验机中</a-select-option>
          <a-select-option value="5">赔偿中</a-select-option>
          <a-select-option value="6">订单完成</a-select-option>
          <a-select-option value="7">已取消</a-select-option>
        </a-select>
        <a-button
          type="primary"
          @click="handleChangeStatus(order_data.id)"
          style="margin-top: 10px"
          block
        >
          确认修改
        </a-button>
        <a-button
          type="ghost"
          @click="
            this.$router.push({
              name: 'CreateTicket',
              params: { userId: order_data.user },
            })
          "
          style="margin-top: 20px"
          danger
          block
        >
          发起工单
        </a-button>
        <a-button
          type="primary"
          @click="showModal"
          style="margin-top: 10px"
          block
          v-if="order_data.status === 0"
        >
          商品发货
        </a-button>
        <a-popconfirm
          title="确认已收到用户发来商品？"
          ok-text="是"
          cancel-text="否"
          @confirm="confirmReceive"
        >
          <a-button
            type="primary"
            style="margin-top: 10px"
            block
            v-if="order_data.status === 3"
          >
            商品签收
          </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="确认商品验机无损坏？"
          ok-text="是"
          cancel-text="否"
          @confirm="confirmExamine"
        >
          <a-button
            type="primary"
            style="margin-top: 10px"
            block
            v-if="order_data.status === 4"
          >
            完成验机
          </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="确认商品出现损坏？"
          ok-text="是"
          cancel-text="否"
          @confirm="confirmDamage"
        >
          <a-button
            type="danger"
            style="margin-top: 10px"
            block
            v-if="order_data.status === 4"
          >
            商品损坏
          </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="确认已处理赔偿问题？"
          ok-text="是"
          cancel-text="否"
          @confirm="confirmCompensation"
        >
          <a-button
            type="primary"
            style="margin-top: 10px"
            block
            v-if="order_data.status === 5"
          >
            商品已赔偿
          </a-button>
        </a-popconfirm>
      </a-col>
    </a-row>
    <!--发货框-->
    <a-modal v-model:visible="modalVisible" title="订单发货" @ok="onFinish">
      <a-form
        :model="ModalFormState"
        name="basic"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="express_name_id"
          label="快递公司"
          :rules="[{ required: true, message: '请选择快递公司' }]"
        >
          <a-select
            v-model:value="ModalFormState.express_name_id"
            :options="expressCompanyOption"
          />
        </a-form-item>
        <a-form-item
          label="快递单号"
          name="express_number"
          :rules="[{ required: true, message: '请输入快递单号' }]"
        >
          <a-input v-model:value="ModalFormState.express_number" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import {
    createExpress,
    getExpressCompany,
    getOrderComments,
    getOrderDetail,
    updateOrder,
  } from '@/api/order'
  import { message } from 'ant-design-vue'
  import router from '@/router'
  const statusText = (id) => {
    switch (id) {
      case 0:
        return '已付款，等待发货'
      case 1:
        return '已发货，物流中'
      case 2:
        return '租赁中'
      case 3:
        return '商品归还中'
      case 4:
        return '验机中'
      case 5:
        return '赔偿中'
      case 6:
        return '订单完成'
      case 7:
        return '已取消'
    }
  }
  export default defineComponent({
    name: 'OrderDetail',
    setup() {
      const order_data = ref({})
      const route = useRoute()
      const order_id = route.params.id
      const status = ref()
      const selectStatus = ref(undefined)
      const modalVisible = ref(false)
      const expressCompanyOption = ref([])
      const ModalFormState = reactive({
        express_kind: false,
        express_order: order_id,
        express_name_id: '',
        express_number: '',
      })
      const comments = reactive({
        username: '',
        item: '',
        content: '',
        rating: '',
      })
      const expressText1 = ref()
      const expressText2 = ref()
      onMounted(() => {
        refreshPage(order_id)
        refreshComment(order_id)
        getExpressCompany().then((resp) => {
          resp.data.forEach((t) => {
            expressCompanyOption.value.push({
              label: t.express_name,
              value: t.express_id,
            })
            console.log(expressCompanyOption.value)
          })
        })
      })
      const refreshPage = (order_id) => {
        getOrderDetail(order_id)
          .then((resp) => {
            order_data.value = resp.data
            status.value = resp.data.status
            handleExpress(order_data.value.express_data)
          })
          .catch(() => {
            console.log('获取订单出错了')
          })
      }
      const refreshComment = (order_id) => {
        getOrderComments(order_id)
          .then((resp) => {
            comments.username = resp.data.comment_username
            comments.item = resp.data.item_name
            comments.rating = resp.data.rating
            comments.content = resp.data.content
          })
          .catch(() => {
            console.log('该商品暂无评论')
            order_data.value.is_commented = false
          })
      }
      const handleExpress = (data) => {
        data.forEach((t) => {
          if (t.express_kind === false) {
            expressText1.value = t.express_name + ':' + t.express_number
          } else {
            expressText2.value = t.express_name + ':' + t.express_number
          }
        })
      }
      const handleChangeStatus = (id) => {
        if (selectStatus.value === undefined) {
          message.error(`请选择订单状态`)
          return
        }
        const data = {
          id: order_data.value.id,
          status: selectStatus.value,
          expect_end_time: order_data.value.expect_end_time,
          expect_start_time: order_data.value.expect_start_time,
        }
        updateOrder(id, data).then(() => {
          message.success(`订单状态修改成功`)
          router.go(-1)
        })
      }

      const showModal = () => {
        modalVisible.value = true
      }

      const handleModalOk = (e) => {
        console.log(e)
        modalVisible.value = false
      }

      const onFinish = () => {
        console.log('click onFinish:')
        createExpress(order_id, ModalFormState).then(() => {
          const data = {
            id: order_data.value.id,
            status: '1',
            expect_end_time: order_data.value.expect_end_time,
            expect_start_time: order_data.value.expect_start_time,
          }
          updateOrder(order_id, data).then(() => {
            message.success('发货成功')
            modalVisible.value = false
            refreshPage(order_id)
          })
        })
      }
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
      }

      const confirmReceive = () => {
        const data = {
          id: order_id,
          status: '4',
          expect_end_time: order_data.value.expect_end_time,
          expect_start_time: order_data.value.expect_start_time,
          express_status: true,
        }
        updateOrder(order_id, data)
          .then(() => {
            message.success(`已收货`)
            refreshPage(order_id)
          })
          .catch(() => {
            message.error('出现错误，请重试')
          })
      }
      const confirmExamine = () => {
        // 获取当前时间
        const currentDateTime = new Date()
        const year = currentDateTime.getFullYear()
        const month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2)
        const day = ('0' + currentDateTime.getDate()).slice(-2)
        const hour = ('0' + currentDateTime.getHours()).slice(-2)
        const minute = ('0' + currentDateTime.getMinutes()).slice(-2)
        const second = ('0' + currentDateTime.getSeconds()).slice(-2)
        const datetime =
          year +
          '-' +
          month +
          '-' +
          day +
          ' ' +
          hour +
          ':' +
          minute +
          ':' +
          second
        const data = {
          id: order_id,
          status: '6',
          expect_end_time: order_data.value.expect_end_time,
          expect_start_time: order_data.value.expect_start_time,
          order_end_time: datetime,
        }
        updateOrder(order_id, data)
          .then(() => {
            message.success(`已结束订单`)
            refreshPage(order_id)
          })
          .catch(() => {
            message.error('出现错误，请重试')
          })
      }
      const confirmDamage = () => {
        const data = {
          id: order_id,
          status: '5',
          expect_end_time: order_data.value.expect_end_time,
          expect_start_time: order_data.value.expect_start_time,
        }
        updateOrder(order_id, data)
          .then(() => {
            message.success(`订单已进入赔偿状态`)
            refreshPage(order_id)
          })
          .catch(() => {
            message.error('出现错误，请重试')
          })
      }
      const confirmCompensation = () => {
        // 获取当前时间
        const currentDateTime = new Date()
        const year = currentDateTime.getFullYear()
        const month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2)
        const day = ('0' + currentDateTime.getDate()).slice(-2)
        const hour = ('0' + currentDateTime.getHours()).slice(-2)
        const minute = ('0' + currentDateTime.getMinutes()).slice(-2)
        const second = ('0' + currentDateTime.getSeconds()).slice(-2)
        const datetime =
          year +
          '-' +
          month +
          '-' +
          day +
          ' ' +
          hour +
          ':' +
          minute +
          ':' +
          second
        // todo: 财务表compensate还没标注赔偿金额
        const data = {
          id: order_id,
          status: '6',
          expect_end_time: order_data.value.expect_end_time,
          expect_start_time: order_data.value.expect_start_time,
          order_end_time: datetime,
        }
        updateOrder(order_id, data)
          .then(() => {
            message.success(`已结束订单`)
            refreshPage(order_id)
          })
          .catch(() => {
            message.error('出现错误，请重试')
          })
      }
      return {
        order_id,
        order_data,
        status,
        selectStatus,
        comments,
        modalVisible,
        ModalFormState,
        expressCompanyOption,
        expressText1,
        expressText2,
        showModal,
        statusText,
        handleChangeStatus,
        handleModalOk,
        onFinish,
        onFinishFailed,
        confirmReceive,
        confirmExamine,
        confirmDamage,
        confirmCompensation,
      }
    },
  })
</script>

<style scoped></style>
