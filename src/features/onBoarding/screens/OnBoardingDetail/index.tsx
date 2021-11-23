import { useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native'

import sizes from 'constants/size'


const OnBoarding = () => {

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Nothing</Text>
        <View style={styles.bottomMargin} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: sizes.onBoardingItem.titleText,
    textAlign: 'center',
    marginBottom: '5%',
    paddingHorizontal: '10%',
  },
  openingPhoto: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.35,
    marginBottom: '10%',
  },
  textContainer: {
    paddingHorizontal: '5%',
    marginBottom: '5%',
  },
  text: {
    textAlign: 'justify',
    lineHeight: 20,
    letterSpacing: 1.2,
  },
  photoContainer: {
    paddingHorizontal: '5%',
    marginBottom: '5%',
  },
  photo: {
    width: Dimensions.get('screen').width * 0.8,
    height: Dimensions.get('screen').height * 0.35,
    borderRadius: 15,
  },
  bottomMargin: {
    height: 40,
  },
})

export default OnBoarding
