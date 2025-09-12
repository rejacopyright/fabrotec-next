import { randomStringV2 } from '@helpers'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'

import { dropShadow, labelBackground, tooltipOptions } from './config'

type ChartSeries = {
  name: string
  data: number[]
}

const _series: ChartSeries[] = [
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49],
  },
  {
    name: 'series-2',
    data: [22, 34, 33, 120, 76],
  },
]

interface AreaChartTypes {
  height?: number | 'auto'
  stacked?: boolean
  data?: ChartSeries[]
  categories?: string[]
  formatter?: (val: any) => any
}
let AreaChart: FC<AreaChartTypes> = ({
  height = 'auto',
  stacked = false,
  data = _series,
  categories = ['1', '2', '3', '4', '5'],
  formatter = (val) => val,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [chartIsReady, setChartIsReady] = useState<boolean>(false)

  const chartId = randomStringV2()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  const options: ApexOptions = useMemo(() => {
    return {
      chart: {
        id: chartId,
        toolbar: { show: false },
        fontFamily: 'inherit',
        width: '100%',
        zoom: { enabled: false },
        events: {
          // beforeMount(chart, opt) => '',
          // mounted(chart, opt) => '',
          animationEnd(_chart, _opt) {
            setChartIsReady(true)
          },
        },
      },
      xaxis: {
        categories,
        position: 'bottom',
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
      },
      yaxis: {
        labels: {
          formatter,
        },
      },
      // colors: ['#4caf50', '#ffa947'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.9,
          opacityTo: 0.7,
          stops: [0, 90, 100],
        },
      },
      stroke: { width: 1, curve: 'smooth' },
      grid: {
        show: Boolean(data?.length),
        borderColor: '#eee',
        row: { colors: ['#fff', Boolean(data?.length) ? '#fafafa' : '#fff'] },
      },
      dataLabels: {
        enabled: true,
        formatter: (_val: any, opt: any) => {
          const valueStr: any = opt?.w?.globals?.initialSeries?.[opt?.seriesIndex]?.data[
            opt?.dataPointIndex
          ]
            ?.toString()
            ?.split(',')?.[0]
          return formatter(valueStr)
        },
        // offsetY: -25,
        // style: labelStyle,
        background: labelBackground,
        dropShadow,
      },
      tooltip: tooltipOptions(stacked, formatter),
      legend: { show: true },
    }
  }, [categories, chartId, data?.length, formatter, stacked])

  useEffect(() => {
    if (chartIsReady) {
      ApexCharts.exec(chartId, 'updateOptions', options)
    }
  }, [options, chartIsReady, chartId])

  return (
    <div style={{ height }} className='w-100'>
      <div className='position-relative'>
        <div className='w-100'>
          <Chart options={options} type='area' series={data} height={height} />
        </div>
        {loading && (
          <div
            className='position-absolute d-flex flex-center w-100 bottom-0 bg-white'
            style={{ height: '100%' }}>
            <div className=''>
              <span className='spinner-border w-35px h-35px text-primary opacity-75' />
            </div>
          </div>
        )}
        {!data?.length && !loading && (
          <div
            className='position-absolute d-flex flex-center w-100 bottom-0 bg-white'
            style={{ height: 'calc(100% - 0px)' }}>
            <div className='text-center'>
              <img
                src={'/media/assets/box-1.png'}
                alt='no-data'
                style={{ opacity: 0.75 }}
                className='w-auto h-100px'
              />
              <div className='text-gray-400 fw-normal'>No Data Available</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

AreaChart = memo(AreaChart, (prev: any, next: any) => JSON.stringify(prev) === JSON.stringify(next))
export { AreaChart }
