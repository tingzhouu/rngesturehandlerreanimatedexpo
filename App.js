import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovingCircle from "./src/MovingCircle";

export default function App() {
  return (
    <View style={styles.container}>
      <MovingCircle />
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
