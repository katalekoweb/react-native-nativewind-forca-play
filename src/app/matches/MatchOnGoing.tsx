import Card from "@/shared/components/Card";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const MatchOnGoing = () => {
  return (
    <ScrollView className="flex-1 p-2 gap-4">
      <View>
        <Text>Match em andamento </Text>
      </View>
    </ScrollView>
  );
};

export default MatchOnGoing;
