import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type INewsCardProps = {
  id: string;
  title: string;
  pubDate: string;
  webUrl: string;
  source: string;
  journalist: string;
  key: string;
};

export const NewsCard = memo<INewsCardProps>((props) => {
  const { title, pubDate, webUrl, source, journalist } = props;
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{pubDate}</Text>
      <Text>{webUrl}</Text>
      <Text>{source}</Text>
      <Text>{journalist}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderWidth: 1,
  },
});
