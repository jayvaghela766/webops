import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import HeaderTab from '../../components/HeaderTab';
import MyOrderCardAlt from '../../components/MyOrderCardAlt';
import colors from '../../config/colors';
import Features from '../../helper/Features';
import NavigationHOC from '../../hoc/NavigationHOC';
import Order from '../../models/Order';
import styles from '../../styles/styles';

const TABS = [
  {
    label: 'Current Orders',
    value: 'current'
  },
  {
    label: 'Past Orders',
    value: 'past'
  }
];

const MyOrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tab, onTab] = useState(TABS[0].value);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  useEffect(() => {
    fetchOrders();
  }, [page]);

  useEffect(() => {
    fetchOrders(1)
  }, [tab]);

  const fetchOrders = async (currentPage = null) => {
    setIsLoading(true);
    const requestedPage = currentPage || page;
    const response = await Order.all(requestedPage, {
      status: tab,
      per_page: 30
    });

    let newOrderList = [];
    if (page === 1) {
      newOrderList = response.data;
    } else {
      newOrderList = [...orders, ...response.data];
    }

    setOrders(newOrderList);
    setPage(response.current_page);
    setIsLoading(false);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchOrders(1);
    setIsRefreshing(false);
  };

  const onPressRefund = (order) => {
    if (order.can_refund) {
      navigation.navigate('RefundRequestScreen', { order });
    } else {
      Features.toast('You can\'t cancel this order', 'warning');
    }
  }

  return (
    <NavigationHOC navigation={navigation} disableScrollView>
      <View style={[styles.flex1, styles.p20, styles.mb30]}>
        <Text style={style.heading}>Orders</Text>
        <HeaderTab tabs={TABS} onPress={onTab} selected={tab} containerStyle={styles.mb10} />
        <FlatList
          data={orders}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <MyOrderCardAlt
              order={item}
              items={item.order_details}
              onPressTrack={() => navigation.navigate('TrackOrderScreen', { order: item })}
              onPressRefund={() => onPressRefund(item)}
              onPressFeedback={() => navigation.navigate('ContactUsScreen')}
            />
          )}
          ListEmptyComponent={() => {
            return isLoading
            ?  <Text style={[styles.normal, styles.f16]}></Text>
            :  <Text style={[styles.normal, styles.f16]}>You have no {`${tab}`} orders.</Text>
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={isRefreshing}
            />
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
    color: colors.dark
  },
});

export default MyOrderScreen;