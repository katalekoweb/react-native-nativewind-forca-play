import Section from '@/shared/components/Section'
import React from 'react'
import { Text, View } from 'react-native'

const Home = () => {
  return (
      <View className='gap-8 px-4'>
        <Section title='Sobre o FrocaPlay'>
        <Text className='font-regular text-text text-md'>
          Este aplicativo exibe a versão offline do jogo ForcaPlay. O clássico jogo da forca
        </Text>
      </Section>

      <Section title='Formas de Contacto'>
        <Text className='font-regular text-text text-md'>
          Este aplicativo exibe a versão offline do jogo ForcaPlay. O clássico jogo da forca
        </Text>
      </Section>
      </View>
  )
}

export default Home