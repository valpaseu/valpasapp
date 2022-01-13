import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import colors from '../../../constants/colors'
import routes from '../../../constants/routes'
import BackButton from 'common/components/BackButton'
import PositionAdd from 'features/positions/screens/PositionAdd'
import PositionList from 'features/positions/screens/PositionList'
import ApplyNow from 'features/positions/screens/ApplyNow'
import BurgerMenu from 'common/components/BurgerMenu'
import SearchBar from 'common/components/Search'

const width = Dimensions.get('screen').width * 0.05

const PositionStack = () => {
  const Stack = createStackNavigator()
  const { positionMain, positionAdd, applyNow } = routes.mainScreens.positions

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={positionMain.screen}
        component={PositionList}
        options={{
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BackButton isWhite />
            </View>
          ),
          headerStyle: styles.header,
          headerTitleStyle: styles.searchContainer,
          headerTitle: () => (
            <View style={styles.navIconSearch}>
              <SearchBar />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name={positionAdd.screen}
        component={PositionAdd}
        options={{
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BackButton isWhite />
            </View>
          ),
          headerStyle: styles.header,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={applyNow.screen}
        component={ApplyNow}
        options={{
          headerStyle: styles.header,
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BackButton isWhite />
            </View>
          ),
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  )
}

export default PositionStack

const styles = StyleSheet.create({
  header: {
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: colors.primaryColors.background,
  },
  searchContainer: { flex: 8 },
  navIconSearch: { width: width * 15, marginLeft: width * 4 },
  navIconContainer: {
    marginHorizontal: width,
  },
  backButton: {
    backgroundColor: colors.primaryColors.background,
    marginLeft: 15,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  backIcon: {
    marginTop: 2,
  },
})
