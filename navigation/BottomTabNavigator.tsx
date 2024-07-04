import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Event from "../pages/Event";
import Orders from "../pages/Orders";
import UserProfile from "../pages/User";
import { Icon } from "@gluestack-ui/themed";
import { HomeIcon, ListOrdered, QrCodeIcon, Settings } from "lucide-react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={Event}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={HomeIcon} color={color} size="md" />
          ),
        }}
      />
      <Tab.Screen
        name="Check-In"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={QrCodeIcon} color={color} size="md" />
          ),
        }}
      />
      <Tab.Screen
        name="Ordenes"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={ListOrdered} color={color} size="md" />
          ),
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              as={Settings}
              color={color}
              size="md"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
