import Card from "@/shared/components/Card";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const MatchOnGoing = () => {

  const maskedWord = ['J', 'O', '_', 'O']
  const tip = "Algo para se divertir"

  return (
    <ScrollView className="flex-1 p-2 pt-6">
      <View className="gap-6 items-center">
        <Text className="text-text font-regular text-lg text-center underline">
          {tip}
        </Text>

        <View className="flex-row flex-wrap gap-2 items-center justify-center">
          {maskedWord.map(letter => (
            <View className="border-b-4 h-9 w-9 border-text">
            <Text className="text-text font-bold text-2xl text-center underline">
              {letter === '_' ? '' : letter}
            </Text>
          </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MatchOnGoing;
