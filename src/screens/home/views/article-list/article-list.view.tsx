import { memo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NewsCard } from '../../../../shared';
import { IArticleType } from '../../hooks';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

type IArticleListViewProps = {
  articleList: IArticleType[];
};

dayjs.locale('ko');

export const ArticleListView = memo<IArticleListViewProps>(({ articleList }) => {
  return (
    <ScrollView>
      <View style={styles.boxWrapper}>
        {articleList.map((article) => {
          console.log(article.pub_date);
          const date = dayjs(article.pub_date);
          const formattedDate = date.format('YYYY.MM.DD');
          const day = ['일', '월', '화', '수', '목', '금', '토'][date.day()];
          const articleDate = `${formattedDate} (${day})`;

          return (
            <NewsCard
              key={article._id}
              id={article._id}
              title={article.abstract}
              pubDate={articleDate}
              source={article.source}
              webUrl={article.web_url}
              journalist={article.byline.original}
            />
          );
        })}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  boxWrapper: {
    gap: 4,
  },
});
