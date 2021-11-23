import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Platform, ScrollView, useWindowDimensions } from 'react-native'
import { Button, Text, Container, Card, View } from 'native-base'
import { TabView, SceneMap } from 'react-native-tab-view';

import colors from 'constants/colors'

export default function WorkShifts() {
  const [activePage, setActivePage] = useState<number | string>(1)
  const items: number[] = [1, 2, 3]

  const selectComponent = (activePage: number | string) => () => setActivePage(activePage)

  const renderComponent = (items: number[]) => {
    return activePage === 1 ? (
      <>
        {/*// Calendar here*/}
        <ScrollView style={styles.containerContent}>
          {items?.map((idx) => {
            return (
              <Card key={`component-${idx}`} style={styles.event}>
                <Text> Your Component 1 to display Your Component 1 to display</Text>
              </Card>
            )
          })}
        </ScrollView>
      </>
    ) : (
      //... Your Component 1 to display
      <>
        {/*// Calendar here*/}
        <ScrollView style={styles.containerContent}>
          {items?.map((idx) => {
            return (
              <Card key={`component-${idx}`} style={styles.event}>
                <Text> Your Component 2 to display Your Component 2 to display</Text>
              </Card>
            )
          })}
        </ScrollView>
      </>
    ) //... Your Component 2 to display
  }


  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const layout = useWindowDimensions();

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <Container style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          style={styles.segment}
        />
      </Container>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  segment: {
    marginTop: 32,
    width: '100%',
  },
  btn1: {
    marginRight: -20,
    width: '50%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.primaryColors.primary200,
    borderColor: 'transparent',
    zIndex: 1,
  },
  btn1Deactive: {
    marginRight: -20,
    width: '50%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.primaryColors.primary400,
    borderColor: 'transparent',
  },
  btn2: {
    marginLeft: -20,
    width: '50%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.primaryColors.primary200,
    borderColor: 'transparent',
    zIndex: 1,
  },
  btn2Deactive: {
    marginLeft: -20,
    width: '50%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.primaryColors.primary400,
    borderColor: 'transparent',
  },
  btnTextActive: {
    color: colors.textColors.white,
  },
  btnTextDeactive: {
    color: colors.textColors.black,
  },
  containerContent: {
    paddingLeft: 24,
    paddingRight: 24,
    flex: 1,
    marginTop: 16,
  },
  event: {
    flex: 1,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: colors.primaryColors.primary400,
    borderRadius: 12,
  },
})
