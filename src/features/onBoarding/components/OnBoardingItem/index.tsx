import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'

import colors from 'constants/colors'
import sizes from 'constants/size'
import routes from 'constants/routes'
import { OnboardingContent } from 'features/types'

const OnBoardingItem: FC<OnboardingContent> = ({ title, thumbnailImage: photoUrl, hashtags: hashTags, sys }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routes.mainScreens.onBoarding.onBoardingDetail.screen, {
          title,
          photoUrl: photoUrl.url,
          itemID: sys.id,
        })
      }
    >
      <ImageBackground source={{ uri: photoUrl.url }} style={styles.container} imageStyle={styles.image}>
        <View style={styles.overlay} />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.hashTagContainer}>
          {hashTags.map((hashTag, index) => (
            <View key={`onBoardingItemHashTag-${index}-${Math.random()}`} style={styles.hashTagBackground}>
              <Text style={styles.hashTagText}>{hashTag}</Text>
            </View>
          ))}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    borderRadius: 20,
    marginBottom: '5%',
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primaryColors.primary400,
    opacity: 0.5,
    borderRadius: 20,
  },
  title: {
    fontSize: sizes.onBoardingItem.titleText,
    fontWeight: '500',
    letterSpacing: 1.2,
    marginLeft: 15,
    marginBottom: 10,
  },
  hashTagContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 15,
  },
  hashTagBackground: {
    marginLeft: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: colors.primaryColors.primary100,
  },
  hashTagText: {
    color: colors.primaryColors.white,
    fontWeight: '600',
    fontSize: sizes.onBoardingItem.hashTag,
  },
})

export default OnBoardingItem
