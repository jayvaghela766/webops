import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCategoryCard = ({ title, subtitle, imageUrl, onPress, containerStyle }) => (
  <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={0.9}>
    <Image source={{ uri: imageUrl }} style={style.banner} />
    <View style={style.bannerOverlay} />
    <View style={style.bannerText}>
      <View>
        <Text style={style.title}>{title}</Text>
        <Text style={style.subtitle}>{subtitle}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  banner: {
    width: '100%',
    height: 220,
    resizeMode: 'cover'
  },
  bannerOverlay: {
    width: '100%',
    height: 220,
    backgroundColor: 'rgba(0,0,0,0.2)',
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    color: 'white',
    fontFamily: 'OpenSans-Light'
  },
  subtitle: {
    color: 'white',
    fontFamily: 'OpenSans-SemiBold'
  },
  bannerText: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10
  }
});

export default ProductCategoryCard;
