import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import colors from 'constants/colors'

const City = () => {
  return (
    <View style={styles.container}>
      <Text>Cities screen!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default City
