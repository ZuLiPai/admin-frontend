<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>产品名称</span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="
                tag === '佳能'
                  ? 'volcano'
                  : tag.length > 2
                  ? 'geekblue'
                  : 'green'
              "
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>查看</a>
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
  import { defineComponent } from 'vue'
  import { DownOutlined } from '@ant-design/icons-vue'

  const columns = [
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
      dataIndex: 'category',
      key: 'category',
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
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: '基础租金',
      dataIndex: 'fee',
      key: 'fee',
      sorter: (a, b) => a.fee - b.fee,
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
  const data = [
    {
      key: '1',
      name: '索尼 Sony a7m4',
      category: '相机',
      fee: 300,
      tags: ['索尼', '微单', '全画幅'],
    },
    {
      key: '2',
      name: '索尼 Sony a7r3',
      category: '相机',
      fee: 330,
      tags: ['索尼', '微单', '全画幅'],
    },
    {
      key: '3',
      name: '索尼 Sony a7c',
      category: '相机',
      fee: 280,
      tags: ['索尼', '微单', '全画幅'],
    },
    {
      key: '4',
      name: '佳能 Canon 5D Mark IV',
      category: '相机',
      fee: 280,
      tags: ['佳能', '单反', '全画幅'],
    },
    {
      key: '5',
      name: '佳能 Canon 6D Mark II',
      category: '相机',
      fee: 300,
      tags: ['佳能', '单反', '全画幅'],
    },
    {
      key: '6',
      name: '佳能 Canon 90D',
      category: '相机',
      fee: 210,
      tags: ['佳能', '单反', 'APS-C画幅'],
    },
    {
      key: '7',
      name: '索尼 Sony 24-70mm f2.8',
      category: '镜头',
      fee: 180,
      tags: ['索尼', '变焦'],
    },
    {
      key: '8',
      name: '适马 Sigma 70-200mm f2.8',
      category: '镜头',
      fee: 150,
      tags: ['适马', '长焦'],
    },
    {
      key: '9',
      name: '佳能 Canon 50mm f1.8',
      category: '镜头',
      fee: 80,
      tags: ['佳能', '定焦', '人像'],
    },
    {
      key: '10',
      name: '大疆 DJI Phantom 4',
      category: '无人机',
      fee: 300,
      tags: ['大疆', '航拍'],
    },
  ]
  export default defineComponent({
    name: 'AllItem',
    components: {
      DownOutlined,
    },
    setup() {
      return {
        data,
        columns,
      }
    },
  })
</script>

<style scoped></style>
