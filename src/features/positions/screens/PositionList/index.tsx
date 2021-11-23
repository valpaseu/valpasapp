import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, SafeAreaView } from 'react-native'
import { View } from 'native-base'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import routes from 'constants/routes'
import JobList from 'features/positions/components/JobList'
import { JobPosition } from 'features/types'
import colors from 'constants/colors'

const PositionList = () => {
  const navigation: any = useNavigation()

  const handleJobItemPress = (item: JobPosition) => {
    navigation.navigate(routes.mainScreens.positions.positionDetail.screen, { item })
  }

  return (
    <SafeAreaView>
      <View style={styles.wrapperJobList}>
        <JobList onItemPress={handleJobItemPress} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapperJobList: {
    backgroundColor: colors.primaryColors.background,
    paddingVertical: 12,
    bottom: 4,
    height: hp('85%'),
  },
})

export default PositionList
