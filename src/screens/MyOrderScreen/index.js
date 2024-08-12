import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import MyOrderCard from '../../components/MyOrderCard';
import colors from '../../config/colors';
import NavigationHOC from '../../hoc/NavigationHOC';
import Order from '../../models/Order';
import Request from '../../helper/Request';
import Features from '../../helper/Features';
import api from '../../config/api';

const MyOrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    const response = await Order.all(page, {
      per_page: 30
    });

    if (response.data.length) {
      const newOrderList = [...orders, ...response.data];
      setOrders(newOrderList);
      setPage(response.current_page);
    }
  };

  const onRefresh = async () => {
    setIsLoading(true);
    const response = await Order.all(page, {
      per_page: 30
    });
    setIsLoading(false);

    if (response.data.length) {
      setOrders(response.data);
      setPage(response.current_page);
    }
  };

  const invoice = async (order) => {
    try  {
      setIsLoading(true);
      const response = await Request.download(`${api.GET_INVOICE}/${order.code}`, `invoice-${order.code}`, 'pdf');
      console.log('response', response);
      setIsLoading(false);
      if (response) {
        Features.toast('Dokumen berhasil terunduh', 'success');
        if (Platform.OS === 'android') {
          ReactNativeBlobUtil.android.actionViewIntent(response, 'application/pdf');
        } else {
          ReactNativeBlobUtil.ios.openDocument(response);
        }
      }
    } catch (error) {
      setIsLoading(false);
      Features.toast(error, 'error');
    }
  };

  return (
    <NavigationHOC isLoading={isLoading} navigation={navigation} disableScrollView>
      <Text style={style.heading}>Recent Purchase</Text>
      <View style={{ paddingVertical: 15, marginBottom: 50 }}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <MyOrderCard
              name={item?.order_details[0].product.name}
              price={item?.order_details[0].product_price.price}
              option={item?.order_details[0].product_option?.description}
              color={item?.order_details[0].product_color?.name}
              lensPower={item?.order_details[0].lens_power?.power}
              quantity={item?.order_details[0].quantity}
              subtotal={item?.order_details[0].total}
              invoice={() => invoice(item)}
              imageUrl={item?.order_details[0].product.thumbnail_url}
              hiddenItem={item.order_details.length - 1}
              onPress={() => navigation.navigate('OrderDetailScreen', { order: item })}
            />
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={isLoading}
            />
          }
        />
      </View>
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  heading: {
    backgroundColor: colors.primary,
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
});

export default MyOrderScreen;