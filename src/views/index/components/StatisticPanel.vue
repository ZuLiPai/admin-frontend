<template>
  <a-row>
    <a-col :lg="12" :xs="24">
      <a-card title="营收数据" :style="{ minHeight: '250px' }">
        <a-row>
          <a-col :span="8">
            <a-statistic
              title="今日销售额"
              :value="todaySaleMoney + '元'"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col :span="8">
            <a-statistic title="本月销售额" :value="monthSaleMoney + '元'" />
          </a-col>
          <a-col :span="8">
            <a-statistic title="押金总额" :value="depositSum + '元'" />
          </a-col>
        </a-row>
        <a-row style="margin-top: 50px">
          <a-col :span="8">
            <a-statistic
              title="今日租赁量"
              :value="todaySaleVolume"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col :span="8">
            <a-statistic title="本月租赁量" :value="monthSaleVolume" />
          </a-col>
          <a-col :span="8">
            <a-statistic title="待归还商品" :value="waitingBack" />
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
  import { onMounted, reactive, ref } from 'vue'
  import { getAllFinance } from '@/api/finance'
  export default {
    name: 'StatisticPanel',
    setup() {
      const data = reactive([])
      const todaySaleMoney = ref()
      const monthSaleMoney = ref()
      const todaySaleVolume = ref()
      const monthSaleVolume = ref()
      const depositSum = ref()
      const waitingBack = ref()
      onMounted(() => {
        refreshPage()
        initChart()
      })
      const refreshPage = () => {
        //Initiate values to zero
        todaySaleMoney.value = 0
        monthSaleMoney.value = 0
        todaySaleVolume.value = 0
        monthSaleVolume.value = 0
        depositSum.value = 0
        waitingBack.value = 0
        //Get data
        getAllFinance().then((resp) => {
          resp.data.forEach((s) => {
            data.push(s)
          })
          const todayDate = new Date()
          const monthFirstDate = new Date(
            todayDate.getFullYear(),
            todayDate.getMonth(),
            1
          )
          data.forEach((t) => {
            if (t.status < 6) {
              depositSum.value = Number(depositSum.value) + Number(t.deposit)
            }
            if (t.status > 1 && t.status < 5) {
              waitingBack.value = Number(waitingBack.value) + 1
            }
            const tDate = new Date(
              t.create_time.substring(0, 4),
              t.create_time.substring(5, 7) - 1,
              t.create_time.substring(8, 10)
            )
            if (tDate >= monthFirstDate) {
              monthSaleVolume.value = Number(monthSaleVolume.value) + 1
              monthSaleMoney.value =
                Number(monthSaleMoney.value) + Number(t.payment)
              if (formatDate(tDate) === formatDate(Date.now())) {
                todaySaleVolume.value = Number(todaySaleVolume.value) + 1
                todaySaleMoney.value +=
                  Number(todaySaleMoney.value) + Number(t.payment)
              }
            }
          })
        })
        //Compute sale data
      }
      function formatDate(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-').toString()
      }
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
      return {
        initChart,
        data,
        todaySaleMoney,
        monthSaleMoney,
        todaySaleVolume,
        monthSaleVolume,
        depositSum,
        waitingBack,
      }
    },
  }
</script>

<style scoped></style>
