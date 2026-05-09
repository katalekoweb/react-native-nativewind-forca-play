import Outlined from '@/shared/components/Buttons/Outlined'
import Contained from '@/shared/components/Buttons/Contained'
import { theme } from '@/shared/themes/theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Home = () => {

  const router = useRouter()

  return (
       <View className='flex-1'>
          <View className=' items-center flex flex-row gap-4 justify-center'>
            <Contained color='error' text='Nova partida' />
            <Outlined color='error' text='Voltar' />
          </View>
        </View>
  )
}

export default Home