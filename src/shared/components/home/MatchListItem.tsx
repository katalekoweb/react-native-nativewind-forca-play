import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { theme } from "@/shared/themes/theme";

interface IMatchListItem {
  mode: "classic";
  status: "ongoing" | "lose" | "win" | "draw";
  numberOfRounds: number;
  currentRound?: number;
  divider?: boolean
  onPress?: () => void
}

const MatchListItem = ({
  mode,
  status,
  numberOfRounds,
  divider,
  currentRound,
  onPress
}: IMatchListItem) => {
  
  const [pressed, setPressed] = useState(false)

  return (
    <Pressable onPress={onPress}
      style={{ 
              borderTopWidth: divider ? 1 : undefined,
              opacity: pressed ? 0.5 : 1
            }}
            onPressIn={() => {setPressed(true); } }
            onPressOut={() => {setPressed(false); }}
      className="flex-row px-2 py-1 items-center justify-between ">
      <View className="gap-1 ">
        {mode === 'classic' && (
          <Text className="text-text font-regular text-base">Modo Clássico</Text>
        )}
        <View className="gap-1 flex-row">
          {status === "ongoing" && (
            <Text className="text-correct font-bold">Em andamento</Text>
          )}

          {status === "draw" && (
            <Text className="text-alert font-bold">Empate</Text>
          )}

          {status === "lose" && (
            <Text className="text-wrong font-bold">Derrota</Text>
          )}

          {status === "win" && (
            <Text className="text-correct font-bold">Vitória</Text>
          )}

          <Text className="text-text font-regular">
            {" "}
            - {status === 'ongoing' && `${currentRound}/`}{numberOfRounds} rodadas
          </Text>
        </View>
      </View>

      <MaterialIcons 
        name={status === 'ongoing' ? 'play-arrow' : 'arrow-right'} 
        size={24} 
        color={
          status === 'ongoing' ?
            theme.colors.correct
            : theme.colors.text
        } />
    </Pressable>
  );
};

export default MatchListItem;
