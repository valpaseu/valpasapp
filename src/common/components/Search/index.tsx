import { Icon, Input, VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import colors from 'constants/colors'

const SearchBar = () => {
  return (
    <VStack style={styles.search}>
      <Icon name="ios-search" style={styles.searchIcon} />
      <Input />
    </VStack>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  search: {
    paddingHorizontal: 0,
    width: '90%',
    borderRadius: 20,
    backgroundColor: colors.primaryColors.white,
    height: 30,
    flexDirection: 'row-reverse',
  },
  searchIcon: {
    fontSize: 20,
    paddingRight: 8,
    paddingTop: 5,
  },
})
