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
          :multiple="false"
          :action="endpointURL"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">点击此处上传公告图片</p>
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
            :status="bulletin.show_status"
            @refresh="refreshBulletins"
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
  import { setting } from '@/config/default'
  export default defineComponent({
    name: 'index',
    components: {
      BulletinCard,
      InboxOutlined,
    },
    setup() {
      const endpointURL = setting.endpointURL

      const visible = ref(false)
      const loading = ref(false)
      const confirmLoading = ref(false)

      const bulletins = ref()
      const count = ref()

      const newTitle = ref()
      const fileList = ref([])

      onMounted(() => {
        refreshBulletins()
      })
      const showModal = () => {
        visible.value = !visible.value
      }
      const refreshBulletins = () => {
        loading.value = true
        getBulletins().then((resp) => {
          bulletins.value = resp.data
          count.value = resp.data.count
          loading.value = false
        })
      }
      const handleOk = () => {
        if (newTitle.value) {
          visible.value = false
          confirmLoading.value = true
          const data = {
            title: newTitle.value,
            content: newTitle.value,
            image: fileList.value[0].response.image_id,
          }
          createBulletin(data).then(() => {
            confirmLoading.value = false
            newTitle.value = ''
            refreshBulletins()
          })
        } else {
          message.error('标题不能为空')
        }
      }

      const handleChange = (info) => {
        const status = info.file.status
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          message.success(`${info.file.name} 文件上传成功.`)
        } else if (status === 'error') {
          message.error(`${info.file.name} 文件上传失败.`)
        }
      }

      return {
        endpointURL,
        newTitle,
        count,
        visible,
        loading,
        confirmLoading,
        bulletins,
        fileList,
        showModal,
        handleOk,
        handleChange,
        refreshBulletins,
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
