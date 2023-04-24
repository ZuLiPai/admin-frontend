<template>
  <a-row>
    <a-col :lg="12" :xs="24">
      <a-card title="营收数据" :style="{ minHeight: '250px' }">
        <div :style="{ height: '250px', width: '100%' }">
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
        </div>
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
      <a-card title="评价数据">
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
  import { getComments, getOrderList } from '@/api/order'
  import { getAllTickets } from '@/api/ticket'
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
      const comments = []
      const rating = ref([])
      const order = []
      const itemType = ['相机', '镜头', '无人机', '配件']
      const itemVolume = []
      const messages = []
      const allTicketsStatistic = [0, 0, 0, 0, 0, 0, 0]
      const handledTicketStatistic = [0, 0, 0, 0, 0, 0, 0]
      const todayDate = new Date()
      const monthFirstDate = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1
      )
      const datesArray = []
      onMounted(() => {
        for (let i = 0; i < 7; i++) {
          let date = new Date()
          date.setDate(todayDate.getDate() - 6 + i)
          datesArray.push(date.toISOString().slice(0, 10))
        }
        refreshPage()
      })
      const refreshPage = () => {
        //Initiate values to zero
        todaySaleMoney.value = 0
        monthSaleMoney.value = 0
        todaySaleVolume.value = 0
        monthSaleVolume.value = 0
        depositSum.value = 0
        waitingBack.value = 0
        //First Card
        getAllFinance().then((resp) => {
          resp.data.forEach((s) => {
            data.push(s)
          })
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
        //Second Card
        getOrderList().then((resp) => {
          resp.data.forEach((r) => {
            order.push(r)
          })
          let camera = 0
          let len = 0
          let uav = 0
          let acs = 0
          order.forEach((t) => {
            if (t.item_type === itemType[0]) camera += 1
            else if (t.item_type === itemType[1]) len += 1
            else if (t.item_type === itemType[2]) uav += 1
            else if (t.item_type === itemType[3]) acs += 1
          })
          itemVolume.push(camera)
          itemVolume.push(len)
          itemVolume.push(uav)
          itemVolume.push(acs)
        })
        //Third Card
        getComments().then((resp) => {
          resp.data.forEach((r) => {
            comments.push(r)
          })
          let one = 0
          let two = 0
          let three = 0
          let four = 0
          let five = 0
          comments.forEach((t) => {
            if (Number(t.rating) === 5) {
              five += 1
            } else if (Number(t.rating) === 4) {
              four += 1
            } else if (Number(t.rating) === 3) {
              three += 1
            } else if (Number(t.rating) === 2) {
              two += 1
            } else if (Number(t.rating) === 1) {
              one += 1
            }
          })
          rating.value.push(one)
          rating.value.push(two)
          rating.value.push(three)
          rating.value.push(four)
          rating.value.push(five)
          console.log(rating.value)
        })

        //Fourth Card
        getAllTickets()
          .then((resp) => {
            resp.data.forEach((r) => {
              messages.push(r)
            })
            messages.forEach((t) => {
              const ticketDateString = t.ticket_time.slice(0, 10)
              const ticketDate = new Date(
                t.ticket_time.substring(0, 4),
                t.ticket_time.substring(5, 7) - 1,
                t.ticket_time.substring(8, 10)
              )
              const earlierDate = new Date(
                datesArray[0].substring(0, 4),
                datesArray[0].substring(5, 7) - 1,
                datesArray[0].substring(8, 10)
              )
              if (ticketDate >= earlierDate) {
                for (let i = 0; i < 7; i++) {
                  if (ticketDateString === datesArray[i]) {
                    allTicketsStatistic[i] += 1
                    if (t.ticket_status === 'true') {
                      handledTicketStatistic[i] += 1
                    }
                  }
                }
              }
            })
          })
          .then(() => initChart())
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
              name: '商品类型',
              type: 'pie',
              radius: '50%',
              data: [
                { value: itemVolume[0], name: itemType[0] },
                { value: itemVolume[1], name: itemType[1] },
                { value: itemVolume[2], name: itemType[2] },
                { value: itemVolume[3], name: itemType[3] },
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
              data: rating.value,
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
            data: ['新工单数量', '当日处理量'],
          },
          xAxis: {
            type: 'category',
            data: datesArray,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '新工单数量',
              data: allTicketsStatistic,
              type: 'line',
              smooth: true,
            },
            {
              name: '当日处理量',
              data: handledTicketStatistic,
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
