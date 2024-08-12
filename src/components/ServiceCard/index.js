import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const ServiceCard = ({ title, onPress, imageUrl, width, containerStyle }) => (
  <TouchableOpacity activeOpacity={0.9} style={[style.card, width ? { width } : {}, containerStyle]} onPress={onPress}>
    <Image source={{ uri: imageUrl }} style={[style.image, width ? { width } : {}]} />
    <Text  style={[style.title]} numberOfLines={2} numColumns={2}>{title}</Text>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: 150,
    paddingHorizontal: 10,
    minHeight: 200,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiceCard;
