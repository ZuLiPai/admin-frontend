<template>
  <a-row>
    <a-col :lg="12" :xs="24">
      <a-card title="相机销售额" :style="{ minHeight: '250px' }">
        <a-row>
          <a-col :span="12">
            <a-statistic
              title="当日销售额"
              :value="11289"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col :span="12">
            <a-statistic title="近30日销售额" :value="839279" />
          </a-col>
        </a-row>
        <a-row style="margin-top: 50px">
          <a-col :span="12">
            <a-statistic
              title="近30日销售量"
              :value="173"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col :span="12">
            <a-statistic title="待归还数量" :value="108" />
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :lg="12" :xs="24">
      <a-card title="相机订单">
        <a-row :style="{ minHeight: '250px' }">
          <a-col :span="12">
            <div
              id="chartTransactionCategory"
              :style="{ height: '100%', width: '100%' }"
            ></div>
          </a-col>
          <a-col :span="12">
            <div
              id="chartTransactionBrand"
              :style="{ height: '100%', width: '100%' }"
            ></div>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
  <a-row>
    <a-col :lg="12" :xs="24">
      <a-card title="评价">
        <a-row :style="{ minHeight: '250px' }">
          <a-col :span="24">
            <div
              id="chartRating"
              :style="{ height: '100%', width: '100%' }"
            ></div>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :lg="12" :xs="24">
      <a-card title="工单数量">
        <a-row :style="{ minHeight: '250px' }">
          <a-col :span="24">
            <div
              id="chartTicket"
              :style="{ height: '100%', width: '100%' }"
            ></div>
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
    name: 'StatisticPanel',
    setup() {
      onMounted(() => {
        initChart()
      })

      function initChart() {
        let chartTransactionCategory = echarts.init(
          document.getElementById('chartTransactionCategory')
        )
        chartTransactionCategory.setOption({
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: '相机类型',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: '镜头' },
                { value: 835, name: '相机' },
                { value: 300, name: '无人机' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        })

        let chartTransactionBrand = echarts.init(
          document.getElementById('chartTransactionBrand')
        )
        chartTransactionBrand.setOption({
          tooltip: {
            trigger: 'item',
          },
          yAxis: {
            type: 'category',
            data: ['佳能', '索尼', '大疆', '尼康', '富士'],
          },
          xAxis: {
            type: 'value',
          },
          series: [
            {
              data: [298, 200, 150, 80, 70],
              type: 'bar',
              color: '#66ccff',
            },
          ],
        })

        let chartRating = echarts.init(document.getElementById('chartRating'))
        chartRating.setOption({
          tooltip: {
            trigger: 'item',
          },
          xAxis: {
            type: 'category',
            data: ['1星', '2星', '3星', '4星', '5星'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [12, 10, 15, 11, 40],
              type: 'bar',
              color: '#e36c6c',
            },
          ],
        })

        let chartTicket = echarts.init(document.getElementById('chartTicket'))
        chartTicket.setOption({
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['总工单数量', '已处理工单'],
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '总工单数量',
              data: [82, 93, 90, 108, 129, 133, 132],
              type: 'line',
              smooth: true,
            },
            {
              name: '已处理工单',
              data: [135, 120, 110, 90, 80, 75, 60],
              type: 'line',
              smooth: true,
            },
          ],
        })

        window.onresize = function () {
          //自适应大小
          chartTransactionCategory.resize()
          chartTransactionBrand.resize()
          chartRating.resize()
          chartTicket.resize()
        }
      }
      return { initChart }
    },
  }
</script>

<style scoped></style>
