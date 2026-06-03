import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import {Colors, FontFamily, FontSize} from '../../theme';

interface HeartProgressProps {
  progress: number; // 0–1
  size?: number;
}

export default function HeartProgress({
  progress,
  size = 120,
}: HeartProgressProps) {
  const fill = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    fill.value = withTiming(progress, {duration: 1200});
    scale.value = withSpring(1.05, {damping: 8}, () => {
      scale.value = withSpring(1);
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const heartLabel =
    progress < 0.33 ? '💔' : progress < 0.66 ? '🩹' : '❤️';

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Animated.View style={animatedStyle}>
        <Text style={[styles.heart, {fontSize: size * 0.65}]}>{heartLabel}</Text>
      </Animated.View>
      <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    textAlign: 'center',
  },
  percent: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 4,
    letterSpacing: 1,
  },
});
