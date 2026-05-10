import React from 'react'
import { View } from 'react-native'

interface ICard {
    className?: string
    children: React.ReactNode
}
const Card = ({className, children} : ICard) => {
  return (
    <View className={`bg-paper p-4 rounded-lg gap-1 ${className}`}>
        {children}
    </View>
  )
}

export default Card