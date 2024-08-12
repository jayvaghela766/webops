import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import OrderItem from '../../components/OrderItem';
import Spinner from '../../hoc/Spinner';
import colors from '../../config/colors';
import Order from '../../models/Order';
import styles from '../../styles/styles';

const OrderDetailScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({
    order_address_shipping: {},
    order_details: []
  });

  useEffect(() => {
    if (route.params?.order) {
      fetchOrderDetail();
    }
  }, [route.params?.order]);

  useEffect(() => {
    if (route.params?.fetchDetail) {
      fetchOrderDetail();
    }
  }, [route.params?.fetchDetail]);

  const fetchOrderDetail = async () => {
    setIsLoading(true);
    const data = await Order.get(route.params.order.id);
    setIsLoading(false);
    if (data) {
      setOrder(data);
    }
  };

  const confirmArrived = (payment) => {
    Alert.alert('Confirmation', 'Do you want to confirm that this order has been received?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: arrived
      }
    ])
  };

  const arrived = async () => {
    setIsLoading(true);
    const response = await Order.setAsDelivered(order.id);
    if (response) {
      await fetchOrderDetail();
    }
  };

  const askForRefund = async () => {
    navigation.navigate('RefundRequestScreen', { order });
  };

  return (
    <Spinner isLoading={isLoading}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={fetchOrderDetail}
            refreshing={isLoading}
          />
        }>
        <View style={style.status}>
          <Text style={[styles.bold, styles.textWhite, styles.f14]}>{order.order_status}</Text>
          <Text style={[styles.normal, styles.textWhite, styles.f10]}>{moment(order.updated_at).format('MMM DD YYYY hh:mm A')}</Text>
          { order.tracking_number && <Text style={[styles.normal, styles.textWhite, styles.f10]}>{`Tracking Number: ${order.tracking_number} (${order.courier?.name})`}</Text> }
        </View>
        <View style={style.section}>
          <Text style={[styles.bold, styles.mb10]}>Shipping Address</Text>
          {
            order.self_collection_at ? (
              <Text>{`Self Collection At: ${order.self_collection_at.name}`}</Text>
            ) : (
              <>
                <Text style={[styles.normal, styles.f12]}>{order.order_address_shipping.full_name}</Text>
                <Text style={[styles.normal, styles.f12]}>{order.order_address_shipping.contact_number}</Text>
                <Text style={[styles.normal, styles.f12]}>{order.order_address_shipping.address}</Text>
                <Text style={[styles.normal, styles.f12]}>{order.order_address_shipping.city}</Text>
                <Text style={[styles.normal, styles.f12]}>{order.order_address_shipping.postal_code}</Text>
                <Text style={[styles.normal, styles.f12]}>{order.order_address_shipping.address_detail}</Text>
                <Text style={[styles.normal, styles.f12]}>{order.order_address_shipping.company_name}</Text>
              </>
            )
          }
        </View>
        <View style={[style.section, styles.mt10]}>
          {
            order.order_details.map((item) => (
              <OrderItem
                key={item.order_id + item.id}
                name={item.product.name}
                price={item.product_price.price}
                option={item.product_option?.description}
                color={item.product_color?.name}
                lensPower={item.lens_power?.power}
                quantity={item.quantity}
                subtotal={item.total}
                imageUrl={item.product.thumbnail_url}
                onPress={() => null}
              />
            ))
          }
        </View>
        <View style={[style.section, styles.mt10]}>
          <Text style={[styles.bold, styles.mb10]}>{`Order ID: ${order.code}`}</Text>
          <View style={[styles.rowBetweenInCenter, styles.mb5]}>
            <Text style={[styles.normal, styles.f12]}>Ordered at</Text>
            <Text style={[styles.normal, styles.f12]}>{moment(order.created_at).format('MMM DD YYYY hh:mm A')}</Text>
          </View>
          <View style={[styles.rowBetweenInCenter, styles.mb5]}>
            <Text style={[styles.normal, styles.f12]}>Paid at</Text>
            <Text style={[styles.normal, styles.f12]}>{order.paid_at ? moment(order.paid_at).format('MMM DD YYYY hh:mm A') : '-'}</Text>
          </View>
          <View style={[styles.rowBetweenInCenter, styles.mb5]}>
            <Text style={[styles.normal, styles.f12]}>Confirmed at</Text>
            <Text style={[styles.normal, styles.f12]}>{order.confirmed_at ? moment(order.confirmed_at).format('MMM DD YYYY hh:mm A') : '-'}</Text>
          </View>
          <View style={[styles.rowBetweenInCenter, styles.mb5]}>
            <Text style={[styles.normal, styles.f12]}>Shipped at</Text>
            <Text style={[styles.normal, styles.f12]}>{order.shipped_at ? moment(order.shipped_at).format('MMM DD YYYY hh:mm A') : '-'}</Text>
          </View>
          <View style={[styles.rowBetweenInCenter, styles.mb5]}>
            <Text style={[styles.normal, styles.f12]}>Delivered at</Text>
            <Text style={[styles.normal, styles.f12]}>{order.delivered_at ? moment(order.delivered_at).format('MMM DD YYYY hh:mm A') : '-'}</Text>
          </View>
          {
            order.shipped_at && !order.delivered_at && (
              <TouchableOpacity activeOpacity={0.9} onPress={confirmArrived}>
                <Text style={style.arrivedBtn}>Arrived</Text>
              </TouchableOpacity>
            )
          }
          {
            order.can_refund && (
              <TouchableOpacity activeOpacity={0.9} onPress={askForRefund}>
                <Text style={style.arrivedBtn}>Refund</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </ScrollView>
    </Spinner>
  );
};

const style = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  status: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  arrivedBtn: {
    textAlign: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    color: colors.primary,
    fontFamily: 'OpenSans-Regular'
  }
})

export default OrderDetailScreen;
