import { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SearchIconSvgComponent } from '../svgs';
import { EIconType } from './type';

type IFilterOptionButtonProps = {
  buttonTitle: string;
  buttonIconType?: EIconType;
  selected: boolean;
  onPress: () => void;
};

export const FilterOptionButton = memo<IFilterOptionButtonProps>((props) => {
  const { buttonTitle = '', buttonIconType, selected, onPress } = props;

  return (
    <View style={styles.container}>
      <SearchIconSvgComponent />
      <Text>{buttonTitle}</Text>
    </View>
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
  },
});
