import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import colors from 'constants/colors'
import Home from 'features/home/screens/Home'
import JobItem from 'features/positions/components/JobItem'

const width = Dimensions.get('screen').width * 0.05

const HomeStack = () => {
  const Stack = createStackNavigator()
  const navigation = useNavigation()
  return (
    <Stack.Navigator initialRouteName="HomeMain">
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{
          headerStyle: styles.header,
          headerTitle: 'Homepage',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobItem}
        options={{
          headerStyle: styles.header,
          headerTitle: '',
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: colors.primaryColors.primary400,
  },
})

export default HomeStack
