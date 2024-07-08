import React from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import { Camera } from "react-native-camera-kit";

export default function Scanner() {
  const foto = () => {
    return (
      <Camera
        scanBarcode={true}
        onReadCode={() => Alert.alert("QR code found")} // optional
        showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
        laserColor="red" // (default red) optional, color of laser in scanner frame
        frameColor="white" // (default white) optional, color of border of scanner frame
      />
    );
  };

  return <View style={styles.Button}>
    <Button title="PRESIONAME" onPress={foto}></Button>
  </View>
}

const styles = StyleSheet.create({
    Button: {
        padding: 10,
        marginTop: 50
    }
})
