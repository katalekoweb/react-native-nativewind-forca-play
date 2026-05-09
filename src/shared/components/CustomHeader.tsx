import { Text, TouchableOpacity, View } from "react-native"
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from "../themes/theme";


const CustomHeader = ({back, options, navigation} : NativeStackHeaderProps) => {

    const insets = useSafeAreaInsets()

  return (
    <View style={{ marginTop: insets.top }}>
        <View className=" bg-paper m-2 rounded-lg flex flex-row items-center p-2 justify-center h-10">
            { back && (
                <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-0">
                    <MaterialCommunityIcons 
                    name="arrow-left" 
                    size={24} 
                    color={theme.colors.text} />
                </TouchableOpacity>
            ) }
            <Text className="text-text font-bold "> {options.title} </Text>
        </View>
    </View>
  )
}

export default CustomHeader