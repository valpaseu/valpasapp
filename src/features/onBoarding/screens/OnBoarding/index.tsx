import React, { useEffect, useState } from 'react'
import { StyleSheet, SectionList, View, Button, SafeAreaView, Text } from 'react-native'
import _isEmpty from 'lodash/isEmpty'
import { DataStore } from '@aws-amplify/datastore';
import { Test } from 'models';
import 'react-native-get-random-values';

import OnBoardingAdd from '../OnBoardingAdd';
import { padding } from 'styled-system';
import { border } from 'native-base/lib/typescript/theme/styled-system';

const OnBoarding = ({ navigation }) => {
  const [data, updateList] = useState([])
  const [addText, onChangeText] = React.useState("Add text")

  const FormTextList = async () => { 
    updateList(await DataStore.query(Test))
  }

  FormTextList()

  return (
    <SafeAreaView style={styles.list}>
      <SectionList
          sections={data}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
      />
      <View>
        <Button
          onPress={() => navigation.navigate("Add")}
          title='Add'
        />
        <Button
          onPress={() => FormTextList()}
          title='log'
        />
        <Button
          onPress={() => console.log(data)}
          title='log2'
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: '5%',
    marginTop: '5%',
  },
  item: {
    padding: 10,
    fontSize: 12,
    height: 44,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
})

export default OnBoarding


