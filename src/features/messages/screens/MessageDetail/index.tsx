import React from 'react'
import { View, Text } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

import colors from 'constants/colors'
import { MessageRoute } from 'features/types'

const MessageDetail = () => {
  const route: MessageRoute = useRoute()
  const { title, message, timeFrom, sender, time } = route.params

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{title.slice(0, 1)}</Text>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.messageHeader}>
            <Text numberOfLines={1} style={styles.messageTitle}>
              {title}
            </Text>
            <Text style={styles.timeStamp}>{timeFrom}</Text>
          </View>
          <Text numberOfLines={1} style={styles.senderEmail}>
            {sender}
          </Text>
        </View>
      </View>
      <View style={styles.subText}>
        <Text style={styles.timeline}>{time}</Text>
        <View style={styles.border} />
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.messageDetails}>{message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: colors.primaryColors.white,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingBottom: '10%',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    width: 40,
    backgroundColor: colors.primaryColors.primary700,
  },
  avatarText: {
    color: colors.primaryColors.white,
    fontSize: 20,
  },
  headerContent: {
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
    fontSize: 13,
  },
  timeStamp: {
    color: colors.primaryColors.primary200,
    fontSize: 10,
    justifyContent: 'flex-end',
  },
  subText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeline: {
    flexGrow: 0,
    color: colors.primaryColors.primary200,
    fontSize: 10,
    paddingRight: 30,
  },
  border: {
    flexGrow: 1,
    height: 0.3,
    backgroundColor: colors.primaryColors.primary200,
  },
  senderEmail: {
    fontSize: 10.5,
    color: colors.primaryColors.primary300,
  },
  messageContent: {
    paddingVertical: '10%',
  },
  messageDetails: {
    fontSize: 14,
    lineHeight: 27,
    textAlign: 'left',
  },
})

export default MessageDetail
