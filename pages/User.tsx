// import React, { useState, useEffect } from "react";
// import { View, TouchableOpacity, StyleSheet } from "react-native";
// import {
//   Avatar,
//   VStack,
//   HStack,
//   Divider,
//   Icon,
//   AlertDialog,
//   AlertDialogBackdrop,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogCloseButton,
//   AlertDialogFooter,
//   AlertDialogBody,
//   Heading,
//   CloseIcon,
//   ButtonGroup,
//   Text,
//   ButtonText,
//   Button,
// } from "@gluestack-ui/themed";
// import {
//   InfoIcon,
//   LanguagesIcon,
//   ShieldCheckIcon,
//   User,
// } from "lucide-react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// interface UserData {
//   fullname: string;
//   email: string;
// }

// const UserProfile = ({ navigation }: any) => {
//   const [data, setData] = useState<UserData | null>(null);
//   const [showAlertDialog, setShowAlertDialog] = useState(false);

//   const checkUser = async () => {
//     const userData = await AsyncStorage.getItem("userData");
//     if (userData !== null) {
//       setData(JSON.parse(userData).data);
//     }
//   };

//   useEffect(() => {
//     checkUser();
//   }, []);

//   return (
//     <VStack style={styles.container} space="2xl">
//       <HStack style={styles.profileHeader} space="md">
//         <Avatar bgColor="$indigo600">
//           <Icon as={User} color="white" size="lg" />
//         </Avatar>
//         <VStack>
//           <Text style={styles.profileName}>{data?.fullname || "Nombre"}</Text>
//           <Text style={styles.profileEmail}>{data?.email || "Correo"}</Text>
//         </VStack>
//       </HStack>

//       <Divider />

//       <TouchableOpacity style={styles.option}>
//         <HStack space="2xl">
//           <Icon as={ShieldCheckIcon} size="xl" color="gray" />
//           <Text style={styles.optionText}>Privacidad</Text>
//         </HStack>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.option}>
//         <HStack space="2xl">
//           <Icon as={InfoIcon} size="xl" color="gray" />
//           <Text style={styles.optionText}>Términos y Condiciones</Text>
//         </HStack>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.option}>
//         <HStack space="2xl">
//           <Icon as={LanguagesIcon} size="xl" color="gray" />
//           <Text style={styles.optionText}>Idioma</Text>
//         </HStack>
//       </TouchableOpacity>

