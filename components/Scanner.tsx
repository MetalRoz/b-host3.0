import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { Alert, Button, StyleSheet, View } from "react-native";

const Scanner = () => {
  const handleScanned = (data: any) => {
    Alert.alert(data);
  };
  const [permission, setPermission] = useCameraPermissions();

  const tenerpermiso = () => {
    setPermission();

    if (!permission?.granted) {
      return null;
    }

    return (
      <View>
        <CameraView
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={handleScanned}
        />
      </View>
    );
  };

  return (
    <View style={styles.view}>
        <Button title="PRESIONAME" onPress={tenerpermiso}></Button>
    </View>
  )
};

const styles = StyleSheet.create({
    view: {
        padding: 10,
        margin: 40
    }
})

export default Scanner;
