import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  Dimensions,
  StyleSheet,
  RefreshControl,
  FlatList,
} from 'react-native';
import HomepageBanner from '../../components/HomepageBanner';
import ServiceCardAlt from '../../components/ServiceCardAlt';
import colors from '../../config/colors';
import NavigationHOC from '../../hoc/NavigationHOC';
import Service from '../../models/Service';
import styles from '../../styles/styles';
import Article from '../../models/Article';
import NewsCard from '../../components/NewsCard.js';
import moment from 'moment';

const width = Dimensions.get('screen').width;

const HappeningScreen = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchServices();
  }, [page]);

  const fetchServices = async () => {
    const articles = await Article.get();
    setArticles(articles);
  };

  const onRefresh = async () => {
    setIsLoading(true);
    const articles = await Article.get();
    setIsLoading(false);
    setArticles(articles);
  };

  const articleDetail = article => {
    navigation.navigate('ArticleDetailScreen', {article});
  };

  return (
    <NavigationHOC
      navigation={navigation}
      containerStyle={[styles.p0]}
      disableScrollView>
      <View style={[styles.bgWhite, styles.flex1, styles.mb15]}>
        <View
          style={[
            styles.rowBetweenInCenter,
            styles.alignItemsCenter,
            styles.mh10,
            styles.mt5,
          ]}>
          <Text style={style.heading}>Happenings</Text>
        </View>
        <FlatList
          style={[styles.ph20, styles.mb30]}
          data={articles}
          numColumns={2}
          horizontal={false}
          keyExtractor={item => item.slug}
          renderItem={({item, index}) => (
            <NewsCard
              key={item.slug}
              title={item.title}
              date={moment(item.created_at).format('DD MMMM YYYY')}
              articleType={item.article_type.name}
              imageUrl={item.thumbnail_url}
              onPress={() => articleDetail(item)}
              containerStyle={
                item !== articles.length - 1
                  ? [styles.mr15, styles.mb20, styles.halfwidth]
                  : {}
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={() => setPage(prev => prev + 1)}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isLoading} />
          }
        />
      </View>
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default HappeningScreen;
