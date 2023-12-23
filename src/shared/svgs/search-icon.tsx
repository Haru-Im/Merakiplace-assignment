import { FC } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface SearchIconSvgComponentProps extends SvgProps {}

export const SearchIconSvgComponent: FC<SearchIconSvgComponentProps> = (props) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
        fill="#6D6D6D"
      />
    </Svg>
  );
};
