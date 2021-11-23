import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated, TouchableOpacity } from 'react-native'
import _isEmpty from 'lodash/isEmpty'

import colors from 'constants/colors'
import routes from 'constants/routes'
import FlatListItem from 'features/gettingStarted/components/FlatListItem'
import { disableGettingStartedScreen } from 'features/gettingStarted/services'
import useContentful from 'common/hooks/useContentful'
import { WelcomeContent } from 'features/types'

export default function GettingStarted() {
  const navigation = useNavigation()
  const redirectToLogin = () => {
    disableGettingStartedScreen()
    navigation.navigate(routes.authentication.stack, { screen: routes.authentication.signIn.screen })
  }

  const query = `{
  welcomingContentCollection (limit: 10) {
    items {
      sys {
        id
        publishedAt
      }
      title
      description
      image {
        url
      }
    }
  }
}`

  const { data } = useContentful(query, 'welcomeContent')
  if (!data)
    return (
      <TouchableOpacity style={styles.skipButton} onPress={redirectToLogin}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    )
  let welcomeList: WelcomeContent[] = []
  if (!_isEmpty(data)) {
    welcomeList = data.welcomingContentCollection.items as WelcomeContent[]
  }
  if (_isEmpty(welcomeList)) return null

  const { width: screenWidth } = Dimensions.get('window')
  const scrollX = new Animated.Value(0)
  const position = Animated.divide(scrollX, screenWidth)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.skipButton} onPress={redirectToLogin}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <FlatList
          data={welcomeList}
          keyExtractor={(item) => String(item.sys.id)}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <FlatListItem {...item} />
          }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        />
        <View style={styles.dotView}>
          {welcomeList.map((_, i) => {
            const opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            })
            const width = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [6, 12, 6],
              extrapolate: 'clamp',
            })
            const height = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [6, 6.5, 6],
              extrapolate: 'clamp',
            })
            return <Animated.View key={i} style={{ opacity, width, height, ...styles.animateDot }} />
          })}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={redirectToLogin}>
          <Text style={styles.buttonText}>Getting Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColors.white,
    alignItems: 'center',
  },
  skipButton: {
    flex: 1,
    alignSelf: 'flex-end',
    marginTop: '20%',
    paddingRight: '10%',
  },
  skipText: {
    color: colors.primaryColors.blue,
  },
  listContainer: {
    flex: 20,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '-15%',
    paddingBottom: '10%',
  },
  animateDot: {
    backgroundColor: colors.primaryColors.primary200,
    margin: 2,
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 2,
    width: '80%',
    marginBottom: '10%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primaryColors.blue,
    paddingVertical: '4%',
    borderRadius: 4,
    justifyContent: 'center',
    elevation: 10,
  },
  buttonText: {
    color: colors.textColors.white,
    fontWeight: '700',
  },
})
