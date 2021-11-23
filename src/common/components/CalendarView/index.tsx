import { View } from 'native-base'
import React, { useState } from 'react'
import { Calendar, DateObject } from 'react-native-calendars'

import colors from 'constants/colors'

const CalendarView = () => {
  const [markedDates, setMarkedDates] = useState<{
    [name: string]: { selected: boolean; marked: boolean; selectedColor: string }
  }>({})
  const handleDayPress = (day: DateObject) => {
    markedDates[day?.dateString] = { selected: true, marked: true, selectedColor: colors.primaryColors.primary400 }
    setMarkedDates({ ...markedDates })
  }
  return (
    <View>
      <Calendar onDayPress={handleDayPress} markedDates={{ ...markedDates }} />
    </View>
  )
}
export default CalendarView
