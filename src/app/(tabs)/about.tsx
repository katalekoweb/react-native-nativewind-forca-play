import Card from "@/shared/components/Card";
import Section from "@/shared/components/Section";
import React from "react";
import { Linking, Text, View } from "react-native";

const Home = () => {

  const subject = encodeURIComponent('Dúvidas ou sugestões sobre o ForcaPlay')
  const body = encodeURIComponent(`Olá, \n\n Estou entrando em contacto para enviar dúvidas ou 
    sugestões sobre o jogo forcaplay.\n\n Sua mensagem aqui.`)

  const handleOpenMail = () => {
    Linking.openURL(`mailto:juliofeli78@gmai.com?subject=${subject}&body=${body}`)
  }

  const handleOpenLink = () => {
    Linking.openURL(`https://facebook.com/juliaokataleko`)
  }

  return (
    <View className="gap-8 px-4">
      <Section title="Sobre o FrocaPlay">
        <Card>
          <View className="gap-5">
            <Text className="font-regular text-text text-md">
              Este aplicativo exibe a versão offline do jogo ForcaPlay. O
              clássico jogo da forca
            </Text>

            <Text className="font-regular text-text text-md">
              Este aplicativo exibe a versão offline do jogo ForcaPlay. O
              clássico jogo da forca
            </Text>

            <Text className="font-regular text-text text-md">
              Entre em contaco no nosso email: &nbsp;
              <Text onPress={handleOpenMail} className=" text-primary underline">comercial@techvalon.com</Text>
              Este aplicativo exibe a versão offline do jogo ForcaPlay. O
              clássico jogo da forca
            </Text>
          </View>
        </Card>
      </Section>

      <Section title="Formas de Contacto">
        <Card>
          <View className="gap-1 py-2">
            <Text className="font-regular text-text text-md">Facebook</Text>
            <Text className="font-regular text-primary underline text-md" onPress={handleOpenLink}>https://facebook.com/juliaokataleko</Text>
          </View>

          <View className="gap-1 py-2">
            <Text className="font-regular text-text text-md">Instagram</Text>
            <Text className="font-regular text-primary underline text-md">https://facebook.com/juliaokataleko</Text>
          </View>

          <View className="gap-1 py-2">
            <Text className="font-regular text-text text-md">Youtube</Text>
            <Text className="font-regular text-primary underline text-md">https://facebook.com/juliaokataleko</Text>
          </View>

        </Card>
      </Section>
    </View>
  );
};

export default Home;
