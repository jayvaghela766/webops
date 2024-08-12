import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import colors from '../../config/colors';
import PromotionCard from '../../components/PromotionCard';
import Promotion from '../../models/Promotion';
import NavigationHOC from '../../hoc/NavigationHOC';
import styles from '../../styles/styles';
import HeaderTab from '../../components/HeaderTab';
import {useFocusEffect} from '@react-navigation/native';
import {async} from 'validate.js';

const TABS = [
  {
    label: 'Active Voucher',
    value: 'active',
  },
  {
    label: 'Used Voucher',
    value: 'used',
  },
  {
    label: 'Used in-store discount',
    value: 'voucher',
  },
];

const PromotionalWalletScreen = ({navigation}) => {
  const [tab, onTab] = useState(TABS[0].value);
  const [isLoading, setIsLoading] = useState(false);
  const [myPromotions, setMyPromotions] = useState([]);
  const [usedPromotions, setUsedPromotions] = useState([]);
  const [myVoucher, setmyVoucher] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchMyPromotions();
      fetchUsedPromotions();
      fetchUsedVoucher();
    }, []),
  );

  const fetchMyPromotions = async () => {
    const data = await Promotion.mine();
    setMyPromotions(data);
  };

  const fetchUsedPromotions = async () => {
    const data = await Promotion.used();
    setUsedPromotions(data);
  };

  const fetchUsedVoucher = async () => {
    const data = await Promotion.voucher();
    setmyVoucher(data);
  };

  const promotionDetail = promotion => {
    navigation.navigate('PromotionDetailScreen', {promotion});
  };

  return (
    <NavigationHOC
      navigation={navigation}
      isLoading={isLoading}
      disableScrollView>
      <View style={[styles.ph20, styles.mt10, {marginBottom: 50}]}>
        <Text style={style.heading}>E-Wallet</Text>
        <HeaderTab
          tabs={TABS}
          onPress={onTab}
          selected={tab}
          containerStyle={styles.mb10}
        />
        {tab === 'active' && (
          <FlatList
            data={myPromotions}
            keyExtractor={(item, index) => 'active' + item.code + index}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <PromotionCard
                title={item.title}
                description={item.description}
                amount={item.amount}
                imageUrl={item.thumbnail_url}
                onPress={() => promotionDetail(item)}
                isLast={index === myPromotions.length - 1}
              />
            )}
          />
        )}
        {tab === 'used' && (
          <FlatList
            data={usedPromotions}
            keyExtractor={(item, index) => 'used' + item.code + index}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <PromotionCard
                title={item.discount.title}
                description={item.discount.description}
                amount={item.discount.amount}
                imageUrl={item.discount.thumbnail_url}
                usedAt={item.created_at}
                isLast={index === usedPromotions.length - 1}
              />
            )}
          />
        )}
        {tab === 'voucher' && (
          <FlatList
            data={myVoucher}
            keyExtractor={(item, index) => 'voucher' + item.code + index}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <PromotionCard
                title={item.title}
                description={item.description}
                amount={item.amount}
                imageUrl={'https://www.webopt.sg'+item.thumbnail}
                usedAt={item.created_at}
                isLast={index === myVoucher.length - 1}
              />
            )}
          />
        )}
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

export default PromotionalWalletScreen;
