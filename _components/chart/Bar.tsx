import { ApexOptions } from 'apexcharts'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'

import { dropShadow, labelBackground, labelStyle, legendStyle, tooltipOptions } from './config'

let BarChart: FC<any> = ({ height = 'auto', stacked = false, data = [] }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const series: any = useMemo(() => [{ name: 'series-1', data }], [data])

  useEffect(() => {
    // setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  const options: ApexOptions = {
    chart: {
      toolbar: { show: stacked },
      fontFamily: 'inherit',
      width: '100%',
      stacked,
      events: {
        dataPointSelection: () => '',
        legendClick: () => '',
      },
    },
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      position: 'bottom',
      tickPlacement: 'between',
      labels: {
        show: series?.length,
        offsetY: 0,
        rotate: -45,
        rotateAlways: false,
        style: { fontSize: '8pt', fontWeight: 600 },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      labels: {
        show: false,
        formatter: function (val: any) {
          return val
        },
      },
    },
    colors: ['#ffc000'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
    legend: {
      show: true,
      floating: false,
      position: 'bottom',
      horizontalAlign: 'center',
      ...legendStyle,
    },
    title: {
      text: undefined,
      floating: true,
      offsetY: 0,
      align: 'center',
      style: { fontSize: '12px', color: '#444' },
    },
    noData: {
      text: undefined,
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: -25,
      style: { color: '#aaa', fontSize: '12px', fontFamily: 'inherit' },
    },
    stroke: { width: 0 },
    grid: {
      show: series?.length,
      borderColor: '#eee',
      row: { colors: ['#fff', series?.length ? '#fafafa' : '#fff'] },
    },
    dataLabels: {
      enabled: true,
      formatter: (_val: any, opt: any) => {
        const valueStr: any = opt?.w?.globals?.initialSeries?.[opt?.seriesIndex]?.data[
          opt?.dataPointIndex
        ]
          ?.toString()
          ?.split(',')?.[0]
          ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        return valueStr
      },
      offsetY: -25,
      style: labelStyle,
      background: labelBackground,
      dropShadow,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusApplication: 'end',
        columnWidth: '50%',
        horizontal: false,
        distributed: false,
        dataLabels: { position: 'top' },
      },
    },
    tooltip: tooltipOptions(stacked),
  }

  return (
    <div style={{ height }} className='w-100'>
      <div className='position-relative'>
        <Chart options={options} type='bar' series={series} height={height} />
        {loading && (
          <div
            className='position-absolute d-flex flex-center w-100 bottom-0 bg-white'
            style={{ height: '100%' }}>
            <div className=''>
              <span className='spinner-border w-35px h-35px text-primary opacity-75' />
            </div>
          </div>
        )}
        {!series?.length && !loading && (
          <div
            className='position-absolute d-flex flex-center w-100 bottom-0 bg-white'
            style={{ height: 'calc(100% - 30px)' }}>
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

BarChart = memo(BarChart, (prev: any, next: any) => JSON.stringify(prev) === JSON.stringify(next))
export { BarChart }
