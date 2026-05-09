import { useFonts } from "expo-font";
import { Tabs, TabSlot, TabList, TabTrigger, TabTriggerSlotProps } from "expo-router/ui";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { theme } from "@/shared/themes/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const insets = useSafeAreaInsets();

  // navigation pode ser Slot, Stack ou Tabs
  return (
    <View
      style={{
        flex: 1,
        marginTop: insets.top + 15,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
        marginRight: insets.right,
      }}
    >
      <Tabs>
        <TabList
          style={{
            paddingVertical: 10,
            backgroundColor: theme.colors.paper,
            marginHorizontal: "auto",
            gap: 16,
            paddingHorizontal: 16,
            borderRadius: theme.corner.large,
          }}
        >
          <TabTrigger className="p-2 px-8" name="home" href={"/"} asChild>
            <CustomTabsButton text="Início" />
          </TabTrigger>

          <TabTrigger className="p-2 px-8" name="about" href={"/about"} asChild>
            <CustomTabsButton text="Sobre" />
          </TabTrigger>
        </TabList>
        <TabSlot />
      </Tabs>
    </View>

    // <Tabs
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarStyle: {
    //       backgroundColor: theme.colors.paper
    //     },
    //     headerStyle: {

    //     },
    //     sceneStyle: {
    //       backgroundColor: theme.colors.background
    //     }
    //   }}
    // />
  );
};

type TCustomTabButtons = TabTriggerSlotProps & {
  text: string
}

const CustomTabsButton = ({isFocused, text, onPressIn, onPressOut, ...props}: TCustomTabButtons) => {

  const [pressed, setPressed] = useState(false)

  return (
    <Pressable
      {...props}
      style={{ opacity: pressed ? 0.5 : 1 }}
      onPressIn={(event) => {setPressed(true); onPressIn?.(event)} }
      onPressOut={(event) => {setPressed(false); onPressOut?.(event)}}
    >
      <Text className="text-text text-base"
      style={{
        textDecorationLine: isFocused ? 'underline' : 'none'
      }}>{text}</Text>
    </Pressable>
  )
}

export default Layout;
