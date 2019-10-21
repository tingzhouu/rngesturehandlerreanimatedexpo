import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { event, Value, cond, eq, set, add, debug } = Animated;

const CIRCLE_DIAMETER = 100;

// function of interaction that i tried myself.
// surprisingly, this works.
function interaction(gestureTranslation, gestureState) {
  let startPosition = new Value(0);

  return cond(
    // condition node
    eq(gestureState, State.ACTIVE),

    // if node
    [add(startPosition, gestureTranslation),],

    // else node
    [set(startPosition, add(startPosition, gestureTranslation))]
  );
}

/*
// example function of interaction from tutorial
function interaction(gestureTranslation, gestureState) {
  const start = new Value(0);
  const dragging = new Value(0);
  const position = new Value(0);

  return cond(
    eq(gestureState, State.ACTIVE),
    [
      cond(eq(dragging, 0), [set(dragging, 1), set(start, position)]),
      set(position, add(start, gestureTranslation)),
    ],
    [set(dragging, 0), position]
  );
}
*/

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
          translationY: gestureY,
          state: gestureState,
        }
      }
    ]);

    this._transX = interaction(gestureX, gestureState);
    this._transY = interaction(gestureY, gestureState);
  }

  printStuff = (stuff) => {
    console.log('stuff.nativeEvent', stuff.nativeEvent);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PanGestureHandler
          // onGestureEvent={this.printStuff}
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onGestureEvent}
          // onHandlerStateChange={this.printStuff}
        >
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{
                  translateX: this._transX,
                  translateY: this._transY,
                  // translateY: 100,
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
