<!--在table布局中嵌套多个card组件-->

<template>
  <div>
    <div class="components-page-header-demo-responsive">
      <a-page-header title="公告管理" @back="() => $router.go(-1)">
        <template #extra>
          <a-button key="1" type="primary">创建公告</a-button>
        </template>
      </a-page-header>
    </div>
    <div class="bulletin-card">
      <a-form layout="horizontal">
        <a-form
          label="公告列表"
          style="font-size: 2px; font-weight: bold"
        ></a-form>
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-card hoverable loading>
              <template #cover style="height: 200px">
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              </template>
              <template #actions>
                <left-outlined key="move left" />
                <delete-outlined key="delete" />
                <right-outlined key="move right" />
              </template>
              <a-card-meta
                title="Card title"
                description="This is the description"
              ></a-card-meta>
            </a-card>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-card hoverable>
              <template #cover>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              </template>
              <template #actions>
                <left-outlined key="move left" />
                <delete-outlined key="delete" />
                <right-outlined key="move right" />
              </template>
              <a-card-meta
                title="Card title"
                description="This is the description"
              ></a-card-meta>
            </a-card>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-card hoverable>
              <template #cover>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              </template>
              <template #actions>
                <left-outlined key="move left" />
                <delete-outlined key="delete" />
                <right-outlined key="move right" />
              </template>
              <a-card-meta
                title="Card title"
                description="This is the description"
              ></a-card-meta>
            </a-card>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-card hoverable>
              <template #cover>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              </template>
              <template #actions>
                <left-outlined key="move left" />
                <delete-outlined key="delete" />
                <right-outlined key="move right" />
              </template>
              <a-card-meta
                title="Card title"
                description="This is the description"
              ></a-card-meta>
            </a-card>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-card hoverable>
              <template #cover>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              </template>
              <template #actions>
                <left-outlined key="move left" />
                <delete-outlined key="delete" />
                <right-outlined key="move right" />
              </template>
              <a-card-meta
                title="Card title"
                description="This is the description"
              ></a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
  import {
    LeftOutlined,
    RightOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'index',
    components: {
      LeftOutlined,
      RightOutlined,
      DeleteOutlined,
    },
    setup() {
      return {
        dataSource: [],
      }
    },
  })
</script>

<style scoped lang="less">
  .ant-card {
    margin-bottom: 10px;
  }
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
