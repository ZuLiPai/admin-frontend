<!--在table布局中嵌套多个card组件-->

<template>
  <div>
    <div class="components-page-header-demo-responsive">
      <a-page-header title="公告管理" @back="() => $router.go(-1)">
        <template #extra>
          <a-button key="1" type="primary" @click="showModal">
            创建公告
          </a-button>
        </template>
      </a-page-header>
    </div>
    <div>
      <a-modal
        v-model:visible="visible"
        title="上传公告"
        @ok="handleOk"
        :confirm-loading="confirmLoading"
      >
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          @drop="handleDrop"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">点击此处或把图片拖到这里上传公告</p>
        </a-upload-dragger>

        <a-input
          placeholder="公告标题"
          style="margin-top: 10px"
          v-model:value="newTitle"
        />
      </a-modal>
    </div>
    <div class="bulletin-card">
      <a-spin v-if="loading" />
      <a-row v-if="!loading">
        <a-col
          :span="24"
          v-for="bulletin in bulletins"
          v-bind:key="bulletin.id"
        >
          <BulletinCard
            :id="bulletin.id"
            :title="bulletin.title"
            :content="bulletin.content"
            :image="bulletin.image"
          />
        </a-col>
        <a-col :span="24">
          <a-empty v-if="count === 0" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, onMounted } from 'vue'
  import { InboxOutlined } from '@ant-design/icons-vue'
  import BulletinCard from '@/views/bulletin/components/BulletinCard.vue'
  import { createBulletin, getBulletins } from '@/api/bulletin'
  import { message } from 'ant-design-vue'
  export default defineComponent({
    name: 'index',
    components: {
      BulletinCard,
      InboxOutlined,
    },
    setup() {
      const visible = ref(false)
      const loading = ref(false)
      const confirmLoading = ref(false)
      const newTitle = ref()
      const bulletins = ref()
      const count = ref()

      onMounted(() => {
        loading.value = true
        getBulletins().then((resp) => {
          bulletins.value = resp.data.results
          count.value = resp.data.count
          loading.value = false
        })
      })
      const showModal = () => {
        visible.value = !visible.value
      }
      const handleOk = () => {
        if (newTitle.value) {
          visible.value = false
          confirmLoading.value = true
          const data = {
            title: newTitle.value,
            content: newTitle.value,
          }
          createBulletin(data).then(() => {
            confirmLoading.value = false
            loading.value = true
            newTitle.value = ''
            getBulletins().then((resp) => {
              bulletins.value = resp.data.results
              count.value = resp.data.count
              loading.value = false
            })
          })
        } else {
          message.error('标题不能为空')
        }
      }
      return {
        newTitle,
        count,
        visible,
        loading,
        confirmLoading,
        bulletins,
        showModal,
        handleOk,
      }
    },
  })
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
