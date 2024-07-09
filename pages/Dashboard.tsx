import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { VStack, HStack, Box } from "@gluestack-ui/themed";
import CircleProgress from "../components/CircleProgress";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface EventData {
  event_name: any;
  total_chackin_tickets: any;
  total_order_tickets: any;
  event_order_tickets: any;
  event_gross_income: any;
}



const Dashboard = () => {
  const [data, setData] = useState<EventData | null>(null);

  useEffect(() => {
    const consultaApi = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const event_data = await AsyncStorage.getItem("event_data");

      if (userData !== null && event_data !== null) {
        const token = JSON.parse(userData).data.token;
        const event_id = JSON.parse(event_data).event_unique_id;
        const apiEvents = `https://proyectojc.com/api/v2/event/dashbord/${event_id}`
        const options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        };

        try {
          const response = await fetch(apiEvents, options);
          if (!response.ok) {
            throw new Error("Error:"+ `${response.status}`)
          }
          const data = await response.json();
          console.log("Respuesta de la API:", data);
          setData(data.data);
          
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
      <HStack
        alignItems="center"
        justifyContent="space-between"
        style={styles.header}
      >
        <Text style={styles.title}></Text>
      </HStack>

      <Box style={styles.circleProgressContainer}>
        <CircleProgress
          progress={data.total_chackin_tickets}
          total={data.total_order_tickets}
        />
      </Box>

      <Text style={styles.subTitle}>Total de registros</Text>

      <HStack style={styles.cardsContainer} space="3xl">
        <Box style={[styles.card, { backgroundColor: "#EDE7F6" }]}>
          <Text style={styles.cardTitle}>
            0 Total {data.event_order_tickets[0].NUMBER_OF_ORDER}
          </Text>
          <Text style={styles.cardText}>
            {data.event_order_tickets[0].TICKE_TITLE}
          </Text>
          <Text style={styles.cardFooter}>
            0/{data.event_order_tickets[0].NUMBER_OF_ORDER} Registrado
          </Text>
        </Box>
        <Box style={[styles.card, { backgroundColor: "#E8F5E9" }]}>
          <Text style={styles.cardTitle}>
            0 Total {data.event_order_tickets[1].NUMBER_OF_ORDER}
          </Text>
          <Text style={styles.cardText}>
            {data.event_order_tickets[1].TICKE_TITLE}
          </Text>
          <Text style={styles.cardFooter}>
            0/{data.event_order_tickets[1].NUMBER_OF_ORDER} Registrado
          </Text>
        </Box>
      </HStack>

      <HStack style={styles.cardsContainer} space="3xl">
        <Box style={[styles.card, { backgroundColor: "#E0F7FA" }]}>
          <Text style={styles.cardTitle}>
            0 Total {data.event_order_tickets[2].NUMBER_OF_ORDER}
          </Text>
          <Text style={styles.cardText}>
            {data.event_order_tickets[2].TICKE_TITLE}
          </Text>
          <Text style={styles.cardFooter}>
            0/{data.event_order_tickets[2].NUMBER_OF_ORDER} Registrado
          </Text>
        </Box>
        <Box style={[styles.card, { backgroundColor: "#FFEBEE" }]}>
          <Text style={styles.cardTitle}>
            0 Total {data.event_order_tickets[3].NUMBER_OF_ORDER}
          </Text>
          <Text style={styles.cardText}>
            {data.event_order_tickets[3].TICKE_TITLE}
          </Text>
          <Text style={styles.cardFooter}>
            0/{data.event_order_tickets[3].NUMBER_OF_ORDER} Registrado
          </Text>
        </Box>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    justifyContent: "space-between",
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
  cardsContainer: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
    marginVertical: 5,
  },
  cardFooter: {
    fontSize: 14,
    color: "gray",
  },
});

export default Dashboard;