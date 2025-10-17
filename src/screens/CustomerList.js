import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Button, Card, Text, FAB, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, setSearch, setPage, deleteCustomer } from '../store/slices/customerSlice';

export default function CustomerList({ navigation }) {
  const dispatch = useDispatch();
  const { customers, isLoading, error, currentPage, search, total } = useSelector(state => state.customers);
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    dispatch(fetchCustomers({ page: currentPage, search }));
  }, [dispatch, currentPage, search]);

  const handleSearch = () => {
    dispatch(setSearch(localSearch));
  };

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  const renderCustomer = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('CustomerDetails', { customer: item })}>
      <Card.Content>
        <Text variant="titleMedium">{item.name}</Text>
        <Text variant="bodyMedium">{item.email}</Text>
        <Text variant="bodyMedium">{item.company}</Text>
        <View style={styles.actions}>
          <Button onPress={() => navigation.navigate('AddEditCustomer', { customer: item })}>Edit</Button>
          <Button onPress={() => handleDelete(item.id)}>Delete</Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          label="Search by name or email"
          value={localSearch}
          onChangeText={setLocalSearch}
          style={styles.searchInput}
        />
        <Button mode="contained" onPress={handleSearch}>Search</Button>
      </View>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={customers}
        renderItem={renderCustomer}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (customers.length < total) {
            dispatch(setPage(currentPage + 1));
          }
        }}
        onEndReachedThreshold={0.1}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddEditCustomer')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
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
