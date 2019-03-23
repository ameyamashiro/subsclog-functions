export const get4DaysAgoDate = () => {
  const fromDate = new Date()

  fromDate.setHours(0)
  fromDate.setMinutes(0)
  fromDate.setSeconds(0)
  fromDate.setDate(new Date().getDate() - 29)

  return fromDate
}
