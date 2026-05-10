import Card from "@/shared/components/Card";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import React from "react";
import { Text, View } from "react-native";

const MatchDetails = () => {
  return (
    <View className="flex-1 p-2 gap-4">
      <Section title="Modo Clássico">
        <Text>Detalhes</Text>
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
  );
};

export default MatchDetails;
