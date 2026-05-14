import Contained from "@/shared/components/Buttons/Contained";
import Outlined from "@/shared/components/Buttons/Outlined";
import Card from "@/shared/components/Card";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import {
  IMatch,
  StorageMatchService,
} from "@/shared/services/StorageMatchService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const MatchEnded = () => {
  const { gameId } = useLocalSearchParams();
  const router = useRouter();
  const [match, setMatch] = useState<IMatch>();

  useEffect(() => {
    if (!gameId || Array.isArray(gameId)) return;

    StorageMatchService.getById(gameId).then(async (match) => {
      if (!match) return;

      await StorageMatchService.update(match)

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
    <ScrollView className="flex-1 p-2 gap-4 pt-6">
      <View className="gap-4">
        {match.status === "win" && (
          <Text className="text-correct text-xl font-bold text-center">
            Vitória
          </Text>
        )}

        {match.status === "lose" && (
          <Text className="text-wrong text-xl font-bold text-center">
            Derrota
          </Text>
        )}

        {match.status === "draw" && (
          <Text className="text-alert text-xl font-bold text-center">
            Empate
          </Text>
        )}

        {match.status === "win" && (
          <Text className="text-text text-lg font-italic text-center">
            Hum! Voce escapou da forca e mostro que é um mestre das palavras
          </Text>
        )}

        {match.status === "lose" && (
          <Text className="text-text text-lg font-italic text-center">
            Que pena... A forca te pegou dessa vez! Mas não desista. Tente
            novamente! Os fortes nunca desistem!!
          </Text>
        )}

        {match.status === "draw" && (
          <Text className="text-text text-lg font-italic text-center">
            Humm. quase quase. fatou pouco para garantir a vitória. Tente
            novamente agora mesmo!! Os fortes nunca desistem!!
          </Text>
        )}

        <Section title="Rodadas">
          <Card>
            {match.rounds.map((round,index) => (
              <RoundListItem
                key={round.round}
                divider={index > 0}
                status={round.status}
                word={round.maskedWord.join(" ")}
                tip={round.tip}
                wrongLetters={round.wrongGuesses}
                correctsLetters={round.correctGuesses}
              />
            ))}
          </Card>
        </Section>

        <View className=" flex-row items-center justify-center gap-6">
          <Outlined text="Voltar" onPress={() => router.back()} />
          <Contained 
          onPress={() => router.replace(`/matches/NewMatch`)}
          text="Nova Partida" />
        </View>
      </View>
    </ScrollView>
  );
};

export default MatchEnded;
