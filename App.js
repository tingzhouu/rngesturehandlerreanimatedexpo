import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovingCircle from "./src/MovingCircle";
import MovingCircleGoesToOriginalPosition from "./src/MovingCircleGoesToOriginalPosition";

export default function App() {
  return (
    <View style={styles.container}>
      <MovingCircleGoesToOriginalPosition />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
