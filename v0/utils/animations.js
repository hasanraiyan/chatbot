// utils/animations.js
import { Animated } from 'react-native';

/**
 * Creates a fade out and slide up animation.
 * 
 * @param {Animated.Value} fadeAnim - The animated value for fade animation.
 * @param {Animated.Value} slideAnim - The animated value for slide animation.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @returns {Animated.CompositeAnimation} The animation sequence.
 */
export const fadeOutAndSlideUp = (fadeAnim, slideAnim, duration = 300) => {
  return Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
      toValue: -50,
      duration,
      useNativeDriver: true,
    }),
  ]);
};

/**
 * Creates a fade in and slide down animation.
 * 
 * @param {Animated.Value} fadeAnim - The animated value for fade animation.
 * @param {Animated.Value} slideAnim - The animated value for slide animation.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @returns {Animated.CompositeAnimation} The animation sequence.
 */
export const fadeInAndSlideDown = (fadeAnim, slideAnim, duration = 300) => {
  return Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }),
  ]);
};
