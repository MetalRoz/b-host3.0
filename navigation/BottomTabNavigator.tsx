import React, { useEffect } from "react";
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
import {
  PermissionsAndroid, SafeAreaView
} from "react-native";
import { ReactNativeScannerView } from "@pushpendersingh/react-native-scanner";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const Scanner = () => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Cool Photo App Camera Permission",
            message:
              "Cool Photo App needs access to your camera " +
              "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          alert("Puedes usar la camara");
          return (
            <SafeAreaView style={{ flex: 1 }}>
              <ReactNativeScannerView
                onQrScanned={(value: any) => {
                  console.log(value.nativeEvent);
                }}
              />
            </SafeAreaView>
          );
        } else {
          alert("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestCameraPermission()
  };

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
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={QrCodeIcon} color={color} size="xl" />
          ),
        }}
        listeners={({ navigation, route }: any) => ({
          tabPress: (e) => {
            e.preventDefault();
            Scanner();
          },
        })}
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
