import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'

import colors from 'constants/colors'
import sizes from 'constants/size'
import { FlatListItemProps } from 'features/types'

const FlatListItem = ({ image, title, description }: FlatListItemProps) => {
  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={{ uri: image.url }} />
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> {title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  image: {
    flex: 3,
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '7%',
  },
  title: {
    color: colors.textColors.black,
    fontSize: sizes.gettingStarted.titleText,
    fontWeight: '500',
  },
  descriptionContainer: {
    flex: 2,
    paddingHorizontal: '10%',
  },
  description: {
    textAlign: 'center',
    color: colors.primaryColors.primary300,
    fontSize: sizes.gettingStarted.descriptionText,
    lineHeight: sizes.gettingStarted.titleText * 1.5,
  },
})

export default FlatListItem
