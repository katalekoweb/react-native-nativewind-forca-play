import Contained from "@/shared/components/Buttons/Contained";
import Outlined from "@/shared/components/Buttons/Outlined";
import Card from "@/shared/components/Card";
import Select from "@/shared/components/new-match/Select";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import * as Crypto from 'expo-crypto';
import { StorageMatchHistoryService } from "@/shared/services/StorageMatchHistoryService";
import { StorageMatchService } from "@/shared/services/StorageMatchService";

const NewMatch = () => {

  const router = useRouter()

  const [dificulty, setDificulty] = useState<"easy" | "medium" | "hard">("medium");
  const [timeForRound, setTimeForRound] = useState(5);
  const [numberOfRounds, setNumberOfRounds] = useState(3);

  const [isLoading, setIsLoading] = useState(false)

  const handleCreateMatch = async () => {
    // StorageMatchHistoryService.create()    
    setIsLoading(true)

    const matchId = await StorageMatchHistoryService.create({
      numberOfRounds,
      mode: 'classic',
      status: 'ongoing'
    })

    await StorageMatchService.create({
      id: matchId,
      numberOfRounds,
      mode: 'classic',
      currentRound: 1,
      timeForEachRound: timeForRound,
      status: 'ongoing',
      wordDifficulty: dificulty,
      rounds: []
    })

    await StorageMatchService.addRoundByMatchId(matchId)

    setIsLoading(false)

    // console.log(matchId);
    router.replace(`/matches/${matchId}/MatchOnGoing`)
    // router.back()    
  }

  const handleBack = () => {
    router.dismissAll()
  }

  return (
    <ScrollView className="flex-1 p-2 gap-4">
      <View className="gap-6 pt-6">
        <Text className="text-text text-center text-base font-regular">
          Modo de Jogo Offline
        </Text>

        <View className="gap-6">
          <Select
            value={dificulty}
            disabled={isLoading}
            label="Dificuldade"
            onGetItemLabel={(item) => item?.name ?? "selecione"}
            onGetSelected={(selectedValue, item) => item.id === selectedValue}
            onSelect={(selectedItem) => setDificulty(selectedItem.id)}
            data={[
              { id: "easy", name: "Fácil" },
              { id: "medium", name: "Médio" },
              { id: "hard", name: "Difícil" },
            ]}
          />

          <Select
            value={numberOfRounds}
            label="Número de Rodadas"
            disabled={isLoading}
            onGetItemLabel={(item) => item?.name ?? "selecione"}
            onGetSelected={(selectedValue, item) => item.id === selectedValue}
            onSelect={(selectedItem) => setNumberOfRounds(selectedItem.id)}
            data={[
              { id: 1, name: "1 rodada" },
              { id: 2, name: "2 rodadas" },
              { id: 3, name: "3 rodadas" },
              { id: 6, name: "6 rodadas" },
              { id: 10, name: "10 rodadas" },
              { id: 20, name: "20 rodadas" },
            ]}
          />

          <Select
            value={timeForRound}
            label="Tempo por rodada"
            disabled={isLoading}
            onGetItemLabel={(item) => item?.name ?? "selecione"}
            onGetSelected={(selectedValue, item) => item.id === selectedValue}
            onSelect={(selectedItem) => setTimeForRound(selectedItem.id)}
            data={[
              { id: 3, name: "3 minutos" },
              { id: 5, name: "5 minutos" },
              { id: 15, name: "15 minutos" },
              { id: 30, name: "30 minutos" },
              { id: 60, name: "60 minutos" },
            ]}
          />
        </View>

        <View className="flex-row items-center justify-center gap-6">
          <Outlined disabled={isLoading} text="Voltar" onPress={handleBack} />
          <Contained disabled={isLoading} text="Começar" onPress={handleCreateMatch} />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewMatch;
