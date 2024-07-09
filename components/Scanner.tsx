import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [data, setData] = useState<any>([])

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
        setData(data)
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
    return setIsCameraVisible(false);
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setQrData(data);
    checkIn(data)
    setIsCameraVisible(false);
    setIsModalVisible(true);
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

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text>{data.message}</Text>
          <Button title="Close" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Scanner;
