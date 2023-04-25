<template>
  <div>
    <a-row>
      <a-col :span="12">
        <h1>商品管理</h1>
      </a-col>
      <a-col :span="12">
        <a-button
          type="primary"
          style="float: right"
          @click="this.$router.push({ name: 'AddItem' })"
        >
          <PlusOutlined />
          添加产品
        </a-button>
      </a-col>
    </a-row>
    <a-table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>产品名称</span>
        </template>
        <template v-else-if="column.key === 'id'">
          <span>产品编号</span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a
            @click="
              this.$router.push({
                name: 'ItemDetail',
                params: { id: record.id },
              })
            "
          >
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag v-for="tag in record.tags_item" :key="tag.id" color="blue">
              {{ tag.tag_name }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.key === 'show_status'">
          <a-badge
            :status="record.show_status === true ? 'success' : 'error'"
            :text="record.show_status === true ? '上架中' : '已下架'"
          />
        </template>
        <template v-if="column.key === 'promo_status'">
          <a-badge
            :status="record.promo_status === true ? 'success' : 'error'"
            :text="record.promo_status === true ? '促销中' : '未促销'"
          />
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a
              @click="
                this.$router.push({
                  name: 'ItemDetail',
                  params: { id: record.id },
                })
              "
            >
              编辑
            </a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { getItems } from '@/api/item'

  const columns = [
    {
      name: '产品编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      name: '产品名称',
      dataIndex: 'name',
      key: 'name',
      filters: [
        {
          text: '索尼',
          value: '索尼',
        },
        {
          text: '佳能',
          value: '佳能',
        },
        {
          text: '适马',
          value: '适马',
        },
        {
          text: '大疆',
          value: '大疆',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: '产品类型',
      dataIndex: 'type',
      key: 'type',
      filters: [
        {
          text: '相机',
          value: '相机',
        },
        {
          text: '镜头',
          value: '镜头',
        },
        {
          text: '无人机',
          value: '无人机',
        },
        {
          text: '配件',
          value: '配件',
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
      title: '基础租金',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: '上架状态',
      key: 'show_status',
      dataIndex: 'show_status',
    },
    {
      title: '促销状态',
      key: 'promo_status',
      dataIndex: 'promo_status',
    },
    {
      title: '操作',
      key: 'action',
    },
  ]
  const data = ref([])
  export default defineComponent({
    name: 'AllItem',
    components: {
      PlusOutlined,
    },
    setup() {
      onMounted(() => {
        getItems().then((resp) => {
          data.value = resp.data
        })
      })
      return {
        data,
        columns,
      }
    },
  })
</script>

<style scoped></style>
