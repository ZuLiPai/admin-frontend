<template>
  <div>
    <h1>创建工单</h1>
    <div>
      <a-row>
        <a-col span="24">
          <a-form>
            <a-form-item
              :rules="[{ required: true, message: '请选择工单用户!' }]"
              label="用户"
              name="user"
            >
              <a-select placeholder="选择发起工单的用户">
                <a-select-option value="gong">Gong</a-select-option>
                <a-select-option value="fiery">Fiery</a-select-option>
              </a-select>
              <!--              TODO: Use Search and Select Users-->
              <!--              https://antdv.com/components/select -->
            </a-form-item>
            <a-form-item
              label="标题"
              name="title"
              :rules="[{ required: true, message: '请输入工单标题' }]"
            >
              <a-input />
            </a-form-item>
            <a-form-item
              name="text"
              label="内容"
              :rules="[{ required: true, message: '请填写工单内容!' }]"
            >
              <a-textarea :auto-size="{ minRows: 5, maxRows: 10 }" />
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                size="large"
                html-type="submit"
                style="width: 100%"
              >
                提交
              </a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateTicket',
  }
</script>

<style scoped></style>
