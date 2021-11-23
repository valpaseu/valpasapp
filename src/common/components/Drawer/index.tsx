import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

import color from 'constants/colors'
import routes from 'constants/routes'
import City from 'features/city/screens/City'
import HomeStack from 'features/home/navigators/HomeStack'
import OnBoardingStack from 'features/onBoarding/navigators/OnBoardingStack'
import PositionStack from 'features/positions/navigators/PositionStack'
import GettingStarted from 'features/gettingStarted/screens/GettingStarted'
import AuthenticationStack from 'features/authentication/navigator/AuthenticationStack'
import SideBar from 'common/components/SideBar'
import MessageStack from 'features/messages/navigators/MessageStack'
import WorkStack from 'features/work/navigators/WorkStack'
import Profile from 'features/profile/screens/Profile'

const Drawer = () => {
  const { mainScreens, gettingStarted, authentication } = routes
  const { home, positions, work, city, messages, onBoarding, profile } = mainScreens

  const screens = [
    { route: home.screen, component: HomeStack },
    { route: positions.stack, component: PositionStack },
    { route: work.screen, component: WorkStack },
    { route: city.screen, component: City },
    { route: messages.stack, component: MessageStack },
    { route: onBoarding.stack, component: OnBoardingStack },
    { route: profile.screen, component: Profile },
  ]

  const DrawerNav = createDrawerNavigator()
  const Stack = createStackNavigator()

  const [progress] = useState<Animated.Node<number>>(new Animated.Value(0))
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  })
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, -screenWidth * 0.2],
  })
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 25],
  })

  return (
    <DrawerNav.Navigator
      screenOptions={{
        drawerType: "slide",
        overlayColor: "transparent",
        drawerStyle: styles.drawer,
        sceneContainerStyle: { backgroundColor: color.drawer.background },
      }}

      drawerContent={({ navigation, state }) => {
        return <SideBar navigation={navigation} state={state} />
      }}


    >
      <DrawerNav.Screen name={mainScreens.stack} options={{ gestureEnabled: true }}>
        {() => (
          <Animated.View style={{ ...styles.animatedViewParent, transform: [{ scale, translateX }] }}>
            <Animated.View style={{ ...styles.animatedViewChild, borderRadius }}>
              <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
                {screens.map(({ route, component }, index) => (
                  <Stack.Screen key={index} name={route} component={component} />
                ))}
              </Stack.Navigator>
            </Animated.View>
          </Animated.View>
        )}
      </DrawerNav.Screen>
      <DrawerNav.Screen
        name={gettingStarted.screen}
        component={GettingStarted}
        options={{ swipeEnabled: false, headerShown: false }}
      />
      <DrawerNav.Screen
        name={authentication.stack}
        component={AuthenticationStack}
        options={{ swipeEnabled: false, headerShown: false }}
      />
    </DrawerNav.Navigator>
  )
}

const { width: screenWidth } = Dimensions.get('screen')

const styles = StyleSheet.create({
  drawer: {
    width: screenWidth * 0.65,
  },
  animatedViewParent: {
    flex: 1,
    shadowColor: color.primaryColors.primary100,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  animatedViewChild: {
    flex: 1,
    overflow: 'hidden',
    elevation: 5,
  },
})

export default Drawer
