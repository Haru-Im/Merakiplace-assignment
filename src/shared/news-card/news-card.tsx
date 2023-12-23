import { memo } from 'react';
import { View } from 'react-native';

type INewsCardProps = {
  id: string;
  title: string;
  pubDate: string;
  url: string;
  source: string;
  journalist: string[];
  key: string;
};

export const NewsCard = memo<INewsCardProps>((props) => {
  const { title, pubDate, url, source, journalist } = props;
  return <View />;
});
