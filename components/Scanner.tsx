import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Test from "../pages/Test";

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Cambiado a useState
  const [qrData, setQrData] = useState(null);
  const [data, setData] = useState<any>([]);

  const checkIn = async (ticketId: any) => {
    const userData = await AsyncStorage.getItem("userData");
    const event_data = await AsyncStorage.getItem("event_data");
    if (userData && event_data !== null) {
      const eventId = JSON.parse(event_data).event_unique_id;
      const token = JSON.parse(userData).data.token;
      const options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const apiCheckIn = `https://proyectojc.com/api/v2/ticketcode/${ticketId}/${eventId}`;
      try {
        const response = await fetch(apiCheckIn, options);
        if (!response.ok) {
          throw new Error("Error:" + `${response.status}`);
        }
        const data = await response.json();
        console.log("Respuesta del CHECKIN:", data);
        setData(data);
        setIsOpen(true); // Abrimos la hoja inferior automáticamente
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      setIsCameraVisible(true);
    })();
    return () => setIsCameraVisible(false);
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setQrData(data);
    checkIn(data);
    setIsCameraVisible(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isCameraVisible && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {!isCameraVisible && (
        <View style={styles.modal}>
          <Test data={data} isOpen={isOpen} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});

export default Scanner;
