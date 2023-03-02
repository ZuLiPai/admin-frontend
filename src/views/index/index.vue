<template>
  <div class="index-container">
    <!--    <version-information />-->
    <statistic-panel></statistic-panel>
    <VersionInformation></VersionInformation>
  </div>
</template>

<script>
  // import VersionInformation from './components/VersionInformation'
  import VersionInformation from '@/views/index/components/VersionInformation.vue'
  import StatisticPanel from '@/views/index/components/StatisticPanel.vue'
  export default {
    name: 'Index',
    // components: { VersionInformation, StaticPanel },
    components: { StatisticPanel, VersionInformation },
  }
</script>
