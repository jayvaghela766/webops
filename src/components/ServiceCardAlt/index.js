import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ServiceCardAlt = ({ title, onPress, imageUrl, containerStyle, textColor }) => (
  <TouchableOpacity activeOpacity={0.9} style={[style.card, containerStyle]} onPress={onPress}>
    <Image source={{ uri: imageUrl }} style={[style.image]} />
    <Text style={[style.title, textColor]}>{title}</Text>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  card: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover'
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#333',
    marginLeft: 20,
    flex: 1
  }
});

export default ServiceCardAlt;