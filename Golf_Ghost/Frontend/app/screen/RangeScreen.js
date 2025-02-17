import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RangeScreen = () => {
  const [club, setClub] = useState('');
  const [mean, setMean] = useState('');
  const [sd, setSD] = useState('');
  const [savedData, setSavedData] = useState(null);

  // Function to save data as JSON
  const saveData = async () => {
    const userData = { club, mean,sd };
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Function to load stored data
  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue !== null) {
        setSavedData(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Load data on screen load
  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Your Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter The Club"
        value={club}
        onChangeText={setClub}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your mean"
        value={mean}
        onChangeText={setMean}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your standard devaiation"
        value={sd}
        onChangeText={setSD}
        keyboardType="numeric"
      />
      <Button title="Save Data" onPress={saveData} />

      {savedData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Stored Data:</Text>
          <Text>Club: {savedData.club}</Text>
          <Text>Mean: {savedData.mean}</Text>
          <Text>Deviation: {savedData.sd}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  resultContainer: { marginTop: 20 },
  resultText: { fontWeight: 'bold', fontSize: 16 },
});

export default RangeScreen;
