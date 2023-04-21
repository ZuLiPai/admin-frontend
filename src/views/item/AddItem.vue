<template>
  <div>
    <a-page-header title="添加商品" @back="this.$router.back()" />
    <a-row :gutter="16">
      <a-col :span="12">
        <h4>商品信息</h4>
        <a-input
          placeholder="商品名称"
          style="margin-bottom: 20px"
          v-model:value="itemName"
        />
        <a-select
          placeholder="商品种类"
          show-search
          ref="select"
          v-model:value="itemType"
          :options="types"
          style="width: 100%; margin-bottom: 20px"
        ></a-select>
        <a-input
          placeholder="基础租赁价格"
          prefix="￥"
          suffix="元/天"
          style="float: left; margin-bottom: 20px"
          v-model:value="itemPrice"
        />
        <a-input
          placeholder="商品押金"
          prefix="￥"
          suffix="元"
          style="float: left; margin-bottom: 20px"
          v-model:value="itemDeposit"
        />
        <a-input
          placeholder="商品库存"
          suffix="件"
          style="margin-bottom: 20px"
          v-model:value="itemStock"
        />
        <a-select
          v-model:value="tagValue"
          mode="tags"
          style="width: 100%; margin-bottom: 20px"
          placeholder="商品标签"
          :options="tagOptions"
          @change="tagHandleChange"
        ></a-select>

        <a-checkbox v-model:checked="itemStatus">上架</a-checkbox>
        <a-checkbox v-model:checked="itemPromoStatus">促销</a-checkbox>
      </a-col>
      <a-col :span="12">
        <h4>封面图片(最多一张)</h4>
        <a-row>
          <a-col :span="24">
            <a-upload
              v-model:file-list="itemFirstImage"
              list-type="picture-card"
              :show-upload-list="true"
              :action="endpointURL"
              :max-count="1"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div class="ant-upload-text">
                <UploadOutlined />
                <br />
                上传封面图片
              </div>
            </a-upload>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div>
      <a-row :gutter="16">
        <a-col :span="12">
          <ItemSpecDetail ref="specDetail"></ItemSpecDetail>
        </a-col>
        <a-col :span="12">
          <h4>介绍图片与样片</h4>
          <a-row>
            <a-col :span="24">
              <div class="clearfix">
                <a-upload
                  v-model:file-list="fileList"
                  :action="endpointURL"
                  list-type="picture-card"
                  @preview="handlePreview"
                  @change="handleChange"
                >
                  <div v-if="fileList.length < 8">
                    <UploadOutlined />
                    <div style="margin-top: 8px">上传介绍图片和样片</div>
                  </div>
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :title="previewTitle"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <a-row>
      <a-col :span="24">
        <a-button
          size="large"
          type="primary"
          :loading="saveLoading"
          style="width: 100%"
          @click="saveItem"
        >
          保存
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { UploadOutlined } from '@ant-design/icons-vue'
  import { onMounted, ref } from 'vue'
  import { createItem, createItemImage, deleteAllItemImages } from '@/api/item'
  import { addTags, deleteTags, getTags } from '@/api/tags'
  import { message } from 'ant-design-vue'
  import router from '@/router'
  import ItemSpecDetail from '@/views/item/components/ItemSpecDetail.vue'
  import { setting } from '@/config/default'

  export default {
    name: 'ItemDetail',
    methods: {
      router() {
        return router
      },
    },
    components: {
      ItemSpecDetail,
      UploadOutlined,
    },
    setup() {
      const endpointURL = setting.endpointURL
      const itemName = ref('')
      const itemType = ref(undefined)
      const itemPrice = ref()
      const itemDeposit = ref()
      const itemStock = ref()
      const itemPromoStatus = ref(false)
      const itemStatus = ref(false)
      const itemSpec = ref([])
      const itemFirstImage = ref([])
      const specDetail = ref(null)

      const tagValue = ref([])
      const tagOptions = ref([])
      const tagHandleChange = () => {}

      const previewVisible = ref(false)
      const previewImage = ref('')
      const previewTitle = ref('')

      const saveLoading = ref(false)
      const upload = ref()
      const fileList = ref([])

      const types = ref([
        {
          label: '相机',
          value: '相机',
        },
        {
          label: '镜头',
          value: '镜头',
        },
        {
          label: '无人机',
          value: '无人机',
        },
        {
          label: '配件',
          value: '配件',
        },
      ])

      onMounted(() => {
        getTags().then((resp) => {
          resp.data.forEach((item) => {
            tagOptions.value.push({
              label: item.name,
              value: item.id,
            })
          })
        })
      })
      function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error) => reject(error)
        })
      }
      const handleCancel = () => {
        previewVisible.value = false
        previewTitle.value = ''
      }
      const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj)
        }
        previewImage.value = file.url || file.preview
        previewVisible.value = true
        previewTitle.value =
          file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
      }
      const handleChange = (info) => {
        const status = info.file.status
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          message.success(`${info.file.name} 文件上传成功`)
        } else if (status === 'error') {
          message.error(`${info.file.name} 文件上传失败`)
        }
      }
      const saveItem = () => {
        saveLoading.value = true
        const data = {
          name: itemName.value,
          type: itemType.value,
          price: itemPrice.value,
          deposit: itemDeposit.value,
          stock: itemStock.value,
          promo_status: itemPromoStatus.value,
          show_status: itemStatus.value,
          specs: specDetail.value.dataSource,
          first_image: itemFirstImage.value[0].response.image_id,
        }
        createItem(data)
          .then((resp) => {
            saveLoading.value = false
            const item_id = resp.data.id
            deleteTags(item_id).then(() => {
              tagValue.value.forEach((tag) => {
                const tag_data = { item: item_id, tag: tag }
                addTags(item_id, tag_data)
              })
            })
            deleteAllItemImages(item_id).then(() => {
              let images_data = []
              fileList.value.forEach((file) => {
                if (
                  file.status !== 'removed' &&
                  file.status !== 'error' &&
                  file.status !== 'uploading'
                ) {
                  images_data.push({
                    item: item_id,
                    image: file.response.image_id,
                  })
                }
              })
              images_data.forEach((img) => {
                createItemImage(item_id, img)
              })
              router.go(-1)
            })
          })
          .catch(() => {
            saveLoading.value = false
            message.error('商品保存失败')
          })
      }
      return {
        types,
        itemName,
        itemType,
        itemPrice,
        itemDeposit,
        itemStock,
        itemPromoStatus,
        itemStatus,
        itemSpec,
        itemFirstImage,
        specDetail,

        tagValue,
        tagOptions,
        tagHandleChange,

        previewImage,
        previewVisible,
        previewTitle,
        fileList,
        handleCancel,
        handlePreview,
        handleChange,

        upload,
        saveItem,
        saveLoading,

        endpointURL,
      }
    },
  }
</script>

<style scoped>
  .ant-row {
    margin-bottom: 10px;
  }
</style>
