import { Text, View } from 'native-base'
import React from 'react'
import { StyleSheet, FlatList } from 'react-native'

import MessageItem from 'features/messages/components/messageItem'
import { messages } from 'features/messages/data'

const MessageList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.messages}>ALL MAIL</Text>
      <View style={styles.messagesPreview}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <MessageItem {...item} />
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
    paddingBottom: 10,
  },

  messages: {
    fontWeight: '400',
    marginTop: 20,
    fontSize: 11,
  },
  messagesPreview: {
    flex: 1,
  },
})
export default MessageList
