import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Avatar,
  VStack,
  HStack,
  Divider,
  Icon,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
  Heading,
  CloseIcon,
  ButtonGroup,
  Text,
  ButtonText,
  Button,
} from "@gluestack-ui/themed";
import {
  InfoIcon,
  LanguagesIcon,
  ShieldCheckIcon,
  User,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  fullname: string;
  email: string;
}

const UserProfile = ({ navigation }: any) => {
  const [data, setData] = useState<UserData | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const checkUser = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData !== null) {
      setData(JSON.parse(userData).data);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <VStack style={styles.container} space="2xl">
      <HStack style={styles.profileHeader} space="md">
        <Avatar bgColor="$indigo600">
          <Icon as={User} color="white" size="lg" />
        </Avatar>
        <VStack>
          <Text style={styles.profileName}>{data?.fullname || "Nombre"}</Text>
          <Text style={styles.profileEmail}>{data?.email || "Correo"}</Text>
        </VStack>
      </HStack>

      <Divider />

      <TouchableOpacity style={styles.option}>
        <HStack space="2xl">
          <Icon as={ShieldCheckIcon} size="xl" color="gray" />
          <Text style={styles.optionText}>Privacidad</Text>
        </HStack>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <HStack space="2xl">
          <Icon as={InfoIcon} size="xl" color="gray" />
          <Text style={styles.optionText}>Términos y Condiciones</Text>
        </HStack>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <HStack space="2xl">
          <Icon as={LanguagesIcon} size="xl" color="gray" />
          <Text style={styles.optionText}>Idioma</Text>
        </HStack>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => setShowAlertDialog(true)}
        >
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Cerrar sesión</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              ¿Estás seguro que deseas cerrar sesión?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false);
                }}
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={async () => {
                  await AsyncStorage.removeItem("userData");
                  setShowAlertDialog(false);
                  navigation.navigate("Login");
                }}
              >
                <ButtonText>Cerrar sesión</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  profileHeader: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 14,
    color: "gray",
  },
  option: {
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 16,
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "gray",
  },
});

export default UserProfile;
