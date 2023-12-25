import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { scaleSize } from '../scale-size';
import { FilterOptionButton, FilterOptions } from '../filter-option-button';

type IHeaderFilterProps = {
  filters: FilterOptions[];
};

export const HeaderFilter = memo<IHeaderFilterProps>(({ filters }) => {
  return (
    <View style={styles.container}>
      {filters.map((filterOption, index) => {
        return <FilterOptionButton key={index} type="display" {...filterOption} />;
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scaleSize(60),
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scaleSize(20),
    backgroundColor: 'white',
    gap: scaleSize(8),
  },
});
