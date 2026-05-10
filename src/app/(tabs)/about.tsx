import Card from "@/shared/components/Card";
import Section from "@/shared/components/Section";
import React from "react";
import { Text, View } from "react-native";

const Home = () => {
  return (
    <View className="gap-8 px-4">
      <Section title="Sobre o FrocaPlay">
        <Card>
          <Text className="font-regular text-text text-md">
            Este aplicativo exibe a versão offline do jogo ForcaPlay. O clássico
            jogo da forca
          </Text>
        </Card>
      </Section>

      <Section title="Formas de Contacto">
        <Card>
          <Text className="font-regular text-text text-md">
            Este aplicativo exibe a versão offline do jogo ForcaPlay. O clássico
            jogo da forca
          </Text>
        </Card>
      </Section>
    </View>
  );
};

export default Home;
