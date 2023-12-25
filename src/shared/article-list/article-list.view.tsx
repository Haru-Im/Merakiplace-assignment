import { memo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NewsCard } from '../news-card';
import { scaleSize } from '../scale-size';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useScrap } from '../../providers';
import { IArticle } from '../../types';

dayjs.extend(utc);

type IArticleListViewProps = {
  articleList: IArticle[];
  fetchMore?: () => void;
};

export const ArticleListView = memo<IArticleListViewProps>(
  ({ articleList, fetchMore = () => {} }) => {
    const { isScrapped, scrap } = useScrap();

    const renderItem = ({ item }: { item: IArticle }) => {
      const date = dayjs.utc(item.pub_date);
      const formattedDate = date.format('YYYY.MM.DD');
      const day = ['일', '월', '화', '수', '목', '금', '토'][date.day()];
      const articleDate = `${formattedDate} (${day})`;
      const isScrappedArticle = isScrapped(item._id);

      const scrapArticle = () => {
        scrap({
          _id: item._id,
          abstract: item.abstract,
          id: item._id,
          title: item.abstract,
          pub_date: item.pub_date,
          web_url: item.web_url,
          source: item.source,
          journalist: item.byline.original,
          byline: item.byline,
          headline: item.headline,
        });
      };
      return (
        <NewsCard
          key={item.web_url}
          id={item._id}
          title={item.headline.main}
          pubDate={articleDate}
          source={item.source}
          webUrl={item.web_url}
          journalist={item.byline.original}
          isScrapped={isScrappedArticle}
          onPressScrap={scrapArticle}
        />
      );
    };

    if (articleList.length === 0) {
      return null;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={articleList}
          renderItem={renderItem}
          contentContainerStyle={styles.boxWrapper}
          onEndReached={fetchMore}
          horizontal={false}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxWrapper: {
    gap: scaleSize(8),
    paddingBottom: scaleSize(80),
  },
});
