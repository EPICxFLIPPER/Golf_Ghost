import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const RangeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Range Screen!</Text>
        <Button title="Go to Welcome Screen" onPress={() => navigation.navigate('Welcome')} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 24, marginBottom: 20 },
  });
  
  export default RangeScreen;