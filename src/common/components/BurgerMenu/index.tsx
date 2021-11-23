import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import colors from 'constants/colors'

export type BackButtonProps = {
  isWhite: boolean
}

const BackButton = ({ isWhite }: BackButtonProps) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={isWhite ? styles.container : [styles.container, styles.variant]}
      onPress={navigation.goBack}
    >
      <Ionicons name="ios-arrow-back" style={styles.icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.primaryColors.white,
  },
  icon: {
    color: colors.primaryColors.primary100,
    fontSize: 20,
    fontWeight: 'bold',
  },
  variant: {
    backgroundColor: colors.primaryColors.primary500,
  },
})

export default BackButton
