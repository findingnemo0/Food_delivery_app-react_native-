import { View,Image, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { images } from '@/constants'

const SearchBar = () => {
  const params = useLocalSearchParams<{query ?:string}>();
  const[query, setQuery] = useState<string>(
    typeof params.query === "string" ? params.query : ""
  );

  const handleSearch = (text: string) =>{
    setQuery(text);
    
    if(!text) router.setParams({query:undefined});
  };

  const handleSubmit =() =>{
      if(query && query.trim()) router.setParams({query});
  }


  return (
    <View className='relative flex flex-row items-center justify-center w-full bg-gray-50 shadow-md shadow-black/10 rounded-full  font-quicksand-medium text-dark-100 gap-5  border-gray-300'>
      <TextInput
      className='flex-1 p-5'
      placeholder='search for pizzas , burgers...'
      value={query}
      onChangeText={handleSearch}
      onSubmitEditing={handleSubmit}
      placeholderTextColor="A0A0A0"
      returnKeyType='search'
      />

      <TouchableOpacity 
      className='pr-5' 
      onPress={()=>router.setParams({query})}
      >
          <Image 
          source={images.search}
          className='size-6' 
          resizeMode='contain'
          tintColor='#5D5F6D'
          />
      </TouchableOpacity>

    </View>
  )
}

export default SearchBar