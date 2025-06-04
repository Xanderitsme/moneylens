import { onCleanup, onMount } from 'solid-js'
import ChartJS from 'chart.js/auto'
import { useLazyInit } from '@/core/hooks/useObserver'
import { cn } from '@/core/lib/utils'

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

const generateRandomData = (
  min: number,
  max: number,
  count: number,
  isNegative?: boolean,
  maxVariation?: number
) => {
  let lastGenerated = min
  const variation = maxVariation || (max - min) * 0.1

  return Array.from({ length: count }).map(() => {
    const randomVariation = (Math.random() - 0.5) * 2 * variation

    let newValue = lastGenerated + randomVariation

    newValue = Math.max(min, Math.min(max, newValue))

    newValue = roundTo(newValue)

    const finalValue = newValue * (isNegative ? -1 : 1)

    lastGenerated = newValue

    return finalValue
  })
}

interface ChartProps {
  class?: string
}

export const Chart = ({ class: className }: ChartProps) => {
  let canvasRef!: HTMLCanvasElement
  let chart: ChartJS | null

  const setupChart = (canvas: HTMLCanvasElement) => {
    const dataCount = 30
    const maxIncome = 300
    const maxOutcome = 300

    chart = new ChartJS(canvas, {
      type: 'line',
      data: {
        labels: getDates(new Date(), dataCount),
        datasets: [
          {
            label: 'Income',
            data: generateRandomData(0, maxIncome, dataCount, false, 50),
            tension: 0.3,
            borderColor: '#5ebfbf',
            pointStyle: 'circle',
            pointRadius: 0,
            pointHoverRadius: 4,
            backgroundColor: '#5ebfbf'
          },
          {
            label: 'Expense',
            data: generateRandomData(0, maxOutcome, dataCount, true, 30),
            tension: 0.3,
            borderColor: '#f66986',
            pointStyle: 'circle',
            pointRadius: 0,
            pointHoverRadius: 4,
            backgroundColor: '#f66986'
          }
        ]
      },
      options: {
        responsive: true,
        // plugins: {
        //   title: {
        //     display: true,
        //     text: 'Incomes vs Outcomes (Last 30 days)',
        //     color: '#ffffff'
        //   }
        // },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    })
  }

  const observeCanvas = useLazyInit(setupChart)

  onMount(() => {
    observeCanvas(canvasRef)
  })

  onCleanup(() => {
    chart?.destroy()
  })

  return (
    <section
      class={cn('w-full flex flex-col items-center max-w-5xl', className)}
    >
      <h3>Incomes and Expenses in the last 30 days</h3>
      <div class="w-full flex overflow-x-auto overflow-y-hidden scrollbar-thin">
        <div class="w-full min-w-80 aspect-[2/1]">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </section>
  )
}
