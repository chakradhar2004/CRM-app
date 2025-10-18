import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../store/slices/customerSlice';
import { fetchLeads } from '../store/slices/leadSlice';

export default function CustomerDetails({ route, navigation }) {
  const { customer } = route.params;
  const dispatch = useDispatch();
  const { leads } = useSelector(state => state.leads);

  useEffect(() => {
    dispatch(fetchLeads({ customerId: customer.id }));
  }, [dispatch, customer.id]);

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
            onPress={() => navigation.navigate('AddEditLead', { customerId: customer.id })}
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
