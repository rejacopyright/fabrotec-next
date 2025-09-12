import moment, { Moment } from 'moment'

type TimeUnits = {
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}
type DurationResult = {
  text: string
  units: TimeUnits
}
type TrialStatus = 'upcoming' | 'active' | 'expired'
type TrialResult = {
  startDate: Moment
  endDate: Moment
  status: TrialStatus
  endsIn?: DurationResult
}

export const formatDuration = (startDate: Moment, endDate: Moment): DurationResult => {
  const duration = moment.duration(moment(endDate).diff(moment(startDate)))
  const parts: string[] = []

  const rawUnits: { [key: string]: number } = {
    years: duration.years(),
    months: duration.months(),
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  }

  const id = {
    years: 'tahun',
    months: 'bulan',
    days: 'hari',
    hours: 'jam',
    minutes: 'menit',
    seconds: 'detik',
  }

  const nonZeroUnits = {}
  for (const [unit, value] of Object.entries(rawUnits)) {
    if (value > 0) {
      parts.push(`${value} ${id?.[unit]}`)
      nonZeroUnits[unit] = value
    }
  }

  const text = parts?.length > 0 ? parts?.join(' ') : 'kurang dari satu detik'
  return { text, units: nonZeroUnits }
}

export const getDuration = (start_date: string, in_days: number): TrialResult | undefined => {
  if (!start_date || !in_days) {
    return undefined
  }

  const startDate = moment(start_date)
  const endDate = startDate.clone().add(in_days, 'days').subtract(1, 'millisecond')
  const now = moment()

  const res: any = { startDate, endDate }

  if (now.isBefore(startDate)) {
    res.status = 'upcoming'
  } else if (now.isBetween(startDate, endDate, null, '[)')) {
    const formattedDuration = formatDuration(now, endDate)
    res.status = 'active'
    res.endsIn = formattedDuration
  } else {
    res.status = 'expired'
  }
  return res
}
