<template>
  <div>
    <a-row>
      <a-col :span="12">
        <h1>产品管理</h1>
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
              查看
            </a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link">
                更多
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">改价</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">下架</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">其他动作…</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { DownOutlined, PlusOutlined } from '@ant-design/icons-vue'
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
      title: '操作',
      key: 'action',
    },
  ]
  const data = ref([])
  export default defineComponent({
    name: 'AllItem',
    components: {
      DownOutlined,
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
