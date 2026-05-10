import React from 'react'
import { View } from 'react-native'

interface ICard {
    children: React.ReactNode
}
const Card = ({children} : ICard) => {
  return (
    <View className='bg-paper p-4 rounded-lg gap-1'>
        {children}
    </View>
  )
}

export default Card