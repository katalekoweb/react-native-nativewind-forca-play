import { ForcaImages } from "@/shared/assets";
import Outlined from "@/shared/components/Buttons/Outlined";
import Card from "@/shared/components/Card";
import Keyboard from "@/shared/components/match-ongoing/Keyboard";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import { StorageMatchHistoryService } from "@/shared/services/StorageMatchHistoryService";
import {
  IMatch,
  StorageMatchService,
} from "@/shared/services/StorageMatchService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { use, useEffect, useMemo, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

const MatchOnGoing = () => {
  const { gameId } = useLocalSearchParams();
  const router = useRouter();

  const [desisting, setDesisting] = useState(false);
  const [match, setMatch] = useState<IMatch>();

  useEffect(() => {
    if (!gameId || Array.isArray(gameId)) return;

    StorageMatchService.getById(gameId).then((match) => {
      if (!match) return;

      setMatch(match);
    });
  }, [gameId]);

  const currenctRoundData = useMemo(() => {
    return match?.rounds.find((round) => round.round === match.currentRound);
  }, [match?.currentRound, match?.rounds]);

  const handleDesist = () => {
    if (!match) return;

    const doDesist = async () => {
      setDesisting(true);
      await StorageMatchService.update({...match, status: 'lose'})
      await StorageMatchHistoryService.updateById({
        id: match.id,
        status: 'lose',
        mode: match.mode,
        numberOfRounds: match.numberOfRounds
      })

      setDesisting(false)

      router.replace(`/matches/${gameId}/MatchEnded`)
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

  if (!match || !currenctRoundData)
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-text font-regular text-lg">Carregando...</Text>
      </View>
    );

  return (
    <ScrollView className="flex-1 p-2 pt-6">
      <View className="gap-6 items-center">
        <Text className="text-text font-regular text-lg text-center underline">
          {currenctRoundData?.tip}
        </Text>

        <Image
          source={ForcaImages[(currenctRoundData.wrongGuesses.length + 1) as 1]}
          style={{ width: 250, height: 250 }}
        />

        <View className="flex-row flex-wrap gap-2 items-center justify-center">
          {currenctRoundData?.maskedWord.map((letter) => (
            <View className="border-b-4 h-9 w-9 border-text">
              <Text className="text-text font-bold text-2xl text-center underline">
                {letter === "_" ? "" : letter}
              </Text>
            </View>
          ))}
        </View>

        <Keyboard
          onSelect={(letter) => console.log(letter)}
          wrongGuesses={currenctRoundData.wrongGuesses}
          correctGuesses={currenctRoundData.correctGuesses}
        />

        <Outlined
          disabled={desisting}
          color="error"
          onPress={handleDesist}
          text="Desistir da partida"
        />
      </View>
    </ScrollView>
  );
};

export default MatchOnGoing;
