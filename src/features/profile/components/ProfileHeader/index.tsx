import React, { FC } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { ProfileHeaderProps } from 'features/types'
import colors from 'constants/colors'
import sizes from 'constants/size'

const ProfileHeader: FC<ProfileHeaderProps> = ({ photoUrl, name, email, futureShifts, earnedIncome }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: photoUrl }} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.subtitle}>{email}</Text>
      <View style={styles.splitContainer}>
        <View style={styles.splitViewLeft}>
          <Text style={styles.splitText}>Awaiting Shifts</Text>
          <Text style={styles.splitNumber}>{futureShifts.length}</Text>
        </View>
        <View style={styles.splitViewRight}>
          <Text style={styles.splitText}>Earned Income</Text>
          <Text style={styles.splitNumber}>{earnedIncome} </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: colors.primaryColors.white,
    borderRadius: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 1000,
    borderWidth: 1.5,
    borderColor: colors.primaryColors.primary300,
    position: 'absolute',
    top: '-12%',
  },
  name: {
    marginTop: '25%',
    paddingVertical: '2%',
    color: colors.primaryColors.primary200,
    fontSize: sizes.profile.nameText,
    fontWeight: '500',
    letterSpacing: 2,
  },
  subtitle: {
    color: colors.primaryColors.primary200,
    fontSize: sizes.profile.subtitle,
    letterSpacing: 1.5,
    paddingBottom: '2%',
  },
  splitContainer: {
    flexDirection: 'row',
    paddingVertical: '7%',
  },
  splitViewLeft: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1.5,
    borderColor: colors.primaryColors.primary400,
    fontSize: sizes.profile.splitText,
  },
  splitViewRight: {
    flex: 1,
    alignItems: 'center',
    fontSize: sizes.profile.splitText,
  },
  splitText: {
    color: colors.primaryColors.primary300,
    fontWeight: '500',
    letterSpacing: 1.1,
  },
  splitNumber: {
    color: colors.primaryColors.primary300,
    fontSize: sizes.profile.splitNumber,
    fontWeight: '500',
    paddingTop: 5,
  },
})

export default ProfileHeader
