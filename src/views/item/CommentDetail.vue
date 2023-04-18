<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-card :title="username" style="width: 100%">
          <template #extra>
            <span>产品:{{ item_name }}</span>
          </template>
          <a-rate v-model:value="rating_num" disabled></a-rate>
          <p>
            {{ content }}
          </p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import { defineComponent, onMounted, onUpdated, ref } from 'vue'
  export default defineComponent({
    name: 'CommentDetail',
    props: ['username', 'rating', 'item_name', 'content'],
    setup(props) {
      let rating_num = ref()
      onMounted(() => {
        rating_num.value = Number(props.rating)
      })
      onUpdated(() => {
        rating_num.value = Number(props.rating)
      })
      return {
        rating_num,
      }
    },
  })
</script>

<style scoped></style>
