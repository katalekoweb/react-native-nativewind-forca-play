import { ForcaImages } from "@/shared/assets";
import Contained from "@/shared/components/Buttons/Contained";
import Outlined from "@/shared/components/Buttons/Outlined";
import Card from "@/shared/components/Card";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import { StorageMatchHistoryService } from "@/shared/services/StorageMatchHistoryService";
import {
  IMatch,
  StorageMatchService,
} from "@/shared/services/StorageMatchService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { Image, ScrollView, Text, View } from "react-native";

const NewRound = () => {
  const { gameId } = useLocalSearchParams();
  const router = useRouter();

  const [desisting, setDesisting] = useState(false);
  const [match, setMatch] = useState<IMatch>();

  useEffect(() => {
    if (!gameId || Array.isArray(gameId)) return;

    StorageMatchService.getById(gameId).then((match) => {
      if (!match) return;

      if (match.status !== "ongoing") {
        router.replace(`/matches/${match.id}/MatchEnded`);
        return;
      } else if (match.numberOfRounds === match.rounds.length) {
        router.replace(`/matches/${match.id}/MatchEnded`);
        return;
      }

      setMatch(match);
    });
  }, [gameId]);

  const currentRoundData = useMemo(() => {
    console.log(match);    
    return match?.rounds.find((round) => round.round === match.currentRound);
  }, [match?.currentRound, match?.rounds]);

  const handleDesist = () => {
    if (!match) return;

    const doDesist = async () => {
      setDesisting(true);
      await StorageMatchService.update({ ...match, status: "lose" });
      await StorageMatchHistoryService.updateById({
        id: match.id,
        status: "lose",
        mode: match.mode,
        numberOfRounds: match.numberOfRounds,
      });

      setDesisting(false);

      router.replace(`/matches/${gameId}/MatchEnded`);
    };

    Alert.alert(
      "Desistir da partida?",
      "Se desistir o status da partida ficará como derrota. Continuar?",
      [
        { text: "Cancelar", isPreferred: true, style: "cancel" },
        { text: "Desistir agora", onPress: doDesist, style: "destructive" },
      ],
    );
  };

  const handleNewRound = async () => {
    if (!gameId || Array.isArray(gameId)) return;

    await StorageMatchService.addRoundByMatchId(gameId)
    router.replace(`/matches/${gameId}/MatchOnGoing`)
  };

  if (!match || !currentRoundData)
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-text font-regular text-lg">Carregando...</Text>
      </View>
    );

  return (
    <ScrollView className="flex-1 p-3 gap-4 pt-6">
      <View className="gap-5">
        <Text className="text-text text-center font-bold text-lg">
          Vamos para a próxima rodada?{" "}
        </Text>

        <Image
          source={ForcaImages[1]}
          className=" self-center"
          style={{ width: 250, height: 250 }}
        />

        <Section title="Última rodada">
          <Card>
            <RoundListItem
              key={currentRoundData.round}
              status={currentRoundData.status}
              word={currentRoundData.maskedWord.join("")}
              tip={currentRoundData.tip}
              wrongLetters={currentRoundData.wrongGuesses}
              correctsLetters={currentRoundData.correctGuesses}
            />
          </Card>
        </Section>

        <View className=" flex-row items-center justify-center gap-6">
          <Outlined text="Desistir" onPress={handleDesist} color="error" />
          <Contained onPress={handleNewRound} text="Começar" />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewRound;
