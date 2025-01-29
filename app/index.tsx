import Onboarding from "@/components/Onboarding";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar, Text, View } from "react-native";

export default function Index() {
  return (
    <NavigationIndependentTree>
      <Onboarding/>
    </NavigationIndependentTree>
  );
}
