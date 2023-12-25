import { FC } from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

interface SheetSvgComponentProps extends SvgProps {}

export const SheetSvgComponent: FC<SheetSvgComponentProps> = (props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect x={3} y={2} width={18} height={20} rx={2} stroke={props.fill} strokeWidth={2} />
      <Path
        d="M8 7h8m-8 4.5h8M8 16h5.2"
        stroke={props.fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
