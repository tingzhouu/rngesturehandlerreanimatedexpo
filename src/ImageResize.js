import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, Image, TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { State, PanGestureHandler } from 'react-native-gesture-handler';

const { event, Value, cond, eq, set, add, debug, Clock, startClock,
  lessThan, diff, multiply, divide, stopClock, abs, timing, interpolate,
  Extrapolate, neq, and, block, call, spring,
} = Animated;

const { width, height } = Dimensions.get("window");

const CIRCLE_DIAMETER = 100;

// followed the tutorial here
// https://codedaily.io/courses/7/React-Native-Reanimated-Fundamentals/134

function runSpringTimer(clock) {
  
}


class ImageResize extends Component {
  constructor(props) {
    super(props);
    this._transX = new Value(0);
    this._config = {
      duration: 1000,
      toValue: 3,
      easing: Easing.inOut(Easing.ease),
    };
    
    
    this._springConfig = Animated.SpringUtils.makeDefaultConfig();
    this._springConfig.toValue = new Value(1);
    this._scaleX = new Value(3);
    
    this._springImage = spring(this._scaleX, this._springConfig);
    this._resetImage = timing(this._scaleX, this._config);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/kitty.png')}
          style={[
            styles.catImage,
            {
              transform: [{
                scaleX: this._scaleX,
                scaleY: this._scaleX,
              }]
            }
          ]}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // this._anim.start();
            spring(this._scaleX, this._springConfig).start();
          }}
        >
          <Text>press me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('this._springImage', this._springImage);
            this._scaleX.setValue(3);
          }}
        >
          <Text>reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setInterval(() => {
              for(let i = 0; i < 5000; i += 1) {
                console.log('blocking thread');
              }
            }, 1000);
          }}
        >
          <Text>block js thread</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catImage: {
    height: CIRCLE_DIAMETER,
    width: CIRCLE_DIAMETER,
    resizeMode: 'contain',
  },
  button: {
    marginTop: 10,
    height: 100,
    width: 200,
    backgroundColor: '#00d7',
  }
})

export default ImageResize;
