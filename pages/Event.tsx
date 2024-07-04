import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VStack, HStack, Box } from '@gluestack-ui/themed';
import CircleProgress from '../components/CircleProgress';

const Event = () => {
  return (
    <VStack style={styles.container} space="3xl">
      <HStack alignItems="center" justifyContent="space-between" style={styles.header}>
        <Text style={styles.title}>TECHY FATULE</Text>
      </HStack>

      <Box style={styles.circleProgressContainer}>
        <CircleProgress progress={0} total={733} />
      </Box>

      <Text style={styles.subTitle}>Total de registros</Text>

      <HStack style={styles.cardsContainer} space="3xl">
        <Box style={[styles.card, { backgroundColor: '#EDE7F6' }]}>
          <Text style={styles.cardTitle}>0 Total 283</Text>
          <Text style={styles.cardText}>GENERAL (OPEN BAR)</Text>
          <Text style={styles.cardFooter}>0/283 Registrado</Text>
        </Box>
        <Box style={[styles.card, { backgroundColor: '#E8F5E9' }]}>
          <Text style={styles.cardTitle}>0 Total 279</Text>
          <Text style={styles.cardText}>STANDING VIP</Text>
          <Text style={styles.cardFooter}>0/279 Registrado</Text>
        </Box>
      </HStack>

      <HStack style={styles.cardsContainer} space="3xl">
        <Box style={[styles.card, { backgroundColor: '#E0F7FA' }]}>
          <Text style={styles.cardTitle}>0 Total 104</Text>
          <Text style={styles.cardText}>FRONT STAGE</Text>
          <Text style={styles.cardFooter}>0/104 Registrado</Text>
        </Box>
        <Box style={[styles.card, { backgroundColor: '#FFEBEE' }]}>
          <Text style={styles.cardTitle}>0 Total 67</Text>
          <Text style={styles.cardText}>GENERAL</Text>
          <Text style={styles.cardFooter}>0/67 Registrado</Text>
        </Box>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  circleProgressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardsContainer: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    marginVertical: 5,
  },
  cardFooter: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Event;
