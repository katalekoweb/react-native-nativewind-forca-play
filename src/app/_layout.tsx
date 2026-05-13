import { useFonts } from "expo-font";
import { Slot, Stack, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { theme } from "@/shared/themes/theme";
import CustomHeader from "@/shared/components/CustomHeader";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    PoppinsRegular: require("./../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsBold: require("./../../assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsItalic: require("./../../assets/fonts/Poppins/Poppins-Italic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  // navigation pode ser Slot, Stack ou Tabs

  return (
    <Stack
      screenOptions={{
        header: CustomHeader,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        headerStyle: {
          backgroundColor: theme.colors.paper,
        },
        headerTitleStyle: {
          color: theme.colors.text,
          fontFamily: theme.fonts.family.bold,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="matches/NewMatch"
        options={{ title: "Nova Partida" }}
      />

      <Stack.Screen
        name="matches/[gameId]/MatchDetails"
        options={{ title: "Detalhes" }}
      />

      <Stack.Screen
        name="matches/[gameId]/MatchOnGoing"
        options={{ title: "Partida em andamento" }}
      />

      <Stack.Screen
        name="matches/[gameId]/NewRound"
        options={{ title: "Nova rodada" }}
      />

      <Stack.Screen
        name="matches/[gameId]/MatchEnded"
        options={{ title: "Partida Encerrada" }}
      />
    </Stack>
  );
};

export default RootLayout;
