import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import routes from 'constants/routes'
import MessageList from 'features/messages/screens/MessageList'
import MessageDetail from 'features/messages/screens/MessageDetail'
import colors from 'constants/colors'

const MessageStack = () => {
  const Stack = createStackNavigator()
  const { messageMain, messageDetail } = routes.mainScreens.messages

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Message"
        component={MessageList}
      />
      <Stack.Screen
        name={messageDetail.screen}
        component={MessageDetail}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  navIconContainer: {
    marginHorizontal: Dimensions.get('screen').width * 0.05,
  },
  header: {
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: colors.primaryColors.background,
  },
  headerDetail: {
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: colors.primaryColors.white,
  },
})

export default MessageStack
