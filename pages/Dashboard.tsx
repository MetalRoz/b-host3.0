import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {
  VStack,
  HStack,
  Box,
  Card,
  Heading,
  Link,
  LinkText,
  Icon,
  ArrowRightIcon,
  Text,
  ArrowLeftIcon,
} from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = ({ navigation }: any) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const consultaApi = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const event_data = await AsyncStorage.getItem("event_data");

      if (userData !== null && event_data !== null) {
        const token = JSON.parse(userData).data.token;
        const event_id = JSON.parse(event_data).event_unique_id;
        const apiEvents = `https://pruebatu.com/api/v2/event/dashbord/${event_id}`;
        const options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        };

        try {
          const response = await fetch(apiEvents, options);
          if (!response.ok) {
            throw new Error("Error:" + `${response.status}`);
          }
          const data = await response.json();
          console.log("Respuesta de la API:", data);
          setData(data.data); // Asegúrate de que data.data contiene los datos que esperas
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      }
    };

    consultaApi();
  }, []);

  if (!data) {
    return <Text>Cargando...</Text>; // Mostrar un texto de carga mientras se obtienen los datos
  }

  return (
    <VStack style={styles.container} space="3xl">

      <Box style={styles.circleProgressContainer}>
        <Card p="$5" borderRadius="$lg" maxWidth={360} m="$3">
          <TouchableOpacity onPress={() => alert(data.event_name)}>
            <Icon as={ArrowLeftIcon}></Icon>
          </TouchableOpacity>
          <Heading size="md" fontFamily="$heading" mb="$4">
            {data.event_name}
          </Heading>
          <Link href="https://gluestack.io/" isExternal>
            <HStack alignItems="center">
              <LinkText
                size="sm"
                fontFamily="$heading"
                fontWeight="$semibold"
                color="$primary600"
                $dark-color="$primary300"
                textDecorationLine="none"
              >
                Read Blog
              </LinkText>
              <Icon
                as={ArrowRightIcon}
                size="sm"
                color="$primary600"
                mt="$0.5"
                ml="$0.5"
                $dark-color="$primary300"
              />
            </HStack>
          </Link>
        </Card>
      </Box>

      <Text style={styles.subTitle}>Total de registros</Text>

      <ScrollView>
        {/* Renderiza dinámicamente todos los tickets */}
        {data.event_order_tickets.map((ticket: any, index: number) => (
          <Box
            key={index}
            style={[styles.card, { backgroundColor: getColor(index) }]}
          >
            <Text style={styles.cardTitle}>
              {ticket.TICKE_TITLE} - Total: {ticket.NUMBER_OF_ORDER}
            </Text>
            <Text style={styles.cardText}>
              Registrado: {ticket.REGISTERED_TICKETS || 0} /{" "}
              {ticket.NUMBER_OF_ORDER}
            </Text>
          </Box>
        ))}
      </ScrollView>
    </VStack>
  );
};

// Función para determinar el color del fondo de cada tarjeta
const getColor = (index: number) => {
  const colors = ["#EDE7F6", "#E8F5E9", "#E0F7FA", "#FFEBEE"];
  return colors[index % colors.length]; // Cambia el color según el índice
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  circleProgressContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Dashboard;
