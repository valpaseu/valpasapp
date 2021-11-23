import { List, Text, View } from 'native-base'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import _isEmpty from 'lodash/isEmpty'

import colors from 'constants/colors'
import JobItem from 'features/positions/components/JobItem'
import { JobPosition } from 'features/types'
import useContentful from 'common/hooks/useContentful'

type JobListProps = {
  onItemPress: (item: JobPosition) => void
  isShowTitle?: boolean
  direction?: string
  jobs?: JobPosition[]
  query?: string
}

export default function JobList({ onItemPress, isShowTitle = true, direction = 'vertical' }: JobListProps) {
  const query = `{
    positionCollection(limit:10) {
      items {
        sys {
          id
          publishedAt
        }
        title
        location
        benefits
        pay
        jobType
        requirements
        company {
          name
          about
          logo {
            url
          }
        }
        
      }
    }
  }`

  const { data } = useContentful(query, 'positions')
  if (!data) return <View />
  let jobList: JobPosition[] = []

  if (!_isEmpty(data)) {
    jobList = data.positionCollection.items as JobPosition[]
  }

  if (_isEmpty(jobList)) return null

  return (
    <View style={direction === 'vertical' ? styles.wrapper : styles.wrapperHoronzital}>
      {isShowTitle && <Text style={styles.jobOpenings}>{jobList.length} Job Openings</Text>}
      {direction === 'vertical' && (
        <View style={styles.sort}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Most Relevant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Most Recent</Text>
          </TouchableOpacity>
        </View>
      )}
      {direction === 'vertical' ? (
        <List
          style={styles.wrapperJobs}
          renderItem={({ item }) => {
            return <JobItem item={item} onItemPress={() => onItemPress(item)} />
          }}
          keyExtractor={(item) => String(item.sys.id)}
          dataArray={jobList}
        />
      ) : (
        <FlatList
          horizontal
          style={styles.wrapperJobs}
          renderItem={({ item }) => {
            return <JobItem isHorizontal item={item} onItemPress={() => onItemPress(item)} />
          }}
          keyExtractor={(item) => String(item.sys.id)}
          data={jobList}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    padding: 24,
  },
  wrapperHoronzital: {
    width: '100%',
  },
  sort: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  option: {
    backgroundColor: colors.primaryColors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 15,
  },
  optionText: {
    color: colors.primaryColors.primary300,
    fontSize: 12,
  },
  jobOpenings: {
    fontSize: 18,
    color: colors.primaryColors.primary200,
    marginTop: -20,
  },
  wrapperJobs: {
    width: '100%',
    marginVertical: 0,
    paddingBottom: 40,
  },
})
