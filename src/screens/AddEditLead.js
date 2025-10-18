import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Text, SegmentedButtons } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addLead, updateLead, fetchLeads } from '../store/slices/leadSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';

const statuses = ['New', 'Contacted', 'Converted', 'Lost'];

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  value: Yup.number().min(0, 'Value must be positive').required('Value is required'),
});

export default function AddEditLead({ route, navigation }) {
  const { lead, customerId } = route.params || {};
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.leads);

  const initialValues = {
    title: lead?.title || '',
    description: lead?.description || '',
    status: lead?.status || 'New',
    value: lead?.value?.toString() || '',
  };

  const handleSave = (values) => {
    const leadData = { customerId, title: values.title, description: values.description, status: values.status, value: parseFloat(values.value) };
    if (lead) {
      dispatch(updateLead({ id: lead.id, lead: leadData })).then(() => {
        dispatch(fetchLeads({ customerId }));
        navigation.goBack();
      });
    } else {
      dispatch(addLead(leadData)).then(() => {
        dispatch(fetchLeads({ customerId }));
        navigation.goBack();
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSave}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <ScrollView style={styles.container}>
          <Card style={styles.card}>
            <Card.Title title={lead ? 'Edit Lead' : 'Add Lead'} />
            <Card.Content>
              <TextInput
                label="Title"
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                style={styles.input}
                error={touched.title && errors.title}
              />
              {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}
              <TextInput
                label="Description"
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                multiline
                style={styles.input}
                error={touched.description && errors.description}
              />
              {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}
              <Text>Status</Text>
              <SegmentedButtons
                value={values.status}
                onValueChange={(value) => setFieldValue('status', value)}
                buttons={statuses.map(s => ({ value: s, label: s }))}
                style={styles.segmented}
              />
              <TextInput
                label="Value"
                value={values.value}
                onChangeText={handleChange('value')}
                onBlur={handleBlur('value')}
                keyboardType="numeric"
                style={styles.input}
                error={touched.value && errors.value}
              />
              {touched.value && errors.value && <Text style={styles.error}>{errors.value}</Text>}
              {error && <Text style={styles.error}>{error}</Text>}
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.button}
              >
                {lead ? 'Update' : 'Add'} Lead
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
  segmented: {
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
