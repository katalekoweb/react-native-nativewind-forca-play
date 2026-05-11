import { ForcaImages } from "@/shared/assets";
import Outlined from "@/shared/components/Buttons/Outlined";
import Card from "@/shared/components/Card";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const MatchOnGoing = () => {

  const maskedWord = ['J', 'O', '_', 'O']
  const tip = "Algo para se divertir"

  return (
    <ScrollView className="flex-1 p-2 pt-6">
      <View className="gap-6 items-center">
        <Text className="text-text font-regular text-lg text-center underline">
          {tip}
        </Text>

        <Image source={ForcaImages[1]} className="w-20 h-20" />

        <View className="flex-row flex-wrap gap-2 items-center justify-center">
          {maskedWord.map(letter => (
            <View className="border-b-4 h-9 w-9 border-text">
            <Text className="text-text font-bold text-2xl text-center underline">
              {letter === '_' ? '' : letter}
            </Text>
          </View>
          ))}
        </View>

        <Outlined color="error" text="Desistir da partida" />
      </View>
    </ScrollView>
  );
};

export default MatchOnGoing;
