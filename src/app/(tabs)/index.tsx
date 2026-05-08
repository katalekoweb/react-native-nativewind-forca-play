import { theme } from '@/shared/themes/theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Home = () => {

  const router = useRouter()

  return (
       <View className='items-center justify-center flex-1 bg-background'>
          <Text className='font-regular text-text'>Hello World, Here's Julian from Benguela City!</Text>

          <TouchableOpacity onPress={() => router.push('/matches/MatchDetails')}>
            <Text className='text-blue-500 text-xl'>Go to Details</Text>
          </TouchableOpacity>
        </View>
  )
}

export default Home