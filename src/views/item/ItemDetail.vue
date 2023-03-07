<template>
  <div>
    <a-row :gutter="16">
      <a-col :lg="12" :xs="24">
        <a-image
          :width="200"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </a-col>
      <a-col :lg="12" :xs="24">
        <a-input placeholder="相机名称" style="float: left" />
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12" style="float: right">
        <a-tag closable>Tag 1</a-tag>
        <a-tag closable>Tag 2</a-tag>
        <a-tag closable>Tag 3</a-tag>
      </a-col>
      <a-col :span="12">
        <a-input-group compact>
          <a-input style="width: calc(100% - 200px)" placeholder="相机标签" />
          <a-button type="primary">+</a-button>
        </a-input-group>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-textarea placeholder="相机详细描述" :rows="16" />
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-button danger style="width: 100%">删除</a-button>
      </a-col>
      <a-col :span="18">
        <a-button type="primary" style="width: 100%">保存</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'ItemDetail',
  }
</script>

<style scoped>
  .ant-row {
    margin-bottom: 10px;
  }
</style>
