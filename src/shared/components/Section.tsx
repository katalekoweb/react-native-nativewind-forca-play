import React from 'react'
import { Text, View } from 'react-native'

type TSectionProps = {
    title: string,
    children: React.ReactNode
}
const Section = ({title, children} : TSectionProps) => {
  return (
    <View className='gap-3'>
        <Text className='text-text text-xl font-regular'>{ title }</Text>
        <View>
            { children }
        </View>
    </View>
  )
}

export default Section