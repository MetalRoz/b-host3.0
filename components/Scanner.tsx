import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";
import Modal from "react-native-modal";

const Scanner = () => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleBarCodeRead = ({ data }: any) => {
    setQrData(data);
    setIsCameraVisible(false);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Button title="Scan QR Code" onPress={() => setIsCameraVisible(true)} />

      {isCameraVisible && (
        <RNCamera style={styles.camera} onBarCodeRead={handleBarCodeRead} />
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
