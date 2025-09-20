import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function _layout() {
  return (
    <SafeAreaView className="flex justify-center ">
      <Text className="text-center ">This is auth layout </Text>
    </SafeAreaView>
  )
}