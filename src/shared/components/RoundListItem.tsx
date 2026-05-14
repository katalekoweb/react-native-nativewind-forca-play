import React from 'react'
import { Text, View } from 'react-native'

interface IRoundListItem {
    status: 'win' | 'lose' | 'playing' | 'setup'
    word: string
    tip?: string
    correctsLetters: string[]
    wrongLetters: string[]
    divider?: boolean
}

const RoundListItem = ({status, word, tip, correctsLetters, wrongLetters, divider} : IRoundListItem) => {
  return (
    <View style={{ 
        borderTopWidth: divider ? 1 : undefined,
    }} className='px-1 py-1 border-background gap-1'>

        <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-text font-bold text-lg uppercase'>{word}</Text>
            {status === 'win' && (
                <Text className='text-correct text-3xl undeline'>Vitória</Text>
            )}

            {status === 'lose' && (
                <Text className='text-wrong'>Derrota</Text>
            )}
        </View>

        <View className='flex-row justify-start gap-4'>
            <Text className='text-text font-bold text-base'>Dica:</Text>
            <Text className='text-text font-regular'>
                {tip}
            </Text>
        </View>

        <View className='flex-row justify-start gap-4'>
            <Text className='text-text font-bold text-base'>{correctsLetters.length} acertos:</Text>
            <Text className='text-text font-regular'>{correctsLetters.join(', ')}</Text>
        </View>

        <View className='flex-row justify-start gap-4'>
            <Text className='text-text font-bold text-base'>{wrongLetters.length}  erros:</Text>
            <Text className='text-text font-regular'>{wrongLetters.join(', ')}</Text>
        </View>

    </View>
  )
}

export default RoundListItem