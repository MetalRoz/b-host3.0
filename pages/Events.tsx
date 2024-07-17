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
import EventsPast from "../components/EventsPast";
import { Avatar, VStack, HStack, Icon, Pressable } from "@gluestack-ui/themed";
import { User } from "lucide-react-native";
import { Tab, TabView } from "@rneui/themed";

interface EventData {
  event_name: string;
  event_start_datetime: string;
  EVENT_TOTAL_TICKETS: number;
  EVENT_ORDERD_TICKETS: number;
  event_unique_id: any;
}

export default function Events({ navigation }: any) {
  const [liveData, setLiveData] = useState<EventData[]>([]);
  const [pastData, setPastData] = useState<EventData[]>([]);
  const apiEventsLive = "https://pruebatu.com/api/v2/event/live";
  const apiEventsPast = "https://pruebatu.com/api/v2/event/past";
  const [index, setIndex] = useState(0);
  const [token, setToken] = useState("");

  const fetchEvents = async (
    apiUrl: string,
    setData: React.Dispatch<React.SetStateAction<EventData[]>>
  ) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setData(data.data); // Actualizar el estado con los datos recibidos
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const checkToken = async () => {
    const storage = await AsyncStorage.getItem("userData");
    if (storage !== null) {
      const token = JSON.parse(storage).data.token;
      setToken(token);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (token) {
      if (index === 0) {
        fetchEvents(apiEventsLive, setLiveData);
      } else {
        fetchEvents(apiEventsPast, setPastData);
      }
    }
  }, [index, token]);

  const renderItems = (data: EventData[], Component: any) => {
    if (data.length === 0) {
      return <Text>No hay datos disponibles.</Text>;
    }
    return data.map((item, index) => (
      <Component
        item={item}
        index={index}
        navigation={navigation}
      />
    ));
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
      <>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: "#1976D2",
            height: 3,
          }}
          variant="default"
        >
          <Tab.Item
            title="Próximos Eventos"
            titleStyle={{ fontSize: 13, color: "black" }}
          />
          <Tab.Item
            title="Eventos Pasados"
            titleStyle={{ fontSize: 13, color: "black" }}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ width: "100%" }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {renderItems(liveData, EventsLive)}
            </ScrollView>
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {renderItems(pastData, EventsPast)}
            </ScrollView>
          </TabView.Item>
        </TabView>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingHorizontal: 16,
  },
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
    width: "82%",
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
