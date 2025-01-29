import { Stack } from "expo-router";
import "./global.css";
import { COLORS } from "@/constants/data";

export default function RootLayout() {
  return <Stack screenOptions={{headerShown:false, navigationBarColor:COLORS.primary}} />;
}
