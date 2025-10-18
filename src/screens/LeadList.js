import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Button, Card, Text, FAB, List, SegmentedButtons } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads, setStatusFilter, deleteLead } from '../store/slices/leadSlice';

const statuses = ['All', 'New', 'Contacted', 'Converted', 'Lost'];

export default function LeadList({ route, navigation }) {
  const { customerId } = route.params;
  const dispatch = useDispatch();
  const { leads, isLoading, error, statusFilter } = useSelector(state => state.leads);
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    dispatch(fetchLeads({ customerId, statusFilter: selectedStatus === 'All' ? '' : selectedStatus }));
  }, [dispatch, customerId, selectedStatus]);

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
    dispatch(setStatusFilter(value === 'All' ? '' : value));
  };

  const handleDelete = (id) => {
    dispatch(deleteLead(id));
  };

  const renderLead = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('LeadDetails', { lead: item })}>
      <Card.Content>
        <Text variant="titleMedium">{item.title}</Text>
        <Text variant="bodyMedium">{item.description}</Text>
        <Text variant="bodyMedium">Status: {item.status} | Value: ${item.value}</Text>
        <View style={styles.actions}>
          <Button onPress={() => navigation.navigate('AddEditLead', { lead: item, customerId })}>Edit</Button>
          <Button onPress={() => handleDelete(item.id)}>Delete</Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={selectedStatus}
        onValueChange={handleFilterChange}
        buttons={statuses.map(status => ({ value: status, label: status }))}
      />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={leads}
        renderItem={renderLead}
        keyExtractor={(item) => item.id.toString()}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddEditLead', { customerId })}
      />
    </View>
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
