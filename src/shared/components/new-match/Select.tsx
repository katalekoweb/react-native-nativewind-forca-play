import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { theme } from "@/shared/themes/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface ISelect {
    data: any[]
    label: string
    value: string | number | null
    onGetItemLabel: (item: any) => string | undefined
    onSelect: (value: any | undefined) => void
    onGetSelected: (value: string | number | null, item: any) => any
}

const Select = ({data, label, value, onSelect, onGetSelected, onGetItemLabel} : ISelect) => {
  const [select, setSelect] = useState(2);


  return (
    <View className="gap-1">
      <Text className="font-bold text-text text-sm"> {label} </Text>

      <SelectDropdown
        data={data}
        defaultValue={data.find(item => onGetSelected(value, item))}
        onSelect={(selectedItem, index) => {
          onSelect(selectedItem);
        }}
        renderButton={(selectedItem) => (
          <View className="border-4 border-text rounded-md px-4 py-4 flex-row items-center justify-between">
            <Text className=" text-text text-base font-regular">
              { onGetItemLabel(selectedItem) || "Selecioe"}
            </Text>

            <MaterialCommunityIcons
              name="arrow-down"
              size={24}
              color={theme.colors.text}
            />
          </View>
        )}
        renderItem={(selectedItem, index, isSelected) => (
          <View
            className="p-3 rounded"
            style={{
              backgroundColor:
                onGetSelected(value, selectedItem)
                  ? theme.colors.background
                  : undefined,
            }}
          >
            <Text className="text-text font-regular text-base">
              { onGetItemLabel(selectedItem) }
            </Text>
          </View>
        )}
        dropdownOverlayColor="transparent"
        dropdownStyle={{
          padding: 8,
          borderRadius: theme.corner.normal,
          backgroundColor: theme.colors.paper,
          marginTop: -16,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default Select;
