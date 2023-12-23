import { memo } from 'react';
import { View } from 'react-native';

type ICtaButtonProps = {
  title: string;
};

export const CtaButton = memo<ICtaButtonProps>(({ title }) => {
  return <View />;
});
