import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import colors from '../../config/colors';
import PromotionCard from '../../components/PromotionCard';
import Promotion from '../../models/Promotion';
import NavigationHOC from '../../hoc/NavigationHOC';
import styles from '../../styles/styles';
import {useFocusEffect} from '@react-navigation/native';

const PromotionalScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [storeDeal, setStoreDeal] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchPromotions();
    }, []),
  );

  const fetchPromotions = async () => {
    setIsLoading(true);
    const {data, vouchers} = await Promotion.get();
    setPromotions(data);
    setStoreDeal(vouchers);
    setIsLoading(false);
  };

  const promotionDetail = (promotion, voucher) => {
    navigation.navigate('PromotionDetailScreen', {promotion, voucher});
  };

  return (
    <NavigationHOC
      navigation={navigation}
      isLoading={isLoading}
      disableScrollView>
      <View style={[styles.ph20]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={() => (
              <View style={[styles.mv20]}>
                <Text style={style.heading}>Latest Promotions</Text>
              </View>
            )}
            data={promotions}
            keyExtractor={(item, index) => 'active' + item.code + index}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <PromotionCard
                title={item.title}
                description={item.description}
                amount={item.amount}
                imageUrl={item.thumbnail_url}
                onPress={() => promotionDetail(item, false)}
                // isLast={index === promotions.length - 1}
              />
            )}
          />
          <FlatList
            ListHeaderComponent={() => (
              <View style={[styles.mv20]}>
                <Text style={style.heading}>In Store Deals</Text>
              </View>
            )}
            data={storeDeal}
            keyExtractor={(item, index) => 'active' + item.code + index}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <PromotionCard
                title={item.title}
                description={item.description}
                amount={item.amount}
                imageUrl={'https://www.webopt.sg' + item.thumbnail}
                onPress={() => promotionDetail(item, true)}
                isLast={index === storeDeal.length - 1}
              />
            )}
          />
        </ScrollView>
      </View>
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  tab: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: colors.primary,
  },
  tabActive: {
    fontFamily: 'OpenSans-Bold',
    backgroundColor: '#D5D8DD',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default PromotionalScreen;
