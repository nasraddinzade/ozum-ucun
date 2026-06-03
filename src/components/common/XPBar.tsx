import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing} from '../../theme';

interface XPBarProps {
  progress: number; // 0–1
  currentXP: number;
  nextLevelXP: number;
  showXPGain?: number | null;
}

export default function XPBar({
  progress,
  currentXP,
  nextLevelXP,
  showXPGain,
}: XPBarProps) {
  const width = useSharedValue(0);
  const gainOpacity = useSharedValue(0);
  const gainTranslate = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress, {duration: 800});
  }, [progress]);

  useEffect(() => {
    if (showXPGain) {
      gainOpacity.value = withTiming(1, {duration: 200});
      gainTranslate.value = withSpring(-24, {damping: 10});
      setTimeout(() => {
        gainOpacity.value = withTiming(0, {duration: 400});
        gainTranslate.value = withTiming(0);
      }, 1500);
    }
  }, [showXPGain]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  const gainStyle = useAnimatedStyle(() => ({
    opacity: gainOpacity.value,
    transform: [{translateY: gainTranslate.value}],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.xp}>{currentXP} XP</Text>
        {showXPGain ? (
          <Animated.Text style={[styles.xpGain, gainStyle]}>
            +{showXPGain}
          </Animated.Text>
        ) : null}
        <Text style={styles.next}>{nextLevelXP} XP</Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, barStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[2],
  },
  xp: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.gold,
  },
  next: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  xpGain: {
    fontFamily: FontFamily.sansBold,
    fontSize: FontSize.base,
    color: Colors.gold,
  },
  track: {
    height: 6,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: BorderRadius.full,
  },
});
