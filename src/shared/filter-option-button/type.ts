export enum EIconType {
  'Search' = 'Search',
  'Calendar' = 'Calendar',
}

export type FilterOptions = {
  buttonTitle: string;
  buttonIconType?: EIconType;
  selected: boolean;
  onPress: () => void;
};
