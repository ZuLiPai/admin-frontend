<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-card :title="username" style="width: 100%">
          <template #extra>
            <a href="#">{{ itemName }}</a>
          </template>
          <a-rate v-model:value="rating" allow-half disabled></a-rate>
          <p>
            {{ comment }}
          </p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'CommentDetail',
    setup() {},
    data() {
      return {
        itemName: '佳能 Canon 5D Mark IV',
        username: '吉米Green',
        rating: 4.5,
        comment:
          '随附的电池续航有点差，一次飞了20分钟就返航了，有些不太尽兴。不过飞机还算比较新',
      }
    },
  })
</script>

<style scoped></style>
