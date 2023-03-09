<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12">
        <h1>商品详情管理</h1>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-input
          placeholder="商品名称"
          style="float: left; margin-bottom: 20px"
        />
        <a-tag closable>相机</a-tag>
        <a-tag closable>人像</a-tag>
        <a-tag closable>长焦</a-tag>
        <a-input-group compact>
          <a-input
            style="width: calc(100% - 40px); margin-top: 20px"
            placeholder="商品标签"
          />
          <a-button
            type="primary"
            style="margin-top: 20px; margin-bottom: 20px"
          >
            +
          </a-button>
        </a-input-group>
        <a-input
          placeholder="基础租赁价格"
          prefix="￥"
          suffix="元/天"
          style="float: left; margin-bottom: 20px"
        />
        <a-input
          placeholder="商品押金"
          prefix="￥"
          suffix="元"
          style="float: left; margin-bottom: 20px"
        />
      </a-col>
      <a-col :span="16">
        <h4>封面图片</h4>
        <a-row>
          <!--使图片之间有10px的间距-->
          <a-col :span="8">
            <a-image
              :width="200"
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </a-col>
          <a-col :span="8">
            <a-image
              :width="200"
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </a-col>
          <a-col :span="8">
            <a-upload
              v-model:file-list="fileList"
              list-type="picture-card"
              :show-upload-list="false"
              style="width: 200px; height: 200px"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" :height="200" />
              <div v-else>
                <div class="ant-upload-text">
                  <UploadOutlined />
                  <br />
                  上传封面图片
                </div>
              </div>
            </a-upload>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div>
      <a-row :gutter="16">
        <a-col :span="8" style="text-align: center">
          <h4>商品规格</h4>
          <!--      六行两列的tabel，左侧是规格名称，右侧是规格值使用input-->
          <!--        <a-table :columns="columns" :data-source="data" :pagination="false">-->
          <!--          <template #title></template>-->
          <!--        </a-table>-->
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>品牌</p>
            </a-col>
            <a-col :span="18">
              <a-input placeholder="" style="margin-bottom: 10px" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>型号</p>
            </a-col>
            <a-col :span="18">
              <a-input placeholder="" style="margin-bottom: 10px" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>像素</p>
            </a-col>
            <a-col :span="18">
              <a-input suffix="W" placeholder="" style="margin-bottom: 10px" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>变焦</p>
            </a-col>
            <a-col :span="18">
              <a-input placeholder="" style="margin-bottom: 10px" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>颜色</p>
            </a-col>
            <a-col :span="18">
              <a-select
                placeholder="请选择"
                v-model:value="value"
                :options="options"
                style="margin-bottom: 10px; width: 100%"
              >
                <a-select-option value="0">黑色</a-select-option>
                <a-select-option value="0">白色</a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>尺寸</p>
            </a-col>
            <a-col :span="18">
              <a-input placeholder="" style="margin-bottom: 10px" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>净重</p>
            </a-col>
            <a-col :span="18">
              <a-input suffix="g" placeholder="" style="margin-bottom: 10px" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>传感器类型</p>
            </a-col>
            <a-col :span="18">
              <a-input placeholder="CMOS" style="margin-bottom: 10px" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>传感器尺寸</p>
            </a-col>
            <a-col :span="18">
              <a-input placeholder="全画幅" style="margin-bottom: 10px" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>ISO感光度</p>
            </a-col>
            <a-col :span="18">
              <a-input
                placeholder="ISO 100-51200"
                style="margin-bottom: 10px"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6" style="text-align: center">
              <p>存储介质</p>
            </a-col>
            <a-col :span="18">
              <a-input placeholder="SD卡" style="margin-bottom: 10px" />
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="16">
          <h4>介绍图片</h4>
          <a-row>
            <a-col :span="24">
              <img
                alt="example"
                style="width: calc(100%); height: 200px"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            </a-col>
            <a-col :span="24">
              <a-upload
                v-model:file-list="fileList"
                list-type="picture-card"
                :show-upload-list="false"
                style="width: 200px; height: 200px"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="avatar"
                  :height="200"
                />
                <div v-else>
                  <div class="ant-upload-text">
                    <UploadOutlined />
                    <br />
                    上传介绍图片
                  </div>
                </div>
              </a-upload>
            </a-col>
          </a-row>
          <h4>样片</h4>
          <a-row>
            <a-col :span="8">
              <a-image
                :width="200"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </a-col>
            <a-col :span="8">
              <a-image
                :width="200"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </a-col>
            <a-col :span="8">
              <a-upload
                v-model:file-list="fileList"
                list-type="picture-card"
                :show-upload-list="false"
                style="width: 200px; height: 200px"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="avatar"
                  :height="200"
                />
                <div v-else>
                  <div class="ant-upload-text">
                    <UploadOutlined />
                    <br />
                    上传样片
                  </div>
                </div>
              </a-upload>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-button danger style="width: 100%">删除</a-button>
      </a-col>
      <a-col :span="6">
        <a-button style="width: 100%">保存</a-button>
      </a-col>
      <a-col :span="12">
        <a-button type="primary" style="width: 100%">保存并上架</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { UploadOutlined } from '@ant-design/icons-vue'

  export default {
    name: 'ItemDetail',
    components: {
      UploadOutlined,
    },
    setup() {
      return {
        data: [
          {
            key: '1',
            brand: 'Sony',
            model: 'ZV-1',
            pixel: '2010W',
            color: '黑色/白色',
            zoom: '3倍',
          },
        ],
      }
    },
  }
</script>

<style scoped>
  .ant-row {
    margin-bottom: 10px;
  }
</style>
