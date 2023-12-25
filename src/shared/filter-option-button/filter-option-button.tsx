import { memo } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { CalendarCheckSvgComponent, SearchIconSvgComponent } from '../svgs';
import { EIconType } from './type';

type IFilterOptionButtonProps = {
  buttonTitle: string;
  buttonIconType?: EIconType;
  selected: boolean;
  onPress: () => void;
  value?: string;
  type: 'select' | 'display';
};

export const FilterOptionButton = memo<IFilterOptionButtonProps>((props) => {
  const { buttonTitle = '', buttonIconType, selected, onPress, value, type } = props;

  const buttonTypeIconMapping = {
    [EIconType.Calendar]: <CalendarCheckSvgComponent fill={value ? '#3478F6' : '#6D6D6D'} />,
    [EIconType.Search]: <SearchIconSvgComponent fill={value ? '#3478F6' : '#6D6D6D'} />,
  };

  if (type === 'select') {
    return (
      <Pressable onPress={onPress}>
        <View
          style={{
            ...styles.container,
            backgroundColor: selected ? '#82B0F4' : 'white',
            borderColor: selected ? '#82B0F4' : '#C4C4C4',
          }}
        >
          {buttonIconType && buttonTypeIconMapping[buttonIconType]}
          <Text style={{ color: selected ? 'white' : '#6D6D6D' }}>{buttonTitle}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          ...styles.container,
          borderColor: value ? '#3478F6' : '#C4C4C4',
        }}
      >
        {buttonIconType && buttonTypeIconMapping[buttonIconType]}
        <Text style={[value ? styles.labelFilled : styles.labelDefault]}>
          {value ? value : buttonTitle}
        </Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    gap: 4,
  },
  labelDefault: {
    color: '#6D6D6D',
  },
  labelFilled: {
    color: '#3478F6',
  },
});
