import Outlined from "@/shared/components/Buttons/Outlined";
import Contained from "@/shared/components/Buttons/Contained";
import { theme } from "@/shared/themes/theme";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Section from "@/shared/components/Section";
import Card from "@/shared/components/Card";
import MatchListItem from "@/shared/components/home/MatchListItem";
import {
  IMatchHistory,
  StorageMatchHistoryService,
} from "@/shared/services/StorageMatchHistoryService";
import {
  IMatch,
  StorageMatchService,
} from "@/shared/services/StorageMatchService";

const Home = () => {
  const router = useRouter();

  const [matchesEndend, setMatchesEnded] = useState<IMatchHistory[]>([]);
  const [matchesOnGoing, setMatchesOnGoing] = useState<(IMatchHistory & IMatch)[]>([]);
  const [matches, setMatches]  = useState<IMatchHistory[]>([]); 

  // useEffect(() => {

  // }, []);

  useFocusEffect(
    useCallback(() => {
      StorageMatchHistoryService.getAll().then(async (matches) => {

        setMatches(matches)

        const matchesEnded = matches?.filter(
          (match) => match.status !== "ongoing",
        );
        setMatchesEnded(matchesEnded);

        const matchesOnGoingList = matches?.filter(
          (match) => match.status === "ongoing",
        );

        if (matchesOnGoingList) {
          const fullMatchesOnGoing = await Promise.all(
            matchesOnGoingList?.map(async (match) => {
              const fullmatch = await StorageMatchService.getById(match.id);

              if (!fullmatch) return;

              return {
                ...match,
                ...fullmatch,
              };
            }),
          ).then((matches) => matches.filter(Boolean));

          setMatchesOnGoing(fullMatchesOnGoing as (IMatchHistory & IMatch)[]);
        }
      });
    }, []),
  );


  return (
    <ScrollView>
      <View className="flex-1 px-4 gap-6">
        <View className=" items-center flex flex-row gap-4 justify-center">
          <Contained
            onPress={() => router.push("/matches/NewMatch")}
            disabled={matchesOnGoing.length > 0}
            color="primary"
            text="Começar nova partida"
          />
        </View>

        <View className=" items-center gap-4 flex-row grid grid-cols-2">
          <Card>
            <Text className="text-center text-text px-2">Partidas Ganhas:  { matches?.filter((match) => match.status === 'win').length ?? 0 }</Text>
          </Card>
          <Card className="flex-grow">
            <Text className="text-center text-text px-2">Perdidas:  { matches?.filter((match) => match.status === 'lose').length ?? 0 }</Text>
          </Card>
        </View>

        <Section title="Partidas em andamento">
          <Card>
            {matchesOnGoing.map((match) => (
              <MatchListItem
                onPress={() => router.push(`/matches/${match.id}/MatchOnGoing`)}
                key={match.id}
                mode={match.mode}
                numberOfRounds={match.numberOfRounds}
                status={match.status}
                currentRound={match.currentRound}
              />
            ))}
            {matchesOnGoing.length === 0 && (
              <View className="p-2 gap-6">
                <Text className="text-text font-bold text-lg text-center opacity-50">
                  Nenhuma partida em andamento...
                </Text>
              </View>
            )}
          </Card>
        </Section>

        <Section title="Histórico de partidas">
          <Card>
            {matchesEndend?.map((match) => (
              <MatchListItem
                onPress={() => router.push(`/matches/${match.id}/MatchDetails`)}
                mode={match.mode}
                key={match.id}
                numberOfRounds={match.numberOfRounds}
                status={match.status}
                currentRound={match.numberOfRounds}
              />
            ))}
            {(matchesEndend?.length ?? 0) === 0 && (
              <View className="p-2 gap-6">
                <Text className="text-text font-bold text-lg text-center opacity-50">
                  Nenhum histórico ainda...
                </Text>
              </View>
            )}
          </Card>
        </Section>
      </View>
    </ScrollView>
  );
};

export default Home;
