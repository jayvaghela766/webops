import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import styles from '../../styles/styles';

const PromotionCardAlt = ({ description, amount, imageUrl, startAt, endAt, onPress }) => (
  <TouchableOpacity style={style.card} onPress={onPress} activeOpacity={0.9}>
    <Image source={{ uri: imageUrl }} style={style.image} />
    <View style={[styles.p10]}>
      <Text style={style.amount}>{amount}</Text>
      <Text style={style.description}>{description}</Text>
      <Text style={style.expiry}>{`${startAt} - ${endAt}`}</Text>
    </View>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    elevation: 7
  },
  image: {
    height:120,
    width: null,
    marginBottom: 5
  },
  amount: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    color: '#333'
  },
  description: {
    fontFamily: 'OpenSans-Light',
    fontSize: 10,
    color: '#333'
  },
  expiry: {
    color: '#FF827A',
    fontFamily: 'OpenSans-Bold',
    fontSize: 10
  }
});

export default PromotionCardAlt;
