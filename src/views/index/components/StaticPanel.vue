<template>
  <a-row>
    <a-col :xl="12" :xs="24">
      <a-card>
        <a-row>
          <a-col :span="12">
            <a-statistic
              title="Active Users"
              :value="112893"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col :span="12">
            <a-statistic
              title="Account Balance (CNY)"
              :precision="2"
              :value="112893"
            />
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :xl="12" :xs="24">
      <!--      <div id="myEcharts" :style="{ width: '900px', height: '300px' }"></div>-->
      <a-card>
        <a-row>
          <a-col :span="12">
            <a-statistic
              title="Active Users"
              :value="112893"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col :span="12">
            <a-statistic
              title="Account Balance (CNY)"
              :precision="2"
              :value="112893"
            />
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
  <a-row>
    <a-col :xl="12" :xs="24">
      <a-card>
        <a-row>
          <a-col :span="12">
            <a-statistic
              title="Active Users"
              :value="112893"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col :span="12">
            <a-statistic
              title="Account Balance (CNY)"
              :precision="2"
              :value="112893"
            />
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :xl="12" :xs="24">
      <a-card>
        <a-row>
          <a-col :span="12">
            <a-statistic
              title="Active Users"
              :value="112893"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col :span="12">
            <a-statistic
              title="Account Balance (CNY)"
              :precision="2"
              :value="112893"
            />
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
  import * as echarts from 'echarts'
  import { onMounted } from 'vue'
  export default {
    name: 'StaticPanel',
    setup() {
      let echart = echarts
      onMounted(() => {
        // initChart()
      })

      function initChart() {
        let chart = echart.init(document.getElementById('myEcharts'))
        chart.setOption({
          xAxis: {
            type: 'category',
            data: [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              '七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月',
            ],
          },
          tooltip: {
            trigger: 'axis',
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [
                820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 4321, 4129,
              ],
              type: 'line',
              smooth: true,
            },
          ],
        })
        window.onresize = function () {
          //自适应大小
          chart.resize()
        }
      }
      return { initChart }
    },
  }
</script>

<style scoped></style>
