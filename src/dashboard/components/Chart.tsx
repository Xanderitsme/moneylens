import { onCleanup, onMount } from 'solid-js'
import * as echarts from 'echarts'

const getDates = (from: Date, count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const currentDate = new Date(from.getTime() + 1000 * 60 * 60 * 24 * i)
    const dateString = currentDate.toISOString().slice(0, 10)

    return dateString
  })
}

const roundTo = (num: number, digits = 2) => {
  return Number(num.toFixed(digits))
}

const generateRandomData = (min: number, max: number, count: number) => {
  return Array.from({ length: count }).map(() => {
    return roundTo(Math.random() * max + min) + 1
  })
}

export const Chart = () => {
  let containerRef!: HTMLDivElement
  let chart: echarts.ECharts | null

  onMount(() => {
    const dataCount = 30
    const maxIncome = 290
    const maxOutcome = 250
    const maxYAxis = maxIncome + 10
    const yAxisInterval = 50

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true }
        }
      },
      legend: {
        data: ['Income', 'Outcome']
      },
      xAxis: [
        {
          type: 'category',
          data: getDates(new Date(), dataCount),
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Amount',
          min: 0,
          max: maxYAxis,
          interval: yAxisInterval,
          axisLabel: {
            formatter: 'S/. {value}'
          }
        }
      ],
      series: [
        {
          name: 'Income',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: any) {
              return 'S/. ' + value
            }
          },
          data: generateRandomData(0, maxIncome, dataCount),
          color: '#00bba7'
        },
        {
          name: 'Outcome',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: any) {
              return 'S/. ' + value
            }
          },
          data: generateRandomData(0, maxOutcome, dataCount),
          color: '#bb0000'
        }
      ]
    }

    setTimeout(() => {
      chart = echarts.init(containerRef, '', { renderer: 'svg' })

      chart.setOption(option)
    }, 50)
  })

  onCleanup(() => {
    chart?.dispose()
  })

  return <div ref={containerRef} class="h-[500px] w-[1400px]"></div>
}
