import { FC } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface HomeSvgComponentProps extends SvgProps {}

export const HomeSvgComponent: FC<HomeSvgComponentProps> = (props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M22 9.841v12.51c0 .32-.319.65-.648.65h-4.73c-.319 0-.535-.217-.535-.537v-.103a4.204 4.204 0 00-4.195-4.204c-2.365 0-4.195 1.937-4.195 4.204v.103c0 .32-.216.536-.535.536H2.648C2.329 23 2 22.68 2 22.351V9.841c0-.865.319-1.617.967-2.153l7.208-6.039c.966-.865 2.478-.865 3.547 0l7.209 6.039C21.68 8.224 22 8.976 22 9.84z"
        fill={props.fill}
      />
    </Svg>
  );
};
