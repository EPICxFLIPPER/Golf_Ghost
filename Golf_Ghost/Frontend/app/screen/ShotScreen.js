import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Network from 'expo-network';

const ShotScreen = ({ navigation }) => {
  const [shot, setShot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hitShot = async (club) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Trying to Hit")
      const IP =await Network.getIpAddressAsync();
      console.log(IP)
      const response = await fetch(`http://128.189.25.23:3000/hitShot?club=${club}`)

      const data = await response.json();
      if (response.ok) {
        setShot(data.shot_distance);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      console.log(err)
      setError('Failed to connect to the backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hit a Shot</Text>
      <Button title="Hit 8-Iron" onPress={() => hitShot('8 Iron')} />
      {loading && <Text>Loading...</Text>}
      {shot && <Text style={styles.result}>Your shot distance: {shot} yards</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Back to Range" onPress={() => navigation.goBack()} />
      <Button title="log" onPress={() => console.log("test")}/>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    color: 'green',
  },
  error: {
    fontSize: 18,
    marginTop: 20,
    color: 'red',
  },
});

export default ShotScreen;
