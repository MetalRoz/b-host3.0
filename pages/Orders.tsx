import { Icon } from "@gluestack-ui/themed";
import { ClockIcon, QrCodeIcon, TimerIcon } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderScreen = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const consultaApi = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const event_data = await AsyncStorage.getItem("event_data");

      if (userData !== null && event_data !== null) {
        const token = JSON.parse(userData).data.token;
        const event_id = JSON.parse(event_data).event_unique_id;
        const apiOrders = `https://proyectojc.com/api/v2/order/ticktes/${event_id}`;
        const options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        };

        try {
          const response = await fetch(apiOrders, options);
          if (!response.ok) {
            throw new Error("Error:" + `${response.status}`);
          }
          const result = await response.json();
          console.log("EVENNNNTOOOSSSS:", result);
          setData(result.data); // Asegúrate de obtener la propiedad 'data' del resultado
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      }
    };

    consultaApi();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <View style={styles.orderContainer}>
        <Text style={styles.nameText}>
          {item.ot_f_name + " " + (item.ot_l_name || "")}
        </Text>
        <Text style={styles.emailText}>{item.ot_email}</Text>
        <Text style={styles.orderNoText}>Order no: {item.order_id}</Text>
      </View>
      {item.ot_status === 0 ? (
        <View style={styles.iconClock}>
          <Icon as={TimerIcon} color="$blue500" />
        </View>
      ) : (
        <View style={styles.iconQr}>
          <Icon as={QrCodeIcon} color="$green600" />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.order_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconClock: {
    padding: 5,
    backgroundColor: "#d4e5ff",
    borderRadius: 50,
  },
  iconQr: {
    padding: 5,
    backgroundColor: "#d4ffe7",
    borderRadius: 50,
  },
  container: {
    paddingTop: 10,
    backgroundColor: "white",
  },
  orderContainer: {
    flexDirection: "column",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emailText: {
    color: "gray",
  },
  orderNoText: {
    color: "gray",
  },
});

export default OrderScreen;
