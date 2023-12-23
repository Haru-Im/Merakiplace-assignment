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
        return <FilterOptionButton {...filterOption} />;
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: scaleSize(60),
    width: '100%',
  },
});
