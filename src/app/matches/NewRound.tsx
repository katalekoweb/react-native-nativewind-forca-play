import { ForcaImages } from "@/shared/assets";
import Contained from "@/shared/components/Buttons/Contained";
import Outlined from "@/shared/components/Buttons/Outlined";
import Card from "@/shared/components/Card";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const NewRound = () => {
  return (
    <ScrollView className="flex-1 p-3 gap-4 pt-6">
      <View className="gap-5">
        <Text className="text-text text-center font-bold text-lg">Vamos para a próxima rodada? </Text>

        <Image source={ForcaImages[1]} className=" self-center" style={{width: 250, height: 250}} />

        <Section title="Última rodada">
          <Card>
            <RoundListItem
              status="win"
              word="Abacate"
              tip="Fruta com casca verde"
              wrongLetters={['c', 'i', 'o', 'u', 'g']}
              correctsLetters={['a', 'b', 'c', 't', 'e']}
            />
          </Card>
        </Section>

        <View className=" flex-row items-center justify-center gap-6">
          <Outlined text="Desistir" color="error" />
          <Contained text="Começar" />
        </View>

      </View>
    </ScrollView>
  );
};

export default NewRound;
