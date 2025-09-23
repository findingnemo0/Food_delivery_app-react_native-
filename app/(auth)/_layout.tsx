import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { Redirect, Slot } from 'expo-router'
import React from 'react'
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

export default function AuthLayout() {
  const {isAuthenticated} = useAuthStore();

  if(isAuthenticated) return <Redirect href="/" />
  return (
    <KeyboardAvoidingView behavior={Platform.OS=='ios'? 'padding':'height'}>
      <ScrollView className='bg-white h-full ' keyboardShouldPersistTaps="handled">
        <View className='w-full realtive ' style={{height:Dimensions.get('screen').height/2.31}}>
        <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg' resizeMode='contain'/>
        <Image source={images.logo} className="self-center size-48 absolute -bottom-16 x-10"/>
        </View>
      <Slot/>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}


// "KeyboardAvoidingView" this ensure when user in inserting input the keyboard will come up automatically