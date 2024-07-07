import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import Welcome from "./screens/Welcome";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { theme } from "./constants/theme";
import ProductDetail from "./screens/ProductDetail";
import CartIconWithBadge from "./components/CartWithBadge";
import OrderSuccessScreen from "./screens/OrderComplete";

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ size, color }) => {
          return <Entypo name="home" size={size} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Cart"
      component={Cart}
      options={{
        tabBarIcon: ({ size, color }) => {
          return <CartIconWithBadge size={size} color={color} />;
        },
      }}
    />
  </Tab.Navigator>
);

// Create Stack Navigator
const Stack = createNativeStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Details" component={ProductDetail} />
      <Stack.Screen name="Complete" component={OrderSuccessScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
