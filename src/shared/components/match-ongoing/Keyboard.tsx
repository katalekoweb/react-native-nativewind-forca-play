import { theme } from "@/shared/themes/theme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IKeyboard {
  disabled?: boolean;
  wrongGuesses: string[];
  correctGuesses: string[];
  onSelect: (letter: string) => void;
}

const Keyboard = ({ wrongGuesses, correctGuesses, disabled, onSelect }: IKeyboard) => {
  return (
    <View className="gap-2 items-center">
      <View className="flex-row gap-1 justify-center">
        {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((letter) => (
          <TouchableOpacity
            key={letter}
            disabled={disabled}
            className="h-9 w-9 bg-paper rounded-sm"
            onPress={() => onSelect(letter)}
            style={{
              opacity: disabled ? 0.5 : undefined,
              backgroundColor: correctGuesses.includes(letter)
                ? theme.colors.correct
                : wrongGuesses.includes(letter)
                  ? theme.colors.wrong
                  : undefined,
            }}
          >
            <Text className="text-text font-bold text-xl text-center uppercase">
              {letter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row gap-1 justify-center">
        {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((letter) => (
          <TouchableOpacity
            key={letter}
            disabled={disabled}
            className="h-9 w-9 bg-paper rounded-sm"
            onPress={() => onSelect(letter)}
            style={{
              opacity: disabled ? 0.5 : undefined,
              backgroundColor: correctGuesses.includes(letter)
                ? theme.colors.correct
                : wrongGuesses.includes(letter)
                  ? theme.colors.wrong
                  : undefined,
            }}
          >
            <Text className="text-text font-bold text-xl text-center uppercase">
              {letter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row gap-1 justify-center">
        {["z", "x", "c", "v", "b", "n", "m"].map((letter) => (
          <TouchableOpacity
            key={letter}
            disabled={disabled}
            className="h-9 w-9 bg-paper rounded-sm"
            onPress={() => onSelect(letter)}
            style={{
              opacity: disabled ? 0.5 : undefined,
              backgroundColor: correctGuesses.includes(letter)
                ? theme.colors.correct
                : wrongGuesses.includes(letter)
                  ? theme.colors.wrong
                  : undefined,
            }}
          >
            <Text className="text-text font-bold text-xl text-center uppercase">
              {letter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Keyboard;
