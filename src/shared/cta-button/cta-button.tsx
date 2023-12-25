import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ICtaButtonProps = {
  title: string;
  onPress: () => void;
  paddingX?: number;
};

export const CtaButton = memo<ICtaButtonProps>(({ title, onPress, paddingX = 0 }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={{ ...styles.container, paddingHorizontal: paddingX }}>
        <Text style={styles.label}>{title}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#3478F6',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
  },
});
