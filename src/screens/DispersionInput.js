// src/screens/DispersionInput.js
import React, { useState } from "react";
import { View, Text, TextInput, Slider, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DispersionInput = () => {
  const [club, setClub] = useState("Driver");
  const [distance, setDistance] = useState(0);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(10);

  const handleSave = () => {
    console.log({ club, distance, width, depth });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Club:</Text>
      <Picker selectedValue={club} onValueChange={(itemValue) => setClub(itemValue)}>
        <Picker.Item label="Driver" value="Driver" />
        <Picker.Item label="9 Iron" value="9 Iron" />
        <Picker.Item label="7 Iron" value="7 Iron" />
      </Picker>

      <Text style={styles.label}>Average Distance (yards):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={distance.toString()}
        onChangeText={(text) => setDistance(Number(text))}
      />

      <Text style={styles.label}>Dispersion Width (yards):</Text>
      <Slider
        minimumValue={5}
        maximumValue={50}
        step={1}
        value={width}
        onValueChange={setWidth}
      />
      <Text>{width} yards</Text>

      <Text style={styles.label}>Dispersion Depth (yards):</Text>
      <Slider
        minimumValue={5}
        maximumValue={50}
        step={1}
        value={depth}
        onValueChange={setDepth}
      />
      <Text>{depth} yards</Text>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default DispersionInput;