import Contained from "@/shared/components/Buttons/Contained";
import Outlined from "@/shared/components/Buttons/Outlined";
import Card from "@/shared/components/Card";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const MatchEnded = () => {

  const router = useRouter()

  return (
    <ScrollView className="flex-1 p-2 gap-4 pt-6">
      <View className="gap-4">

        <Text className="text-correct text-xl font-bold text-center">
          Vitória
        </Text>

        <Text className="text-wrong text-xl font-bold text-center">
          Derrota
        </Text>

        <Text className="text-alert text-xl font-bold text-center">
          Empate
        </Text>

         <Text className="text-text text-lg font-italic text-center">
          Hum! Voce escapou da forca e mostro que é um mestre das palavras
        </Text>

        <Section title="Rodadas">
          <Card>
            <RoundListItem
              word="Abacate"
              status="win"
              tip="Fruta com casca verde"
              correctsLetters={["a", "b", "c", "t"]}
              wrongLetters={["e", "i", "o"]}
            />
            <RoundListItem
              divider
              word="Abacate"
              status="win"
              tip="Fruta com casca verde"
              correctsLetters={["a", "b", "c"]}
              wrongLetters={["e", "i", "o"]}
            />
            <RoundListItem
              word="Jogo"
              status="lose"
              tip="Algo para se divertir"
              correctsLetters={["a", "b", "c"]}
              wrongLetters={["e", "i", "o"]}
              divider
            />
          </Card>
        </Section>

        <View className=" flex-row items-center justify-center gap-6">
          <Outlined text="Voltar" onPress={() => router.back()} />
          <Contained text="Nova Partida" />
        </View>

      </View>
    </ScrollView>
  );
};

export default MatchEnded;
