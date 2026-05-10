import Card from "@/shared/components/Card";
import Select from "@/shared/components/new-match/Select";
import RoundListItem from "@/shared/components/RoundListItem";
import Section from "@/shared/components/Section";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const NewMatch = () => {

  const [selected, setSelected] = useState('')

  return (
    <ScrollView className="flex-1 p-2 gap-4">
      <View>
        <Text>Novo Jogo </Text>

        <Select 
        value={selected}
        label="Dificuldade"
        onGetItemLabel={(item) => item?.name ?? 'selecione'}
        onGetSelected={(selectedValue, item) => item.id === selectedValue}
        onSelect={(selectedItem) => setSelected(selectedItem.id)}
        data={[
          {id: '1', name: 'Um'},
          {id: '2', name: 'Dois'},
          {id: '3', name: 'Tres'},
          {id: '4', name: 'Quatro'}
        ]} />
      </View>
    </ScrollView>
  );
};

export default NewMatch;
