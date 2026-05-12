import Outlined from "@/shared/components/Buttons/Outlined";
import Contained from "@/shared/components/Buttons/Contained";
import { theme } from "@/shared/themes/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Section from "@/shared/components/Section";
import Card from "@/shared/components/Card";
import MatchListItem from "@/shared/components/home/MatchListItem";

const Home = () => {
  const router = useRouter();

  return (
    <ScrollView>
      <View className="flex-1 px-4 gap-6">
        <View className=" items-center flex flex-row gap-4 justify-center">
          <Contained
            onPress={() => router.push("/matches/NewMatch")}
            color="error"
            text="Nova partida"
          />
        </View>

        <Section title="Partidas em andamento">
          <Card>
            <MatchListItem
              onPress={() => router.push("/matches/1234/MatchOnGoing")}
              mode="classic"
              numberOfRounds={5}
              status="ongoing"
              currentRound={1}
            />
          </Card>
        </Section>

        <Section title="Histórico de partidas">
          <Card>
            <MatchListItem
              onPress={() => router.push("/matches/1234/MatchDetails")}
              mode="classic"
              numberOfRounds={3}
              status="ongoing"
              currentRound={1}
            />
          </Card>
          <Card>
            <MatchListItem
              onPress={() => router.push("/matches/1234/MatchDetails")}
              mode="classic"
              numberOfRounds={3}
              status="lose"
              currentRound={1}
            />
          </Card>
          <Card>
            <MatchListItem
              onPress={() => router.push("/matches/1234/MatchDetails")}
              mode="classic"
              numberOfRounds={3}
              status="win"
              currentRound={1}
            />
          </Card>
          <Card>
            <MatchListItem
              onPress={() => router.push("/matches/1234/MatchDetails")}
              mode="classic"
              numberOfRounds={3}
              status="ongoing"
              currentRound={1}
            />
          </Card>
        </Section>
      </View>
    </ScrollView>
  );
};

export default Home;
