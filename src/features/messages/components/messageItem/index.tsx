import { View, Text } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

import colors from 'constants/colors'
import routes from 'constants/routes'
import { MessageitemProps } from 'features/types'

const MessageItem = ({ title, message, time, image, sender }: MessageitemProps) => {
  const navigation = useNavigation()

  const timeStamp = moment(time).format('LT') as string
  const timeMoment = moment(time).fromNow()
  const fullDate = moment(time).format('ddd.D MMM YYYY  h:mm:ss')
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routes.mainScreens.messages.messageDetail.screen, {
          title,
          message,
          time: fullDate,
          timeFrom: timeMoment,
          image,
          sender,
        })
      }
    >
      <View style={styles.messageCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{title.slice(0, 1)}</Text>
        </View>
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text numberOfLines={1} style={styles.messageTitle}>
              {title}
            </Text>
            <Text style={styles.timeStamp}>{timeStamp}</Text>
          </View>
          <Text numberOfLines={1} style={styles.messageBody}>
            {message.replace(/\s+/g, ' ')}
          </Text>
        </View>
      </View>
      <View style={styles.borderBottom} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  messageCard: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  borderBottom: {
    borderBottomColor: colors.primaryColors.primary400,
    borderBottomWidth: 0.5,
    width: '80%',
    alignSelf: 'flex-end',
  },
  avatar: {
    borderRadius: 50,
    height: 40,
    width: 40,
    backgroundColor: colors.primaryColors.primary700,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.primaryColors.white,
    fontSize: 20,
  },
  messageContent: {
    flexDirection: 'column',
    width: '80%',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  messageTitle: {
    fontWeight: '400',
    fontSize: 12,
    width: '80%',
  },
  timeStamp: {
    fontWeight: '100',
    fontSize: 10,
  },
  messageBody: {
    fontSize: 11.5,
    color: colors.primaryColors.primary300,
  },
})

export default MessageItem
