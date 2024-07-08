import { View } from "lucide-react-native";
import React from "react";
import {
  Alert,
  Button,
  PermissionsAndroid,
  StyleSheet,
} from "react-native";
import { Camera } from "react-native-camera-kit";

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
        <Camera
          scanBarcode={true}
          onReadCode={() => Alert.alert("QR code found")} // optional
          showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
          laserColor="red" // (default red) optional, color of laser in scanner frame
          frameColor="white" // (default white) optional, color of border of scanner frame
        />;
      } else {
        alert("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.Vista}>
      <Button title="Presioname" onPress={requestCameraPermission}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  Vista: {
    padding: 10,
    marginTop: 40,
  },
});

export default Scanner;
