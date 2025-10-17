import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../store/slices/customerSlice';

export default function CustomerDetails({ route, navigation }) {
  const { customer } = route.params;
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customers.customers);

  // Mock leads for the customer
  const leads = [
    { id: 1, title: 'Lead 1', description: 'Description 1', status: 'New', value: 1000, createdAt: '2023-01-01' },
    { id: 2, title: 'Lead 2', description: 'Description 2', status: 'Contacted', value: 2000, createdAt: '2023-01-02' },
  ];

  useEffect(() => {
    // Refresh customers if needed
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Customer Details" />
        <Card.Content>
          <Text variant="titleLarge">{customer.name}</Text>
          <Text variant="bodyMedium">Email: {customer.email}</Text>
          <Text variant="bodyMedium">Phone: {customer.phone}</Text>
          <Text variant="bodyMedium">Company: {customer.company}</Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Leads" />
        <Card.Content>
          {leads.map(lead => (
            <List.Item
              key={lead.id}
              title={lead.title}
              description={`Status: ${lead.status} | Value: $${lead.value}`}
              onPress={() => navigation.navigate('LeadDetails', { lead, customer })}
            />
          ))}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AddEditLead', { customer })}
            style={styles.button}
          >
            Add Lead
          </Button>
        </Card.Content>
      </Card>
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
