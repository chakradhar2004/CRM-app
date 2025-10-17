import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard() {
  const leads = useSelector(state => state.leads.leads);
  const [statusData, setStatusData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Mock data for all leads
    const mockLeads = [
      { status: 'New', value: 1000 },
      { status: 'Contacted', value: 2000 },
      { status: 'Converted', value: 3000 },
      { status: 'Lost', value: 500 },
      { status: 'New', value: 1500 },
      { status: 'Contacted', value: 2500 },
    ];

    const statusCounts = {};
    let total = 0;
    mockLeads.forEach(lead => {
      statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
      total += lead.value;
    });

    const chartData = Object.keys(statusCounts).map(status => ({
      name: status,
      population: statusCounts[status],
      color: getColor(status),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));

    setStatusData(chartData);
    setTotalValue(total);
  }, []);

  const getColor = (status) => {
    const colors = {
      New: '#FF6384',
      Contacted: '#36A2EB',
      Converted: '#FFCE56',
      Lost: '#FF9F40',
    };
    return colors[status] || '#CCCCCC';
  };

  const barData = {
    labels: statusData.map(d => d.name),
    datasets: [{
      data: statusData.map(d => d.population),
    }],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Leads by Status" />
        <Card.Content>
          <PieChart
            data={statusData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Leads Status Distribution" />
        <Card.Content>
          <BarChart
            data={barData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Total Lead Value" />
        <Card.Content>
          <Text variant="displayMedium">${totalValue.toLocaleString()}</Text>
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
});
