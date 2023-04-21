<template>
  <div>
    <a-row>
      <a-col :span="12">
        <h4>商品规格</h4>
      </a-col>
      <a-col :span="12">
        <a-button
          class="editable-add-btn"
          type="primary"
          style="margin-bottom: 8px; float: right"
          @click="handleAdd"
        >
          添加规格
        </a-button>
      </a-col>
    </a-row>
    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      :pagination="false"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <div class="editable-cell">
            <div
              v-if="editableData[record.key]"
              class="editable-cell-input-wrapper"
            >
              <a-input
                v-model:value="editableData[record.key].name"
                @pressEnter="save(record.key)"
              />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
            </div>
          </div>
        </template>
        <template v-if="column.dataIndex === 'value'">
          <div class="editable-cell">
            <div
              v-if="editableData[record.key]"
              class="editable-cell-input-wrapper"
            >
              <a-input
                v-model:value="editableData[record.key].value"
                @pressEnter="save(record.key)"
              />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
            </div>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a v-if="editableData[record.key]" @click="save(record.key)">保存</a>
          <a v-else @click="edit(record.key)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="dataSource.length"
            title="确认删除？"
            @confirm="onDelete(record.key)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
  import { computed, defineComponent, reactive, ref } from 'vue'

  export default defineComponent({
    components: {},
    setup() {
      const columns = [
        {
          title: '规格名称',
          dataIndex: 'name',
        },
        {
          title: '规格参数',
          dataIndex: 'value',
        },
        {
          title: '操作',
          dataIndex: 'operation',
        },
      ]
      const dataSource = ref([
        // {
        //   key: '0',
        //   name: '最大光圈',
        //   value: 'f/1.8',
        // }
      ])
      const count = computed(() => dataSource.value.length + 1)
      const editableData = reactive({})

      const edit = (key) => {
        //editableData[key] = cloneDeep(
        //  dataSource.value.filter((item) => key === item.key)[0]
        //)
        editableData[key] = dataSource.value.filter(
          (item) => key === item.key
        )[0]
      }
      const save = (key) => {
        Object.assign(
          dataSource.value.filter((item) => key === item.key)[0],
          editableData[key]
        )
        delete editableData[key]
      }

      const onDelete = (key) => {
        dataSource.value = dataSource.value.filter((item) => item.key !== key)
      }
      const handleAdd = () => {
        const newData = {
          key: `${count.value}`,
          name: ``,
          value: ``,
        }
        dataSource.value.push(newData)
      }
      const refreshSpec = (val) => {
        dataSource.value = val
      }
      return {
        columns,
        onDelete,
        handleAdd,
        dataSource,
        editableData,
        count,
        edit,
        save,
        refreshSpec,
      }
    },
  })
</script>
<style lang="less">
  .editable-cell {
    position: relative;
    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
      padding-right: 24px;
    }

    .editable-cell-text-wrapper {
      padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;
    }

    .editable-cell-icon {
      margin-top: 4px;
      display: none;
    }

    .editable-cell-icon-check {
      line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
      color: #108ee9;
    }

    .editable-add-btn {
      margin-bottom: 8px;
    }
  }
  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }
</style>
