import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovingCircle from "./src/MovingCircle";
import MovingCircleGoesToOriginalPosition from "./src/MovingCircleGoesToOriginalPosition";
import OpacitySquare from './src/OpacitySquare';
import DraggableCircle from "./src/DraggableCircle";
import DraggableCircleWithJSCallback from './src/DraggableCircleWithJSCallback';
import ImageResize from './src/ImageResize';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageResize />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
