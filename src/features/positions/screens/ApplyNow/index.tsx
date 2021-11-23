import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'native-base'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

import colors from 'constants/colors'

const checkLists = ['A stable internet connection', 'Minimal background noise', 'A working web camera']

const ApplyNow = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Interview</Text>
      <Text style={styles.subtitle}>This is text that will function as a subheader. This text is really small.</Text>
      <View style={styles.recordContainer} />
      <Text style={styles.requirementsHeader}>Requirements</Text>
      {checkLists.map((text) => (
        <View key={text} style={styles.checkListContainer}>
          <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={14} color="black" />
          <Text style={styles.requirementItem}>{text}</Text>
        </View>
      ))}
      <View style={styles.importantTitleContainer}>
        <AntDesign name="warning" size={17} color="black" style={styles.warningIcon} />
        <Text style={styles.importantHeader}>Important</Text>
      </View>
      <Text style={styles.importantText}>
        This is some kind of text that is explaining something important. Whoa. Look at that.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 40,
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 10,
    paddingVertical: 15,
  },
  recordContainer: {
    backgroundColor: colors.primaryColors.primary400,
    width: '100%',
    height: '40%',
  },
  requirementsHeader: {
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 7,
    fontWeight: '400',
  },
  checkListContainer: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  requirementItem: {
    paddingLeft: 2,

    fontSize: 12,
    color: colors.primaryColors.primary200,
  },
  importantTitleContainer: {
    flexDirection: 'row',
    paddingTop: '10%',
    alignItems: 'center',
  },
  importantHeader: {
    fontSize: 20,
  },
  importantText: {
    marginVertical: 5,
    fontSize: 10,
    lineHeight: 15,
    color: colors.primaryColors.primary200,
    textAlign: 'center',
    paddingTop: 10,
  },
  warningIcon: {
    paddingRight: 5,
  },
})

export default ApplyNow
