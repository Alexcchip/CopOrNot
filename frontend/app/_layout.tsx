import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
  screenOptions={{
    headerStyle: { backgroundColor: "white" },
    headerTintColor: "black",
    headerTitleStyle: { fontWeight: "bold" },
    headerShown: false,
    //fuck the header for now
  }}
  />
}
