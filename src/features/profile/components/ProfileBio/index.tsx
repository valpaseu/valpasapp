import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { ProfileBioProps } from 'features/types'
import colors from 'constants/colors'
import sizes from 'constants/size'

const ProfileBio: FC<ProfileBioProps> = ({ bioDesc }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BIO</Text>
      <Text style={styles.description}>{bioDesc}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: '5%',
    width: '90%',
    padding: '5%',
    backgroundColor: colors.primaryColors.white,
    borderRadius: 15,
  },
  title: {
    color: colors.primaryColors.primary300,
    fontSize: sizes.profile.bioTitle,
    fontWeight: '500',
    paddingBottom: '3%',
    letterSpacing: 1.5,
  },
  description: {
    color: colors.primaryColors.primary300,
    textAlign: 'justify',
    fontSize: sizes.profile.bioDesc,
    lineHeight: 18,
    letterSpacing: 1.2,
  },
})

export default ProfileBio
