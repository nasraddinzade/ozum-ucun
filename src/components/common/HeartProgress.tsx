import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {Colors, FontFamily, FontSize} from '../../theme';

interface HeartProgressProps {
  progress: number; // 0–1
  size?: number;
}

// A single whole heart. It starts small and grows with progress —
// no broken heart, the metaphor is gentle growth, not sadness.
const HEART_PATH =
  'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4 ' +
  'c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z';

const MIN_SCALE = 0.4;

export default function HeartProgress({progress, size = 120}: HeartProgressProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const targetScale = MIN_SCALE + (1 - MIN_SCALE) * clamped;

  const scale = useSharedValue(MIN_SCALE);

  useEffect(() => {
    // grow to the target size, with a soft spring overshoot
    scale.value = withTiming(targetScale, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    });
  }, [targetScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  // fill deepens as the heart grows
  const fillTop = clamped < 0.5 ? Colors.heartColorSoft : Colors.heartColor;
  const fillBottom = clamped < 0.5 ? Colors.heartColor : Colors.heartWhole;
  const heartOpacity = 0.55 + 0.45 * clamped;

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Animated.View style={[animatedStyle, {opacity: heartOpacity}]}>
        <Svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 29.6">
          <Defs>
            <LinearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={fillTop} />
              <Stop offset="1" stopColor={fillBottom} />
            </LinearGradient>
          </Defs>
          <Path d={HEART_PATH} fill="url(#heartGrad)" />
        </Svg>
      </Animated.View>
      <Text style={styles.percent}>{Math.round(clamped * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 6,
    letterSpacing: 1,
  },
});
