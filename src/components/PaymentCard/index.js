import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Payment from '../../models/Payment';
import styles from '../../styles/styles';

const PaymentCard = ({ name, number, cardType, onDelete }) => (
  <View style={style.card}>
    <View style={[styles.rowBetweenInCenter]}>
      <View>
        <Text style={style.label}>Name on Card</Text>
        <Text style={[style.value, styles.mb10]}>{name}</Text>
        <Text style={style.label}>Credit Card Number</Text>
        <Text style={style.value}>{number}</Text>
      </View>
      <View style={[styles.alignItemsCenter]}>
        { Payment.getLogo(cardType) }
        <TouchableOpacity activeOpacity={0.9} onPress={onDelete}>
          <Text style={style.deleteBtn}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const style = StyleSheet.create({
  card: {
    borderColor: '#333',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    padding: 15,
    borderRadius: 5
  },
  label: {
    fontFamily: 'OpenSans-Bold',
  },
  value: {
    fontFamily: 'OpenSans-Regular'
  },
  logo: {
    width: 50,
    height: 50
  },
  deleteBtn: {
    fontSize: 10,
    fontFamily: 'OpenSans-Regular',
    marginTop: 15,
    borderRadius: 3,
    borderColor: '#333',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 5,
    paddingVertical: 3
  }
});


export default PaymentCard;