import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {scale} from '../../helper/Utils';

const NewsCard = ({ title, articleType, date, imageUrl, onPress, containerStyle }) => (
  <TouchableOpacity activeOpacity={0.9} style={[style.card, containerStyle]} onPress={onPress}>
    <Image source={{ uri: imageUrl }} style={style.image} />
    <Text style={[style.title]}  numberOfLines={2} >{title} </Text>
    <Text style={[style.category]}>{articleType}</Text>
    <TouchableOpacity activeOpacity={0.9}>
      <Text style={[style.date]}>{date}</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  card: {
    alignItems: 'flex-start',
    width: 150,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginBottom: 5,
    height: 50
  },
  category: {
    fontFamily: 'OpenSans-SemiBold',
    color: colors.primary,
    marginBottom: 5,
  },
  date: {
    fontFamily: 'OpenSans-Regular',
  },
});

export default NewsCard;
