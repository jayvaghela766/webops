import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import colors from '../../config/colors';

const FeaturedProductCard = ({
  brand,
  title,
  imageUrl,
  containerStyle,
  onPress,
}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={[style.card, containerStyle]}
    onPress={onPress}>
    <Image source={{uri: imageUrl}} style={style.image} />
    <Text style={[style.brand]}>{brand}</Text>
    <Text style={[style.product]}>{title}</Text>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  card: {
    alignItems: 'flex-start',
    width: 150,
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  brand: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  product: {
    fontFamily: 'OpenSans-Bold',
  },
  link: {
    fontFamily: 'OpenSans-Regular',
    color: colors.primary,
  },
});

export default FeaturedProductCard;
