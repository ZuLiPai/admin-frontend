<template>
  <div class="index-container">
    <!--    <version-information />-->
    <static-panel></static-panel>
  </div>
</template>

<script>
  // import VersionInformation from './components/VersionInformation'
  import StaticPanel from './components/StaticPanel.vue'
  export default {
    name: 'Index',
    // components: { VersionInformation, StaticPanel },
    components: { StaticPanel },
  }
</script>
