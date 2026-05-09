import { theme } from '@/shared/themes/theme'
import React, { useState } from 'react'
import { Pressable, Text } from 'react-native'

type IOutlinedProps = {
    text: string
    color?: 'primary' | 'error'
    onPress?: () => void
}

const Outlined = ({text, color, onPress} : IOutlinedProps) => {

    const [pressed, setPressed] = useState(false)


  return (
    <Pressable
        onPress={onPress}
        className='border-4 bg-paper px-4 py-2 rounded-sm'
        style={{ 
          opacity: pressed ? 0.5 : 1,
          borderColor: color === 'primary' ? theme.colors.primary :
            color === 'error' ? theme.colors.wrong : theme.colors.primary 
        }}
        onPressIn={() => {setPressed(true); } }
        onPressOut={() => {setPressed(false); }}
        >
        <Text className='font-bold text-lg '
        style={{
          color: color === 'primary' ? theme.colors.primary :
            color === 'error' ? theme.colors.wrong : theme.colors.primary
        }}
        >{ text }</Text>
    </Pressable>
  )
}

export default Outlined