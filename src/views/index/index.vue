<template>
  <div class="index-container">
    <statistic-panel></statistic-panel>
  </div>
</template>

<script>
  // import VersionInformation from './components/VersionInformation'
  import StatisticPanel from '@/views/index/components/StatisticPanel.vue'
  export default {
    name: 'Index',
    components: { StatisticPanel },
  }
</script>
