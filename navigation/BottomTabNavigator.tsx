import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import UserProfile from "../pages/User";
import { Icon } from "@gluestack-ui/themed";
import {
  HomeIcon,
  QrCodeIcon,
  ScrollTextIcon,
  Settings,
} from "lucide-react-native";
import Scanner from "../components/Scanner";

const Tab = createBottomTabNavigator();



const MyTabs = () => {


  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={HomeIcon} color={color} size="xl" />
          ),
        }}
      />
      <Tab.Screen
        name="Check-In"
        component={Scanner}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={QrCodeIcon} color={color} size="xl" />
          ),
        }}
      />
      <Tab.Screen
        name="Ordenes"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={ScrollTextIcon} color={color} size="xl" />
          ),
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={Settings} color={color} size="xl" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const BottomTabNavigator = () => {
  return <MyTabs></MyTabs>;
};

export default BottomTabNavigator;
