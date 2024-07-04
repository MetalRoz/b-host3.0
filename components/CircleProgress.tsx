import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Circle } from "react-native-progress";

const CircleProgress = ({
  progress,
  total,
}: {
  progress: number;
  total: number;
}) => {
  return (
    <View style={styles.container}>
      <Circle
        size={120}
        progress={progress / total}
        thickness={10}
        color="#3b5998"
      />
      <View style={styles.textContainer}>
        <Text style={styles.progressText}>{progress}</Text>
        <Text style={styles.totalText}>{`/${total}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 16,
    color: "gray",
  },
});

export default CircleProgress;
