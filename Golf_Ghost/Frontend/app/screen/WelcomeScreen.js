import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

// function handleRangeButton(props) {
//     console.log("Works")
// }

const WelcomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome Screen!</Text>
        <Button title="Go to the range" onPress={() => navigation.navigate('Range')} />
        <Button title="Hit a Shot" onPress={() => navigation.navigate('Shot')} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 24, marginBottom: 20 },
  });
  
  export default WelcomeScreen;