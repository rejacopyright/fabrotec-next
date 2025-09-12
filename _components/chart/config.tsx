import { ApexOptions } from 'apexcharts'

export const dropShadow: NonNullable<ApexOptions['dataLabels']>['dropShadow'] = {
  enabled: false,
  top: 0.5,
  left: 0.5,
  blur: 1,
  color: '#000',
  opacity: 0.5,
}

export const labelStyle: NonNullable<ApexOptions['dataLabels']>['style'] = {
  fontSize: '11px',
  fontWeight: 400,
  colors: ['#f26d26'],
}

export const labelBackground: NonNullable<ApexOptions['dataLabels']>['background'] = {
  enabled: true,
  foreColor: '#fff',
  borderRadius: 5,
  borderWidth: 0,
  padding: 5,
}

export const legendStyle: ApexOptions['legend'] = {
  fontSize: '11px',
  fontWeight: 500,
  labels: {
    colors: ['#181c32'],
    useSeriesColors: false,
  },
}

export const tooltipOptions = (
  stacked: boolean,
  formatter?: (val: any) => any
): ApexOptions['tooltip'] => ({
  enabled: true,
  enabledOnSeries: undefined,
  shared: stacked,
  followCursor: false,
  intersect: false,
  inverseOrder: false,
  custom: undefined,
  fillSeriesColor: false,
  theme: 'dark',
  style: {
    fontSize: '7pt',
    fontFamily: 'inherit',
  },
  onDatasetHover: {
    highlightDataSeries: false,
  },
  x: {
    show: true,
    formatter: undefined,
  },
  y: {
    formatter,
    title: {
      formatter: (seriesName: any) => seriesName,
    },
  },
  z: {
    formatter: undefined,
  },
  marker: {
    show: true,
  },
  items: {
    display: 'flex',
  },
  fixed: {
    enabled: false,
    position: 'topRight',
    offsetX: 0,
    offsetY: 0,
  },
})
