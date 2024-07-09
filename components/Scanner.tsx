import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import Modal from "react-native-modal";

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setQrData(data);
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
      <Button title="Scan QR Code" onPress={() => setIsCameraVisible(true)} />

      {isCameraVisible && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text>Data from QR Code:</Text>
          <Text>{qrData}</Text>
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
