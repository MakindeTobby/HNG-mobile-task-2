import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Cart from "./screens/Cart";
import Welcome from "./screens/Welcome";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { theme } from "./constants/theme";
import ProductDetail from "./screens/ProductDetail";

//  Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      //   tabBarShowLabel: false,
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
          return <Entypo name="shopping-cart" size={size} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({ size, color }) => {
          return <FontAwesome name="user" size={size} color={color} />;
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
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
