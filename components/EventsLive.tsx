import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventsLive = ({ item, index, navigation }: any) => {
  return (
    <TouchableOpacity
      key={index}
      style={styles.eventCard}
      onPress={async () => {
        await AsyncStorage.setItem("event_data", JSON.stringify(item));
        navigation.navigate("Dashboard");
      }}
    >
      <View style={styles.eventBadgeContainer}>
        <View style={styles.eventBadge}>
          <Text style={styles.eventNumber}>{item.EVENT_ORDERD_TICKETS}</Text>
          <Text
            style={styles.eventTotal}
          >{`Total: ${item.EVENT_TOTAL_TICKETS}`}</Text>
        </View>
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.event_name}</Text>
        <Text style={styles.eventDate}>{item.event_start_datetime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#1976D2",
    padding: 10,
    paddingTop: 40,
  },
  searchInput: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
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

export default EventsLive;
