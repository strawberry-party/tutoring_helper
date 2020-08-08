import {
  State as GestureState,
  PanGestureHandler,
} from 'react-native-gesture-handler';

import Animated from 'react-native-reanimated';
import React from 'react';
import { View } from 'react-native';

const {
  event,
  cond,
  Value,
  block,
  set,
  eq,
  not,
  clockRunning,
  and,
  startClock,
  stopClock,
  spring,
  greaterThan,
  lessThan,
  call,
  Clock,
} = Animated;


class SwipeRow extends React.Component {
  clock = new Clock();
  gestureState = new Value(GestureState.UNDETERMINED);
  animState = {
    finished: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    time: new Value(0),
  };

  // Spring animation config
  // Determines how "springy" row is when it
  // snaps back into place after released
  animConfig = {
    toValue: new Value(0),
    damping: 20,
    mass: 0.2,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.2,
    restDisplacementThreshold: 0.2,
  };

  // Called whenever gesture state changes. (User begins/ends pan,
  // or if the gesture is cancelled/fails for some reason)
  onHandlerStateChange = event([
    {
      nativeEvent: ({ state }) =>
        block([
          // Update our animated value that tracks gesture state
          set(this.gestureState, state),
          // Spring row back into place when user lifts their finger before reaching threshold
          cond(
            and(eq(state, GestureState.END), not(clockRunning(this.clock))),
            startClock(this.clock)
          ),
        ]),
    },
  ]);

  onPanEvent = event([
    {
      nativeEvent: ({ translationX }) =>
        block([
          cond(eq(this.gestureState, GestureState.ACTIVE), [
            // Update our translate animated value as the user pans
            set(this.animState.position, translationX),
            // If swipe distance exceeds threshold, delete item
            cond(
              lessThan(translationX, this.props.swipeThreshold),
              call([this.animState.position], () =>
                this.props.onSwipe()
              )
            ),
          ]),
        ]),
    },
  ]);

  render() {
    const { children } = this.props;
    return (
      <PanGestureHandler
        minDeltaX={50}
        onGestureEvent={this.onPanEvent}
        onHandlerStateChange={this.onHandlerStateChange}>
        <Animated.View
          style={{
            flex: 1,
            transform: [{ translateX: this.animState.position }],
          }}>
          <Animated.Code>
            {() =>
              block([
                // If the clock is running, increment position in next tick by calling spring()
                cond(clockRunning(this.clock), [
                  spring(this.clock, this.animState, this.animConfig),
                  // Stop and reset clock when spring is complete
                  cond(this.animState.finished, [
                    stopClock(this.clock),
                    set(this.animState.finished, 0),
                  ]),
                ]),
              ])
            }
          </Animated.Code>
          {children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default SwipeRow;
