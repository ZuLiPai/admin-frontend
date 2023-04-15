<template>
  <div>
    <a-page-header title="商品详情管理" @back="this.$router.back()" />
    <a-row :gutter="16">
      <a-col :span="8">
        <a-input
          placeholder="商品名称"
          style="margin-bottom: 20px"
          v-model:value="itemName"
        />
        <a-select
          ref="select"
          v-model:value="itemType"
          :options="types"
          style="width: 100%; margin-bottom: 20px"
          placeholder="商品种类"
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
      <a-col :span="16">
        <h4>封面图片</h4>
        <a-row>
          <a-col :span="24">
            <a-upload
              v-model:file-list="fileList"
              list-type="picture-card"
              :show-upload-list="true"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              max-count="1"
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
        <a-col :span="12" style="text-align: center">
          <ItemSpecDetail ref="specDetail"></ItemSpecDetail>
        </a-col>
        <a-col :span="12">
          <h4>介绍图片与样片</h4>
          <a-row>
            <a-col :span="24">
              <div class="clearfix">
                <a-upload
                  v-model:file-list="fileList"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture-card"
                  @preview="handlePreview"
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
  import { useRoute } from 'vue-router'
  import { getItem, updateItem } from '@/api/item'
  import { addTags, getTagByItem, getTags } from '@/api/tags'
  import { message } from 'ant-design-vue'
  import router from '@/router'
  import ItemSpecDetail from '@/views/item/components/ItemSpecDetail.vue'

  const item_id = ref('')
  const itemName = ref('')
  const itemType = ref('')
  const itemPrice = ref()
  const itemDeposit = ref()
  const itemStock = ref()
  const itemPromoStatus = ref(false)
  const itemStatus = ref(false)
  const itemSpec = ref([])
  const specDetail = ref(null)

  const tagValue = ref([])
  const tagOptions = ref([])
  const tagHandleChange = () => {}

  const previewVisible = ref(false)
  const previewImage = ref('')
  const previewTitle = ref('')

  const saveLoading = ref(false)

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
  const fileList = ref([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ])

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
    }
    updateItem(item_id.value, data)
      .then((resp) => {
        saveLoading.value = false
        const item_id = resp.data.id
        tagValue.value.forEach((tag) => {
          // TODO: 商品标签可以加不可以删，直接在后端不可重复就可以了
          const tag_data = { item: item_id, tag: tag }
          addTags(item_id, tag_data)
        })
        message.success('商品保存成功')
      })
      .catch(() => {
        saveLoading.value = false
        message.error('商品保存失败')
      })
  }
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
      const route = useRoute()
      onMounted(() => {
        item_id.value = route.params.id
        getItem(item_id.value).then((res) => {
          itemName.value = res.data.name
          itemType.value = res.data.type
          itemPrice.value = res.data.price
          itemDeposit.value = res.data.deposit
          itemStock.value = res.data.stock
          itemPromoStatus.value = res.data.promo_status
          itemStatus.value = res.data.show_status
          itemSpec.value = res.data.specs
          specDetail.value.refreshSpec(itemSpec.value)
        })
        getTags().then((resp) => {
          resp.data.forEach((item) => {
            tagOptions.value.push({
              label: item.name,
              value: item.id,
            })
          })
        })
        getTagByItem(item_id.value).then((resp) => {
          resp.data.forEach((item) => {
            tagValue.value.push(item.tag)
          })
        })
      })
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

        saveItem,
        saveLoading,
      }
    },
  }
</script>

<style scoped>
  .ant-row {
    margin-bottom: 10px;
  }
</style>
