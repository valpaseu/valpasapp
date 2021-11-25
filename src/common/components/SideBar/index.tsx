import { DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer'
import React, { FC } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import color from 'constants/colors'
import size from 'constants/size'
import routes from 'constants/routes'

const SideBar: FC<Pick<DrawerContentComponentProps, 'navigation' | 'state'>> = ({ navigation, state }) => {
  const { home, positions, messages, onBoarding, profile, work, city } = routes.mainScreens

  const drawerMap = [
    { labelName: 'Home', route: home.screen },
    { labelName: 'Positions', route: positions.stack },
    { labelName: 'Work', route: work.screen },
    { labelName: 'Cities', route: city.screen },
    { labelName: 'Messages', route: messages.stack },
    { labelName: 'Profile', route: profile.stack },
    { labelName: 'Onboarding', route: onBoarding.stack },
  ]

  const mockMainScreenRouteState = {
    index: 0,
    routes: [{ name: home.screen }],
  }

  const mainScreenRouteState = state.routes[0].state ? state.routes[0].state : mockMainScreenRouteState

  return (
    <View style={styles.container}>
      {drawerMap.map(({ labelName, route }) => (
        <DrawerItem
          key={`drawerLabel-${labelName}`}
          labelStyle={styles.link}
          label={labelName}
          focused={mainScreenRouteState.index === mainScreenRouteState.routes.findIndex((r) => r.name === route)}
          activeBackgroundColor="transparent"
          activeTintColor={color.drawer.activeLink}
          inactiveTintColor={color.drawer.inactiveLink}
          onPress={() => navigation.navigate(route)}
        />
      ))}
    </View>
  )
}

const smallScreen = Dimensions.get('screen').width < 330

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.drawer.background,
    paddingLeft: '10%',
  },
  link: {
    fontSize: smallScreen ? size.sideBar.linkTextSmall : size.sideBar.linkTextBig,
    fontWeight: '600',
    marginTop: smallScreen ? '-15%' : '0%',
    letterSpacing: 1.2,
  },
})

export default SideBar
