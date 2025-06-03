import { onCleanup, onMount } from 'solid-js'
import ChartJS from 'chart.js/auto'
import { useLazyInit } from '@/core/hooks/useObserver'

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

export const Chart2 = () => {
  let canvasRef!: HTMLCanvasElement
  let chart: ChartJS | null

  const setupChart = (canvas: HTMLCanvasElement) => {
    const dataCount = 30
    const maxIncome = 290
    const maxOutcome = 250

    chart = new ChartJS(canvas, {
      type: 'bar',
      data: {
        labels: getDates(new Date(), dataCount),
        datasets: [
          {
            label: 'Income',
            data: generateRandomData(0, maxIncome, dataCount),
            // tension: 0.3,
            borderColor: '#5ebfbf',
            pointStyle: 'circle',
            // pointRadius: 0,
            // pointHoverRadius: 6,
            backgroundColor: '#5ebfbf'
          },
          {
            label: 'Outcome',
            data: generateRandomData(0, maxOutcome, dataCount),
            // tension: 0.3,
            borderColor: '#f66986',
            pointStyle: 'circle',
            // pointRadius: 0,
            // pointHoverRadius: 6,
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
    <div class="flex justify-center">
      <section class="w-full flex flex-col items-center max-w-5xl">
        <h3>Incomes vs Outcomes (Last 30 days)</h3>
        <div class="w-full flex overflow-x-auto overflow-y-hidden scrollbar-thin">
          <div class="w-full min-w-80 aspect-video">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </section>
    </div>
  )
}
