import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../../../config/colors';
import styles from '../../../styles/styles';

const { width: screenWidth } = Dimensions.get('screen');

const ProductCard = ({ thumbnail, title, content, price, onPress }) => (
  <TouchableOpacity
    style={style.card}
    activeOpacity={0.9}
    onPress={onPress}
  >
    <Image
      source={{ uri: thumbnail }}
      style={style.image}
    />
    <Text style={style.productName}>{title}</Text>
    <Text style={[styles.regular, styles.f14, styles.textMuted]}>{content}</Text>
    <Text style={[styles.semiBold, styles.f16, styles.mt30]}>{price}</Text>
  </TouchableOpacity>
);

export default ProductCard;

const style = StyleSheet.create({
  image: {
    width: null,
    height: 88,
    resizeMode: 'contain'
  },
  productName: {
    color: colors.primary,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    width: screenWidth / 2 - 25,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  }
});
