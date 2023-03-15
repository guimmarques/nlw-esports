import { Home } from "../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Game } from "../screens/Game";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="game" component={Game} />
    </Navigator>
  );
}
