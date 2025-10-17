import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

export default function LeadDetails({ route, navigation }) {
  const { lead } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Lead Details" />
        <Card.Content>
          <Text variant="titleLarge">{lead.title}</Text>
          <Text variant="bodyMedium">{lead.description}</Text>
          <Text variant="bodyMedium">Status: {lead.status}</Text>
          <Text variant="bodyMedium">Value: ${lead.value}</Text>
          <Text variant="bodyMedium">Created At: {lead.createdAt}</Text>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddEditLead', { lead })}
        style={styles.button}
      >
        Edit Lead
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
