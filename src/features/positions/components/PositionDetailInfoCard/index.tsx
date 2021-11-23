import { View, Text } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

import colors from 'constants/colors'

import { PositionDetailInfoCardProps } from 'features/types'

const PositionDetailInfoCard: FC<PositionDetailInfoCardProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>{children}</View>
    </View>
  )
}

export default PositionDetailInfoCard

const styles = StyleSheet.create({
  container: {
    width: '85%',
    borderRadius: 5,
    backgroundColor: colors.primaryColors.white,
    padding: 20,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  cardContent: {
    marginTop: 20,
  },
})
