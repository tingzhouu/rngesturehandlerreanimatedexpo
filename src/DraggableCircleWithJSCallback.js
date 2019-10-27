import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { State, PanGestureHandler } from 'react-native-gesture-handler';

const { event, Value, cond, eq, set, add, debug, Clock, startClock,
  lessThan, diff, multiply, divide, stopClock, abs, timing, interpolate,
  Extrapolate, neq, and, block, call,
} = Animated;

const { width, height } = Dimensions.get("window");

const CIRCLE_DIAMETER = 100;

// followed the tutorial here
// https://codedaily.io/courses/7/React-Native-Reanimated-Fundamentals/134

class DraggableCircle extends Component {
  constructor(props) {
    super(props);
    this.dragX = new Value(0);
    this.dragY = new Value(0);
    this.offsetX = new Value(0);
    this.offsetY = new Value(0);
    this.gestureState = new Value(-1);

    this.onGestureChange = event([{
      nativeEvent: {
        translationX: this.dragX,
        translationY: this.dragY,
        state: this.gestureState,
      }
    }])

    const addX = add(this.offsetX, this.dragX);
    const addY = add(this.offsetY, this.dragY);

    this.transX = cond(eq(this.gestureState, State.ACTIVE),
      addX,
      set(this.offsetX, addX),
    );
    this.transY = cond(eq(this.gestureState, State.ACTIVE), addY, [
      cond(eq(this.gestureState, State.END), call([addX, addY], this.onDrop)),
      set(this.offsetY, addY)
    ]);
  }

  onDrop([x, y]) {
    // if (x >= this.left && x <= this.right && (y >= this.top && y <= this.bottom)) {
    //   Alert.alert("You dropped it in the zone!");
    // }
    Alert.alert("You dropped it in the zone!");
  }

  saveDropZone = (e) => {
    const { width, height, x, y } = e.nativeEvent.layout;
    this.top = y;
    this.bottom = y + height;
    this.left = x;
    this.right = x + width;
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dropZone} onLayout={this.saveDropZone} />
        <PanGestureHandler
          onGestureEvent={this.onGestureChange}
          onHandlerStateChange={this.onGestureChange}
        >
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [
                  { translateX: this.transX },
                  { translateY: this.transY },
                ]
              }
            ]}
          />
        </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropZone: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: '50%',
  },
  circle: {
    height: CIRCLE_DIAMETER,
    width: CIRCLE_DIAMETER,
    borderRadius: CIRCLE_DIAMETER / 2,
    backgroundColor: 'tomato',
  }
})

export default DraggableCircle;
