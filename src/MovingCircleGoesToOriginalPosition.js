import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { event, Value, cond, eq, set, add, debug, Clock, startClock, lessThan, diff, multiply, divide, stopClock, abs } = Animated;

const CIRCLE_DIAMETER = 100;
const PRESET_VELOCITY = 50;

// followed the tutorial here
// https://blog.swmansion.com/simple-physics-with-reanimated-part-2-60b57922f81b

function getSpeedOfBall(timeElapsed, position, velocity) {
  return set(
    velocity,
    cond(
      lessThan(position, 0),
      PRESET_VELOCITY,
      -PRESET_VELOCITY,
    ),
  );
}

// example function of interaction from tutorial
function interaction(gestureTranslation, gestureState) {
  const start = new Value(0);
  const dragging = new Value(0);
  const position = new Value(0);

  const clock = new Clock();
  const velocity = new Value(0);
  const timeElapsed = divide(diff(clock), 1000);

  return cond(
    eq(gestureState, State.ACTIVE),
    [
      cond(eq(dragging, 0), [set(dragging, 1), set(start, position)]),
      stopClock(clock),
      timeElapsed,
      set(position, add(start, gestureTranslation)),
    ],
    [
      // debug('position', position),
      set(dragging, 0),
      startClock(clock),
      getSpeedOfBall(timeElapsed, position, velocity),
      cond(lessThan(abs(velocity), 5), stopClock(clock)),
      set(position, add(position, multiply(velocity, timeElapsed))),
    ]
  );
}

class MovingCircle extends Component {
  constructor(props) {
    super(props);
    
    const gestureX = new Value(0);
    const gestureY = new Value(0);
    const gestureState = new Value(-1);
    
    this._onGestureEvent = event([
      {
        nativeEvent: {
          translationX: gestureX,
          state: gestureState,
        }
      }
    ]);

    this._transX = interaction(gestureX, gestureState);
  }

  printStuff = (stuff) => {
    console.log('stuff.nativeEvent', stuff.nativeEvent);
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 40 }}>
        <PanGestureHandler
          // onGestureEvent={this.printStuff}
          // onHandlerStateChange={this.printStuff}
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onGestureEvent}
        >
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{
                  translateX: this._transX,
                  // translateY: this._transY,
                }],
              }
            ]}
          />
        </PanGestureHandler>
        <Text onPress={this.printStuff}>press</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    height: CIRCLE_DIAMETER,
    width: CIRCLE_DIAMETER,
    borderRadius: CIRCLE_DIAMETER / 2,
    backgroundColor: 'red',
  }
})

export default MovingCircle;
