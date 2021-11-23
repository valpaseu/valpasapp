import { Entypo } from '@expo/vector-icons'
import { useRoute, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, Button } from 'native-base'
import React, { FC, useState } from 'react'
import { ScrollView, Image, StyleSheet } from 'react-native'

import colors from 'constants/colors'
import routes from 'constants/routes'
import PositionDetailInfoCard from 'features/positions/components/PositionDetailInfoCard'
import { IPositionRoute } from 'features/types'

const PositionDetail: FC<object> = () => {
  const navigation = useNavigation()
  const [active, setActive] = useState(1)
  const route: IPositionRoute = useRoute()
  const {
    item: {
      title,
      company: {
        name,
        about,
        logo: { url },
      },
      location,
      requirements,
      benefits,
    },
  } = route.params

  return (
    <View style={styles.positionDetailContainer}>
      <ScrollView>
        <View style={styles.positionLogo}>
          <Image source={{ uri: url }} style={styles.logo} />
        </View>
        <Text style={styles.positionTitle}>{title}</Text>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>{name}</Text>
          <View style={styles.positionLocation}>
            <Entypo name="location-pin" size={15} color="black" />
            <Text style={styles.subTitleText}>{location}</Text>
          </View>
        </View>
        <View style={styles.tabsButton}>
          {['Description', 'Company'].map((name, index) => {
            return (
              <Button
                key={index + 1}
                style={active === index + 1 ? styles.activeButton : styles.button}
                active={active === index + 1}
                onPress={() => setActive(index + 1)}
              >
                <Text style={active === index + 1 ? styles.activeTextTabButton : styles.textTabButton}>{name}</Text>
              </Button>
            )
          })}
        </View>
        {active === 1 ? (
          <View style={styles.content}>
            <PositionDetailInfoCard title="Requirement">
              <Text style={styles.contentText}>{requirements}</Text>
            </PositionDetailInfoCard>
            <PositionDetailInfoCard title="Benefits">
              <Text style={styles.contentText}>{benefits}</Text>
            </PositionDetailInfoCard>
          </View>
        ) : (
          <View style={styles.content}>
            <PositionDetailInfoCard title="About">
              <Text style={styles.contentText}>{about}</Text>
            </PositionDetailInfoCard>
          </View>
        )}
      </ScrollView>
      <LinearGradient colors={['#ffffff3b', '#ffffff6b', '#FFFFFF']}>
        <View style={styles.applyButtonContainer}>
          <Button
            style={styles.applyButton}
            onPress={() => navigation.navigate(routes.mainScreens.positions.applyNow.screen)}
          >
            <Text style={styles.applyText}>Apply Now</Text>
          </Button>
        </View>
      </LinearGradient>
    </View>
  )
}

export default PositionDetail

const styles = StyleSheet.create({
  positionDetailContainer: {
    flex: 1,
    backgroundColor: colors.primaryColors.background,
    borderTopColor: colors.primaryColors.background,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  positionLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  positionTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  subTitle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  subTitleText: {
    fontSize: 13,
    color: colors.primaryColors.primary200,
  },
  positionLocation: {
    flexDirection: 'row',
    borderLeftColor: colors.primaryColors.primary300,
    borderLeftWidth: 1,
    paddingLeft: 5,
    marginLeft: 8,
  },
  tabsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: '42.5%',
    justifyContent: 'center',
    backgroundColor: colors.primaryColors.white,
    borderRadius: 0,
  },
  activeButton: {
    marginHorizontal: 2.5,
    width: '42.5%',
    justifyContent: 'center',
    backgroundColor: colors.primaryColors.white,
    borderRadius: 0,
  },
  activeTextTabButton: {
    color: colors.primaryColors.primary100,
  },
  textTabButton: {
    color: colors.primaryColors.primary600,
  },
  content: {
    alignItems: 'center',
  },
  contentText: {
    fontSize: 13,
    color: colors.primaryColors.primary200,
  },
  applyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  applyButton: {
    width: '95%',
    height: 60,
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: colors.primaryColors.blue,
  },
  applyText: {
    color: colors.primaryColors.white,
  },
})
