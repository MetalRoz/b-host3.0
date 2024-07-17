import { Box, HStack, Icon, VStack } from "@gluestack-ui/themed";
import { QrCodeIcon, TimerIcon } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tab, TabView } from "@rneui/themed";

const OrderScreen = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const consultaApi = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const event_data = await AsyncStorage.getItem("event_data");

      if (userData !== null && event_data !== null) {
        const token = JSON.parse(userData).data.token;
        const event_id = JSON.parse(event_data).event_unique_id;
        const apiOrders = `https://pruebatu.com/api/v2/order/ticktes/${event_id}`;
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
          setData(result.data); // Asegúrate de obtener la propiedad 'data' del resultado
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      }
    };

    consultaApi();
  }, []);

  useEffect(() => {
    filterData();
  }, [search, selectedIndex, data]);

  const filterData = () => {
    let filtered = data.filter(
      (item) =>
        item.ot_f_name.toLowerCase().includes(search.toLowerCase()) ||
        item.ot_l_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.ot_email.toLowerCase().includes(search.toLowerCase()) ||
        item.order_id.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedIndex === 1) {
      filtered = filtered.filter((item) => item.ot_status === 1);
    } else if (selectedIndex === 2) {
      filtered = filtered.filter((item) => item.ot_status === 0);
    }

    setFilteredData(filtered);
  };

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
      <Tab
        value={selectedIndex}
        onChange={setSelectedIndex}
        indicatorStyle={{
          backgroundColor: "blue",
          height: 3,
        }}
        variant="default"
      >
        <Tab.Item>
          <HStack>
            <TouchableOpacity>
              <Text>TODO</Text>
            </TouchableOpacity>
          </HStack>
        </Tab.Item>
        <Tab.Item>
          <TouchableOpacity>
            <HStack>
              <Icon as={QrCodeIcon}></Icon>
              <Text>Check-in</Text>
            </HStack>
          </TouchableOpacity>
        </Tab.Item>
        <Tab.Item>
          <HStack>
            <Icon as={TimerIcon}></Icon>
            <Text>Pendiente</Text>
          </HStack>
        </Tab.Item>
      </Tab>

      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />

      <TabView
        value={selectedIndex}
        onChange={setSelectedIndex}
        animationType="spring"
      >
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FlatList data={filteredData} renderItem={renderItem} />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FlatList data={filteredData} renderItem={renderItem} />
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FlatList data={filteredData} renderItem={renderItem} />
          </ScrollView>
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f1f1f1",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  selectedTab: {
    backgroundColor: "#007bff",
  },
  tabText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  selectedTabText: {
    color: "#fff",
  },
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
    flex: 1,
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
  scrollContainer: {
    paddingBottom: 20,
  },
});

export default OrderScreen;
