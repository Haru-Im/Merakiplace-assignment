import { memo } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scaleSize } from '../scale-size';
import { FilledScrapStarSvgComponent, ScrapStarSvgComponent } from '../svgs';
import { useNavigation } from '@react-navigation/native';

type INewsCardProps = {
  id: string;
  title: string;
  pubDate: string;
  webUrl: string;
  source: string;
  journalist: string;
  key: string;
  onPressScrap: () => void;
  isScrapped: boolean;
};

export const NewsCard = memo<INewsCardProps>((props) => {
  const navigation = useNavigation();
  const { title, pubDate, source, journalist, onPressScrap, isScrapped, webUrl } = props;
  const handlePressScrapButton = () => {
    onPressScrap();
  };

  const handlePressCard = () => {
    //@ts-ignore
    navigation.navigate('WebViewScreen', {
      linkUrl: webUrl,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.articleContentContainer}>
        <Pressable onPress={handlePressCard} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </Pressable>
        <TouchableOpacity onPress={handlePressScrapButton}>
          {isScrapped ? <FilledScrapStarSvgComponent /> : <ScrapStarSvgComponent />}
        </TouchableOpacity>
      </View>
      <View style={styles.articleInfoContainer}>
        <View style={styles.sourceInfoContainer}>
          <View style={styles.sourceTextContainer}>
            <Text numberOfLines={1} style={styles.infoText}>
              {source}
            </Text>
          </View>
          <View style={styles.journalistTextContainer}>
            <Text numberOfLines={1} style={styles.infoText}>
              {journalist}
            </Text>
          </View>
        </View>
        <Text style={styles.infoText}>{pubDate}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  sourceTextContainer: {
    width: 110,
  },
  articleContentContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  articleInfoContainer: {
    flexDirection: 'row',
  },
  sourceInfoContainer: {
    gap: 8,
    flexDirection: 'row',
    flex: 1,
  },
  infoText: {
    fontSize: scaleSize(13),
  },
  journalistTextContainer: {
    width: 100,
  },
  titleText: {
    fontWeight: '600',
  },
});
