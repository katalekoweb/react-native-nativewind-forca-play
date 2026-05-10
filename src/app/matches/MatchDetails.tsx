import Card from "@/shared/components/Card";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const MatchDetails = () => {
  return (
    <ScrollView className="flex-1 p-2 gap-4">
      <View>
        <Section
          title={
            <Text className="text-text font-base font-regular">
              Detalhes Mais (
              <Text className="font-bold text-correct">Vitória</Text>
              {/* <Text>Derrota</Text> */})
            </Text>
          }
        >
          <View className="gap-2">
            <View className="gap-2 flex-row">
              <Card className="flex-1 aspect-square justify-center items-center gap-2">
                <Text className="text-text font-regular text-center">Rodadas</Text>
                <Text className="text-text font-bold text-lg">3</Text>
              </Card>
              <Card className="flex-1 aspect-square justify-center items-center gap-2">
                <Text className="text-text font-regular text-center">Vitórias</Text>
                <Text className="text-text font-bold text-lg">2</Text>
              </Card>
              <Card className="flex-1 aspect-square justify-center items-center gap-2">
                <Text className="text-text font-regular text-center">Derrotas</Text>
                <Text className="text-text font-bold text-lg">1</Text>
              </Card>
            </View>

            <View className="gap-2 flex-row">
              <Card className="flex-1 aspect-square justify-center items-center gap-2">
                <Text className="text-text font-regular text-center">Dificuldade</Text>
                <Text className="text-text font-bold text-lg">Média</Text>
              </Card>

              <Card className="flex-1 aspect-square justify-center items-center gap-2">
                <Text className="text-text font-regular text-center">
                  Duração da Jogada
                </Text>
                <Text className="text-text font-bold text-lg">3mins</Text>
              </Card>

              <View className="flex-1"></View>
            </View>
          </View>
        </Section>
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
      </View>
    </ScrollView>
  );
};

export default MatchDetails;
