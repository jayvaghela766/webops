import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ServiceBanner = ({ title, subtitle, imageUrl, navigation }) => (
  <View>
    <Image source={{ uri: imageUrl }} style={style.banner} />
    <View style={style.bannerOverlay} />
    <View style={style.bannerText}>
      <View>
        <Text style={style.title}>{title}</Text>
        <Text style={style.subtitle}>{subtitle}</Text>
      </View>
    </View>
  </View>
);

const style = StyleSheet.create({
  banner: {
    width: '100%',
    height: 140,
    resizeMode: 'cover'
  },
  bannerOverlay: {
    width: '100%',
    height: 140,
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20
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

export default ServiceBanner;
