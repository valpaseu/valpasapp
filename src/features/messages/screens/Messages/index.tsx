import { Text, View } from 'native-base'
import React from 'react'
import { StyleSheet, FlatList } from 'react-native'

import colors from 'constants/colors'
import { messages } from 'features/messages/data'
import MessageItem from 'features/messages/components/messageItem'

const MessageList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.messages}>ALL MAIL</Text>
      <View style={styles.messagesPreview}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const { title, message, time, image } = item
            return <MessageItem title={title} message={message} time={time} image={image} />
          }}
          showsVerticalScrollIndicator={false}
          style={{ height: '100%' }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.textColors.white,
    paddingHorizontal: 24,
    flex: 1,
    paddingBottom: 10,
  },
  messages: {
    paddingVertical: 10,
    color: colors.primaryColors.primary300,
    fontSize: 12,
  },
  messagesPreview: {
    flex: 1,
  },
})
export default MessageList
