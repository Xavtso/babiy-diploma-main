export const prettyWeekDay = (date: string | Date) => {
  const day = new Date(date).getDay()

  switch (day) {
    case 1:
      return 'Пн'
    case 2:
      return 'Вт'
    case 3:
      return 'Ср'
    case 4:
      return 'Чт'
    case 5:
      return 'Пт'
    case 6:
      return 'Сб'
    default:
      return 'Нд'
  }
}
