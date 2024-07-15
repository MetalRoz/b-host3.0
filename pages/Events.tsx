import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventsLive from "../components/EventsLive";
import EventsPast from "../components/EventsLive";
import { Avatar, VStack, HStack, Icon, Pressable } from "@gluestack-ui/themed";
import { User } from "lucide-react-native";
// Definir la interfaz de los datos del evento
interface EventData {
  event_name: string;
  event_start_datetime: string;
  EVENT_TOTAL_TICKETS: number;
  EVENT_ORDERD_TICKETS: number;
  event_unique_id: any;
}

export default function Events({ navigation }: any) {
  const [data, setData] = useState<EventData[]>([]);
  const [activeTab, setActiveTab] = useState("live"); // Estado para la pestaña activa
  const apiEventsLive = "https://pruebatu.com/api/v2/event/live";
  const apiEventsPast = "https://pruebatu.com/api/v2/event/past";
  const [alert$, setAlert] = useState(false);

  const consultaApi = async (token: any, apiEvents: any) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await fetch(apiEvents, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Respuesta de la API:", data);
      setData(data.data); // Actualizar el estado con los datos recibidos
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const checkToken = async () => {
    const storage = await AsyncStorage.getItem("userData");
    if (storage !== null) {
      const token = JSON.parse(storage).data.token;
      if (activeTab === "live") {
        consultaApi(token, apiEventsLive);
      } else if (activeTab === "past") {
        consultaApi(token, apiEventsPast);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, [activeTab]); // Ejecutar cada vez que cambie la pestaña activa

  const renderItems = () => {
    if (data.length === 0) {
      return <Text>No hay datos disponibles.</Text>;
    }

    if (activeTab === "live") {
      return data.map((item, index) => (
        <EventsLive
          key={index}
          item={item}
          index={index}
          navigation={navigation}
        ></EventsLive>
      ));
    }

    if (activeTab === "past") {
      return data.map((item, index) => (
        <EventsPast key={index} item={item} index={index}></EventsPast>
      ));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Evento"
          placeholderTextColor="#888"
        />
        <VStack space="2xl">
          <HStack space="md">
            <Pressable
              onPress={() => navigation.navigate("User", { test: 123 })}
            >
              <Avatar bgColor="$indigo600">
                <Icon as={User} color="white" size="lg" />
              </Avatar>
            </Pressable>
          </HStack>
        </VStack>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab("live")}>
          <Text
            style={activeTab === "live" ? styles.activeTab : styles.inactiveTab}
          >
            Próximos Eventos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("past")}>
          <Text
            style={activeTab === "past" ? styles.activeTab : styles.inactiveTab}
          >
            Pasado
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderItems()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#1976D2",
    padding: 10,
    paddingTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  searchInput: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    width: "88%",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  activeTab: {
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976D2",
    borderBottomWidth: 2,
    borderBottomColor: "#1976D2",
    paddingBottom: 5,
  },
  inactiveTab: {
    marginHorizontal: 20,
    fontSize: 16,
    color: "#888",
  },
  scrollContainer: {
    padding: 10,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    elevation: 2,
  },
  eventBadgeContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  eventBadge: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E0BBE4", // Ajusta este color según necesites
    borderRadius: 10, // Para redondear los bordes de la badge
  },
  eventNumber: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  eventTotal: {
    fontSize: 12,
    color: "#FFF",
    minWidth: 60,
    maxHeight: 70,
    textAlign: "center",
  },
  eventInfo: {
    padding: 10,
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: "#888",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#1e40ff",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
