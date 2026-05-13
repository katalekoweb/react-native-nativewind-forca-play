import { theme } from '@/shared/themes/theme'
import React, { useState } from 'react'
import { Pressable, Text } from 'react-native'

type IContainedProps = {
    text: string
    color?: 'primary' | 'error' | 'success'
    disabled?: boolean
    onPress?: () => void
}

const Contained = ({text, color, disabled, onPress} : IContainedProps) => {

    const [pressed, setPressed] = useState(false)


  return (
    <Pressable
        onPress={onPress}
        className=' bg-primary px-4 py-3 rounded-sm'
        style={{ 
          opacity: (pressed || disabled) ? 0.5 : 1,
          backgroundColor: color === 'primary' ? theme.colors.primary :
            color === 'error' ? theme.colors.wrong : theme.colors.primary 
        }}
        onPressIn={() => {setPressed(true); } }
        onPressOut={() => {setPressed(false); }}
        >
        <Text className='font-bold text-lg text-primaryText'
        style={{ 
          color: color === 'primary' ? theme.colors.primaryText :
            color === 'error' ? theme.colors.text : theme.colors.primaryText 
        }}
        >{ text }</Text>
    </Pressable>
  )
}

export default Contained