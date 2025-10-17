import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, updateCustomer } from '../store/slices/customerSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string(),
  company: Yup.string(),
});

export default function AddEditCustomer({ route, navigation }) {
  const { customer } = route.params || {};
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.customers);

  const initialValues = {
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    company: customer?.company || '',
  };

  const handleSave = (values) => {
    const customerData = values;
    if (customer) {
      dispatch(updateCustomer({ id: customer.id, customer: customerData }));
    } else {
      dispatch(addCustomer(customerData));
    }
    navigation.goBack();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSave}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <ScrollView style={styles.container}>
          <Card style={styles.card}>
            <Card.Title title={customer ? 'Edit Customer' : 'Add Customer'} />
            <Card.Content>
              <TextInput
                label="Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                style={styles.input}
                error={touched.name && errors.name}
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
              <TextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                error={touched.email && errors.email}
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <TextInput
                label="Phone"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType="phone-pad"
                style={styles.input}
              />
              <TextInput
                label="Company"
                value={values.company}
                onChangeText={handleChange('company')}
                onBlur={handleBlur('company')}
                style={styles.input}
              />
              {error && <Text style={styles.error}>{error}</Text>}
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.button}
              >
                {customer ? 'Update' : 'Add'} Customer
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