//       <View style={styles.footer}>
//         <TouchableOpacity
//           onPress={() => setShowAlertDialog(true)}
//         >
//           <Text style={styles.logoutText}>Cerrar Sesión</Text>
//         </TouchableOpacity>
//       </View>
//       <AlertDialog
//         isOpen={showAlertDialog}
//         onClose={() => {
//           setShowAlertDialog(false);
//         }}
//       >
//         <AlertDialogBackdrop />
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <Heading size="lg">Cerrar sesión</Heading>
//             <AlertDialogCloseButton>
//               <Icon as={CloseIcon} />
//             </AlertDialogCloseButton>
//           </AlertDialogHeader>
//           <AlertDialogBody>
//             <Text size="sm">
//               ¿Estás seguro que deseas cerrar sesión?
//             </Text>
//           </AlertDialogBody>
//           <AlertDialogFooter>
//             <ButtonGroup space="lg">
//               <Button
//                 variant="outline"
//                 action="secondary"
//                 onPress={() => {
//                   setShowAlertDialog(false);
//                 }}
//               >
//                 <ButtonText>Cancelar</ButtonText>
//               </Button>
//               <Button
//                 bg="$error600"
//                 action="negative"
//                 onPress={async () => {
//                   await AsyncStorage.removeItem("userData");
//                   setShowAlertDialog(false);
//                   navigation.navigate("Login");
//                 }}
//               >
//                 <ButtonText>Cerrar sesión</ButtonText>
//               </Button>
//             </ButtonGroup>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </VStack>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "white",
//   },
//   profileHeader: {
//     alignItems: "center",
//   },
//   profileName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   profileEmail: {
//     fontSize: 14,
//     color: "gray",
//   },
//   option: {
//     paddingVertical: 15,
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   footer: {
//     marginTop: "auto",
//     alignItems: "center",
//   },
//   logoutText: {
//     fontSize: 16,
//     color: "gray",
//   },
// });

// export default UserProfile;

import React, { useState } from "react";
import { View, TouchableOpacity, ColorValue } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayout } from "../hooks";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from "../components";
import Images from "../assets/images";
import useToggle from "../hooks/useToggle";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
  Heading,
  ButtonText,
  CloseIcon,
  ButtonGroup,
  Button,
} from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  id: number;
  title: string;
  icon: string;
  color: ColorValue | string;
}
interface ItemProps {
  item: Props;
  onPress?(): void;
}
const Profile01 = React.memo((navigation: any) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [isPremium] = useToggle(true);
  const RenderItem = React.useCallback(({ item, onPress }: ItemProps) => {
    return (
      <TouchableOpacity activeOpacity={0.7}>
        <Layout style={styles.item} level="2">
          <View style={styles.itemText}>
            <View style={[styles.icon, { backgroundColor: item.color }]}>
              <Icon pack="assets" name={item.icon} style={styles.titColor} />
            </View>
            <Text
              marginTop={23}
              marginLeft={8}
              children={item.title}
              category="callout"
            />
          </View>
          <Icon pack="assets" name={"arrow_right"} style={[styles.titColor]} />
        </Layout>
      </TouchableOpacity>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <Layout style={[styles.layout, { paddingTop: top + 8 }]} level="8">
        <HStack itemsCenter>
          <NavigationAction status="primary" icon="arrow_left" size="giant" />
          <Text category="callout" status="primary" marginRight={16}>
            {"Update"}
          </Text>
        </HStack>
        <VStack alignSelfCenter>
          <Avatar
            source={Images.avatar.avatar10}
            //@ts-ignore
            style={styles.avatar}
          />
          {isPremium && (
            <Layout level="5" style={styles.crown}>
              <Icon pack="assets" name="crown" style={styles.icCrown} />
            </Layout>
          )}
        </VStack>
        <Text category="h5" center marginTop={16}>
          Philip Schmidt
        </Text>
      </Layout>
      <Content contentContainerStyle={styles.content}>
        {DATA_Profile01.map((item, index) => (
          <RenderItem item={item} key={index} />
        ))}
      </Content>

      <Text
        category="callout"
        status="platinum"
        uppercase
        center
        onPress={async () => await AsyncStorage.clear()}
        marginBottom={8}
      >
        Logout
      </Text>
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
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>¿Estás seguro que deseas cerrar sesión?</Text>
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
    </Container>
  );
});

const cerrarSesion = async () => {
  await AsyncStorage.clear();
};

export default Profile01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  layout: {
    height: "47%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 32,
  },
  crown: {
    position: "absolute",
    right: -4,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: "text-white-color",
    justifyContent: "center",
    alignItems: "center",
  },
  icCrown: {
    width: 16,
    height: 16,
  },
  buttonUpgrade: {
    alignSelf: "center",
    paddingHorizontal: 24,
    marginTop: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 20,
    justifyContent: "space-between",
    paddingRight: 16,
    marginHorizontal: 24,
  },
  titColor: {
    tintColor: "text-white-color",
  },
  icon: {
    borderRadius: 16,
    padding: 12,
    margin: 10,
  },
  itemText: {
    flexDirection: "row",
  },
  content: {
    marginTop: 24,
  },
});
const DATA_Profile01 = [
  {
    id: 0,
    icon: "target",
    title: "Goal Settings",
    color: "#4B9BAE",
  },
  {
    id: 1,
    icon: "global",
    title: "Language",
    color: "#949398",
  },
  {
    id: 2,
    icon: "moon",
    title: "Darkmode",
    color: "#215190",
  },
  {
    id: 3,
    icon: "switch",
    title: "Sync Account",
    color: "#C06363",
  },
];
