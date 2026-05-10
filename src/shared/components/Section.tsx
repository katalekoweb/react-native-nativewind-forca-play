import React from 'react'
import { Text, View } from 'react-native'

type TSectionProps = {
    title: string,
    children: React.ReactNode
}
const Section = ({title, children} : TSectionProps) => {
  return (
    <View className='gap-2'>
        <Text className='text-text text-lg font-regular'>{ title }</Text>
        <View className='gap-4'>
            { children }
        </View>
    </View>
  )
}

export default Section