import Card from "@/shared/components/Card";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import { IMatch, StorageMatchService } from "@/shared/services/StorageMatchService";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const MatchDetails = () => {

  const { gameId } = useLocalSearchParams();
    const [match, setMatch] = useState<IMatch>();
  
    useEffect(() => {
      if (!gameId || Array.isArray(gameId)) return;
  
      StorageMatchService.getById(gameId).then((match) => {
        if (!match) return;
  
        setMatch(match);
      });
    }, [gameId]);
  
    if (!match)
      return (
        <View className="items-center justify-center flex-1">
          <Text className="text-text font-regular text-lg">Carregando...</Text>
        </View>
      );
  

  return (
    <ScrollView className="flex-1 p-2 gap-4">
      <View>
        <Section
          title={
            <Text className="text-text font-base font-regular">
              Detalhes Mais (
              {
                match.status === 'win' && (
                  <Text className="font-bold text-correct">Vitória</Text>
                )
              }
              {
                match.status === 'lose' && (
                  <Text className="font-bold text-wrong">Derrota</Text>
                )
              }
              {
                match.status === 'draw' && (
                  <Text className="font-bold text-alert">Empate</Text>
                )
              }
            </Text>
          }
        >
          <View className="gap-2">
            <View className="gap-2 flex-row">
              <Card className="flex-1 aspect-square justify-center items-center gap-2">
                <Text className="text-text font-regular text-center">Rodadas</Text>
                <Text className="text-text font-bold text-lg">{match.rounds.length}</Text>
              </Card>
              <Card className="flex-1 aspect-square justify-center items-center gap-2">
                <Text className="text-text font-regular text-center">Vitórias</Text>
                <Text className="text-text font-bold text-lg">{match.rounds.filter(round => round.status === 'win').length}</Text>
              </Card>
              <Card className="flex-1 aspect-square justify-center items-center gap-2">
                <Text className="text-text font-regular text-center">Derrotas</Text>
                <Text className="text-text font-bold text-lg">{match.rounds.filter(round => round.status === 'lose').length}</Text>
              </Card>
            </View>

            <View className="gap-2 flex-row">
              <Card className="flex-1 aspect-square justify-center items-center gap-2">
                <Text className="text-text font-regular text-center">Dificuldade</Text>
                <Text className="text-text font-bold text-lg">
                  { match.wordDifficulty === "easy" && 'Fácil' }
                  { match.wordDifficulty === "medium" && 'Média' }
                  { match.wordDifficulty === "hard" && 'Difícil' }
                </Text>
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
            {match.rounds.map((round, index) => (
              <RoundListItem
                divider={index > 0}
                key={round.round}
                status={round.status}
                word={round.maskedWord.join(" ")}
                tip={round.tip}
                wrongLetters={round.wrongGuesses}
                correctsLetters={round.correctGuesses}
              />
            ))}
          </Card>
        </Section>
      </View>
    </ScrollView>
  );
};

export default MatchDetails;
