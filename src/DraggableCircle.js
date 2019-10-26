import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { State, PanGestureHandler } from 'react-native-gesture-handler';

const { event, Value, cond, eq, set, add, debug, Clock, startClock,
  lessThan, diff, multiply, divide, stopClock, abs, timing, interpolate,
  Extrapolate, neq, and, block,
} = Animated;

const { width, height } = Dimensions.get("window");

const CIRCLE_DIAMETER = 100;

// followed the tutorial here
// https://codedaily.io/courses/7/React-Native-Reanimated-Fundamentals/133

class DraggableCircle extends Component {
  dragX = new Value(0);
  dragY = new Value(0);
  offsetX = new Value(0 / 2);
  offsetY = new Value(0 / 2);
  gestureState = new Value(-1);

  onGestureEvent = event([{
    nativeEvent: {
      translationX: this.dragX,
      translationY: this.dragY,
      state: this.gestureState,
    }
  }]);

  transX = cond(
    eq(this.gestureState, State.ACTIVE),
    add(this.offsetX, this.dragX),
    set(this.offsetX, add(this.offsetX, this.dragX)),
  );

  transY = cond(
    eq(this.gestureState, State.ACTIVE),
    add(this.offsetY, this.dragY),
    set(this.offsetY, add(this.offsetY, this.dragY)),
  );

  opacity = interpolate(this.transY, {
    inputRange: [0, height],
    outputRange: [0.1, 1],
  });

  borderWidth = interpolate(this.transX, {
    inputRange: [0, width],
    outputRange: [0, 5],
    extrapolate: Extrapolate.CLAMP,
  })

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 40 }}>
        <PanGestureHandler
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onGestureEvent}
        >
          <Animated.View
            style={[
              styles.circle,
              { 
                transform: [
                  { translateX: this.transX },
                  { translateY: this.transY },
                ],
                opacity: this.opacity,
                // borderWidth: 2,
                borderWidth: this.borderWidth,
                borderColor: 'black',
              },
            ]}
          >

          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    height: CIRCLE_DIAMETER,
    width: CIRCLE_DIAMETER,
    borderRadius: CIRCLE_DIAMETER / 2,
    backgroundColor: 'tomato',
  }
})

export default DraggableCircle;
