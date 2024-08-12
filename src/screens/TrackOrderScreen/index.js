import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import TrackCircle from '../../components/TrackCircle';
import colors from '../../config/colors';
import styles from '../../styles/styles';
import Order from '../../models/Order';

const TrackOrderScreen = ({ route }) => {
  const [order, setOrder] = useState({});

  useEffect(() => {
    if (route.params?.order) {
      fetchData();
    }
  }, [route.params]);

  const fetchData = async () => {
    const response = await Order.get(route.params.order.id);
    setOrder(response);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.ph20, styles.pv10]}>
        <Text style={style.heading}>Track Order</Text>
        <View style={[styles.mb10]}>
          <Text style={[style.labelSemiBold]}>Order Number: {route.params?.order.code}</Text>
          { route.params?.order.tracking_number && <Text style={[styles.labelSemiBold, styles.dark, styles.f10]}>{`Tracking Number: ${route.params?.order.tracking_number} (${route.params?.order.courier?.name})`}</Text> }
          { order.tracking_status && <Text style={[styles.labelSemiBold, styles.dark, styles.f10]}>{`Tracking Status: ${order.tracking_status.status}`}</Text> }
        </View>
        <View style={style.trackContainer}>
          <TrackCircle
            number="1"
            label={'Order\nConfirmed'}
            selected={route.params?.order.confirmed_at}
            date={route.params?.order.confirmed_at ? moment(route.params?.order.confirmed_at).utc().format('DD MMM YYYY') : ''}
          />
          <View style={[style.lineVertical, route.params?.order.confirmed_at ? { backgroundColor: colors.primary } : {}]} />
          {
            route.params?.order.self_collection_at
             ? (
               <>
                <TrackCircle
                  number="2"
                  label={'Available\nat Store'}
                  selected={route.params?.order.available_at}
                  date={route.params?.order.available_at ? moment(route.params?.order.available_at).utc().format('DD MMM YYYY') : ''}
                  containerStyle={{ marginTop: -1 }}
                />
                <View style={[style.lineVertical, route.params?.order.available_at ? { backgroundColor: colors.primary } : {}]} />
               </>
             )
             : (
               <>
                <TrackCircle
                  number="2"
                  label={'Order\nShipped'}
                  containerStyle={{ marginTop: -1 }}
                  date={route.params?.order.shipped_at ? moment(route.params?.order.shipped_at).utc().format('DD MMM YYYY') : ''}
                  selected={route.params?.order.shipped_at}
                />
                <View style={[style.lineVertical, route.params?.order.shipped_at ? { backgroundColor: colors.primary } : {}]} />
               </>
             )
          }
          <TrackCircle
            number="3"
            label={`${route.params?.order.self_collection_at ? 'Order\nCollected' : 'Order\nDelivered'}`}
            containerStyle={{ marginTop: -1 }}
            date={route.params?.order.delivered_at ? moment(route.params?.order.delivered_at).utc().format('DD MMM YYYY') : ''}
            selected={route.params?.order.delivered_at}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: colors.dark,
    marginBottom: 15
  },
  trackContainer: {
    borderColor: '#cacaca',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20
  },
  lineVertical: {
    width: 5,
    height: 20,
    backgroundColor: '#cacaca',
    marginLeft: 28,
    marginTop: -1
  }
});

export default TrackOrderScreen;