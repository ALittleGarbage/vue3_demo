import dayjs from 'dayjs'

export const timeFormat = (row, column, datetime) => {
  return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')
}
