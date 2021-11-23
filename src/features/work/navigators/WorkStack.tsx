import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { View } from 'native-base'

import BackButton from 'common/components/BackButton'
import JobItem from 'features/positions/components/JobItem'
import WorkShifts from 'features/work/screens/WorkShifts'
import routes from 'constants/routes'

const width = Dimensions.get('screen').width * 0.05

const WorkStack = () => {
  const Stack = createStackNavigator()
  const { workMain } = routes.mainScreens.work
  return (
    <Stack.Navigator initialRouteName="HomeMain">
      <Stack.Screen
        name={workMain.screen}
        component={WorkShifts}
        options={{
          headerStyle: styles.header,
          headerTitle: 'Work',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobItem}
        options={{
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BackButton isWhite />
            </View>
          ),
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
  navIconContainer: {
    marginLeft: width,
    marginRight: width,
  },
  header: {
    shadowColor: 'transparent',
    elevation: 0,
  },
})

export default WorkStack
