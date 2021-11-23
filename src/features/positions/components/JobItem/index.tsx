import { Card, View, Text } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

import colors from 'constants/colors'
import { JobPosition as IJob, JobProps } from 'features/types'
import moment from 'moment'

const JobItem: React.FC<JobProps> = ({ item, onItemPress, isHorizontal = false }) => {
  const { title, pay, jobType, company, location, sys } = item
  const positionContent = (
    <>
      {isHorizontal ? (
        <>
          <Text style={styles.placeText}>{company.name}</Text>
          <View style={styles.ContentBody}>
            <Text style={styles.ContentBodyText}>{title}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.placeText}>{location}</Text>
            <Text style={styles.moneyHourText}>€{pay}/h</Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.positionTitle}>{title}</Text>
          <View style={styles.timeLocationWrapper}>
            <View style={styles.moneyPlace}>
              <Text style={styles.salary}>${pay}/h -</Text>
              <Text style={styles.location}>{location}</Text>
            </View>
            <Text style={styles.timeText}>{moment(`${sys?.publishedAt}`).fromNow()}</Text>
          </View>
        </>
      )}
    </>
  )

  const onHandlePress = (item: IJob) => {
    onItemPress(item)
  }
  return (
    <TouchableOpacity
      onPress={() => onHandlePress(item)}
      style={isHorizontal ? styles.horizontalWrapper : styles.verticalWrapper}
    >
      <Card style={isHorizontal ? styles.horizontalWrapperJob : styles.verticalWrapperJob}>
        <View style={styles.wrapperHeaderJob}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: company.logo.url }} style={!isHorizontal ? styles.img : styles.imgHorizontal} />
            </View>
            {isHorizontal && (
              <View style={styles.borderJobType}>
                <Text style={styles.jopTypeText}>{jobType}</Text>
              </View>
            )}
          </View>
          <View style={styles.wrapperContent}>{!isHorizontal && positionContent}</View>
        </View>
        <View>{isHorizontal && positionContent}</View>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  horizontalWrapper: {
    marginTop: 16,
    marginRight: 16,
  },
  verticalWrapper: {
    marginBottom: 10,
  },
  horizontalWrapperJob: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.primaryColors.white,
    borderRadius: 8,
  },
  verticalWrapperJob: {
    paddingHorizontal: 2,
    paddingVertical: 20,
    flex: 1,
    backgroundColor: colors.primaryColors.white,
    borderRadius: 8,
  },
  wrapperHeaderJob: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  imageContainer: {
    margin: 'auto',
    paddingRight: 28,
  },
  img: {
    width: 60,
    height: 60,
    marginLeft: 16,
    marginRight: 16,
  },
  imgHorizontal: {
    width: 40,
    height: 40,
    marginLeft: 4,
    marginRight: 16,
  },
  wrapperContent: {
    flex: 3,
  },
  contentTitle: {
    fontSize: 12,
    color: colors.primaryColors.primary200,
  },
  ContentBody: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  ContentBodyText: {
    fontWeight: '400',
    fontSize: 14,
    color: colors.primaryColors.primary100,
  },
  container: {
    flexDirection: 'row',
  },
  moneyHourText: {
    color: colors.primaryColors.primary100,
    fontSize: 12,
  },
  placeText: {
    color: colors.primaryColors.primary300,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 12,
    flexGrow: 3,
  },
  borderJobType: {
    backgroundColor: colors.primaryColors.primary500,
    borderRadius: 20,
    margin: 'auto',
    paddingTop: 6,
    paddingLeft: 15,
    paddingRight: 15,
    height: 25,
  },
  jopTypeText: {
    color: colors.primaryColors.blue,
    margin: 'auto',
    fontSize: 10,
  },
  companyName: {
    color: colors.primaryColors.primary200,
    fontSize: 12,
  },
  positionTitle: {
    marginTop: 5,
    fontSize: 13.5,
  },
  timeLocationWrapper: {
    flexDirection: 'row',
    marginTop: 12,
  },
  moneyPlace: {
    flexDirection: 'row',
  },
  salary: {
    fontSize: 11,
  },
  location: {
    marginLeft: 2,
    marginRight: 2,
    fontSize: 11,
  },
  timeText: {
    color: colors.primaryColors.primary300,
    marginLeft: 'auto',
    paddingRight: 8,
    fontSize: 10,
  },
})

export default JobItem
