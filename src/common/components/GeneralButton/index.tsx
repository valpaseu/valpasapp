import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function GeneralButton() {
  return (
    <View>
      <TouchableOpacity onPress={() => {}} style={styles.generalButton}>
        <Text>Test button</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  generalButton: {
    backgroundColor: 'red',
    color: 'white',
  },
})
