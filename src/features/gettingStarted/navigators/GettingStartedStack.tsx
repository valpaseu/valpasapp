import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import routes from 'constants/routes'
import Drawer from 'common/components/Drawer'
import GettingStartedScreen from 'features/gettingStarted/screens/GettingStarted'
import AuthenticationStack from 'features/authentication/navigator/AuthenticationStack'

function GettingStartedStack() {
  const Stack = createStackNavigator()
  const { authentication, gettingStarted, mainScreens } = routes

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name={gettingStarted.screen} component={GettingStartedScreen} />
      <Stack.Screen name={mainScreens.stack} component={Drawer} />
      <Stack.Screen name={authentication.stack} component={AuthenticationStack} />
    </Stack.Navigator>
  )
}

export default GettingStartedStack
