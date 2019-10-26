import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const { event, Value, cond, eq, set, add, debug, Clock, startClock,
  lessThan, diff, multiply, divide, stopClock, abs, timing, interpolate,
  Extrapolate, neq, and, block,
} = Animated;

const SQUARE_LENGTH = 100;

// followed the tutorial here
// https://codedaily.io/courses/7/React-Native-Reanimated-Fundamentals/132

function runOpacityTimer(clock, gestureState) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(-1),
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    // first block
    cond(and(
      eq(gestureState, State.BEGAN),
      neq(config.toValue, 1),
    ),
      [
        set(state.finished, 0),
        set(state.frameTime, 0),
        set(state.time, 0),
        set(config.toValue, 1),
        startClock(clock),
      ],
    ),
    // second block
    cond(and(
      eq(gestureState, State.END),
      neq(config.toValue, 0),
    ),
      [
        set(state.finished, 0),
        set(state.frameTime, 0),
        set(state.time, 0),
        set(config.toValue, 0),
        startClock(clock),
      ]
    ),
    // third block
    timing(clock, state, config),
    // fourth block
    cond(
      state.finished,
      stopClock(clock),
    ),
    // fifth block
    interpolate(state.position, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    }),
  ])
}

class OpacitySquare extends Component {
  gestureState = new Value(-1);
  clock = new Clock();
  onStateChange = event([{
    nativeEvent: { state: this.gestureState },
  }]);
  opacity = runOpacityTimer(this.clock, this.gestureState);

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 40 }}>
        <TapGestureHandler
          onHandlerStateChange={this.onStateChange}
        >
          <Animated.View
            style={[styles.square, { opacity: this.opacity }]}
          >

          </Animated.View>
        </TapGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  square: {
    height: SQUARE_LENGTH,
    width: SQUARE_LENGTH,
    backgroundColor: 'tomato',
  }
})

export default OpacitySquare;
